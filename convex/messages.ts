import { v } from "convex/values";
import { internal } from "./_generated/api";

import { authComponent } from "./auth";
import {
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  type MutationCtx,
} from "./_generated/server";
import { sendContactMessageNotification } from "./email";

const OWNER_EMAIL = "rparamitas@gmail.com";

// Everything contact-related must be signed in: the session is the only trusted
// source for the sender's email/userId, so a visitor can't impersonate someone
// else's address by editing the form.
async function requireAuth(ctx: MutationCtx) {
  const user = await authComponent.safeGetAuthUser(ctx);
  if (!user) {
    throw new Error("Unauthenticated — please sign in first");
  }
  return user;
}

export const sendMessage = mutation({
  args: {
    // Email/userId are taken from the authenticated session, not from these
    // args — the dialog sends them for display purposes only.
    name: v.string(),
    title: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireAuth(ctx);

    const name = args.name.trim();
    const title = args.title.trim();
    const body = args.body.trim();
    if (!name || !title || !body) {
      throw new Error("Name, title and message are required");
    }

    const messageId = await ctx.db.insert("messages", {
      userId: user._id,
      email: user.email,
      name,
      title,
      body,
      createdAt: Date.now(),
    });

    // The reply goes out in the background so a slow Resend call never blocks
    // or fails the user's submit.
    ctx.scheduler.runAfter(0, internal.messages.sendNotification, {
      messageId,
    });

    return { messageId };
  },
});

// Marks the notification as delivered. If Resend retries/fails the scheduler
// will surface the error in the dashboard while the user-facing submit already
// succeeded.
export const markNotificationSent = internalMutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, {
      notificationSentAt: Date.now(),
    });
  },
});

// Internal read used by the notification action (actions can't touch `ctx.db`
// directly).
export const getInternal = internalQuery({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    return ctx.db.get(args.messageId);
  },
});

export const sendNotification = internalAction({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    const message = await ctx.runQuery(internal.messages.getInternal, {
      messageId: args.messageId,
    });
    if (!message) throw new Error(`Message ${args.messageId} not found`);

    await sendContactMessageNotification(ctx, {
      to: OWNER_EMAIL,
      name: message.name,
      email: message.email,
      title: message.title,
      body: message.body,
    });

    await ctx.runMutation(internal.messages.markNotificationSent, {
      messageId: args.messageId,
    });
  },
});
