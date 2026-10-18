import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

import { tables as authTables } from "./betterAuth/schema";

export default defineSchema({
  ...authTables,
  ingredients: defineTable({
    name: v.string(),
  }).index("name", ["name"]),
  menuEntries: defineTable({
    date: v.string(),
    persona: v.union(v.literal("adult"), v.literal("children")),
    slot: v.union(
      v.literal("breakfast"),
      v.literal("snack-morning"),
      v.literal("lunch"),
      v.literal("snack-afternoon"),
      v.literal("dinner"),
    ),
    name: v.string(),
    ingredients: v.array(v.string()),
    status: v.union(v.literal("draft"), v.literal("published")),
    updatedAt: v.number(),
  })
    .index("by_date", ["date"])
    .index("by_date_persona_slot", ["date", "persona", "slot"]),
  // One record per date — resending the daily menu overwrites `sentAt` so the
  // UI always shows when the current version of the message went out.
  telegramSends: defineTable({
    date: v.string(),
    sentAt: v.number(),
    chatId: v.string(),
  }).index("by_date", ["date"]),
  // Intro messages submitted through the hero "Get in touch" dialog. Only
  // signed-in users can create them (see `messages.ts`); email/userId always
  // come from the authenticated session, never from the form.
  messages: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    title: v.string(),
    body: v.string(),
    notificationSentAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_created_at", ["createdAt"]),
});
