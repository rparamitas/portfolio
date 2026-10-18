import { v } from "convex/values";

import { MEAL_SLOTS, SLOT_LABELS, type Persona } from "../data/menu";
import { formatDay, fromDateKey } from "../lib/date";
import { authComponent } from "./auth";
import { api, internal } from "./_generated/api";
import {
  action,
  internalMutation,
  query,
  type ActionCtx,
} from "./_generated/server";
import type { Doc } from "./_generated/dataModel";

const PERSONAS: { persona: Persona; title: string }[] = [
  { persona: "adult", title: "Adult" },
  { persona: "children", title: "Children" },
];

async function requireAuth(ctx: ActionCtx) {
  const user = await authComponent.safeGetAuthUser(ctx);
  if (!user) {
    throw new Error("Unauthenticated — please sign in first");
  }
  return user;
}

// Telegram's parse_mode "HTML" only allows &lt;, &gt;, &amp; un-escaped.
function escapeTelegramHtml(token: string) {
  return token
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function buildDailyMenuMessage(dateKey: string, entries: Doc<"menuEntries">[]) {
  const lines = [`<b>Daily menu — ${formatDay(fromDateKey(dateKey))}</b>`];

  for (const { persona, title } of PERSONAS) {
    lines.push("", `<b>${title}</b>`);
    for (const slot of MEAL_SLOTS) {
      const entry = entries.find(
        (item) => item.persona === persona && item.slot === slot,
      );
      const name = entry ? escapeTelegramHtml(entry.name) : "—";
      lines.push(`${SLOT_LABELS[slot]}: ${name}`);
      if (entry && entry.ingredients.length > 0) {
        lines.push(escapeTelegramHtml(entry.ingredients.join(", ")));
      }
    }
  }

  return lines.join("\n");
}

export const getLatestSend = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("telegramSends")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .unique();
  },
});

// Called by the sendDailyMenu action after Telegram accepted the message.
export const upsertSend = internalMutation({
  args: { date: v.string(), chatId: v.string() },
  handler: async (ctx, args): Promise<{ sentAt: number }> => {
    const sentAt = Date.now();
    const existing = await ctx.db
      .query("telegramSends")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { sentAt, chatId: args.chatId });
    } else {
      await ctx.db.insert("telegramSends", {
        date: args.date,
        sentAt,
        chatId: args.chatId,
      });
    }
    return { sentAt };
  },
});

export const sendDailyMenu = action({
  args: { date: v.string() },
  handler: async (ctx, args): Promise<{ sentAt: number }> => {
    await requireAuth(ctx);

    const entries = await ctx.runQuery(api.menu.listByRange, {
      start: args.date,
      end: args.date,
    });
    if (entries.length === 0) {
      throw new Error(
        `No menu entries for ${args.date} — add menu slots before sending`,
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) {
      throw new Error(
        "Telegram is not configured — set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID with `npx convex env set` first",
      );
    }

    // In a topics-enabled group, sendMessage without a thread id always
    // lands in General. Setting TELEGRAM_MESSAGE_THREAD_ID routes the daily
    // menu into that topic instead; unset keeps the old behavior for
    // plain (non-forum) groups.
    const threadEnv = process.env.TELEGRAM_MESSAGE_THREAD_ID;
    let messageThreadId: number | undefined;
    if (threadEnv) {
      messageThreadId = Number(threadEnv);
      if (!Number.isInteger(messageThreadId) || messageThreadId <= 0) {
        throw new Error(
          `Invalid TELEGRAM_MESSAGE_THREAD_ID "${threadEnv}" — set it to a topic id like 384 with \`npx convex env set\`, or remove it to post under General`,
        );
      }
    }

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildDailyMenuMessage(args.date, entries),
          parse_mode: "HTML",
          disable_web_page_preview: true,
          ...(threadEnv ? { message_thread_id: messageThreadId } : {}),
        }),
      },
    );
    const result = (await response.json()) as
      | { ok: true; result: { message_id: number } }
      | { ok: false; description: string };

    if (!result.ok) {
      throw new Error(
        `Telegram rejected the message: ${result.description ?? response.statusText}`,
      );
    }

    const { sentAt } = await ctx.runMutation(internal.telegram.upsertSend, {
      date: args.date,
      chatId,
    });

    return { sentAt };
  },
});
