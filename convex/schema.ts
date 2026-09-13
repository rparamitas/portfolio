import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

import { tables as authTables } from "./betterAuth/schema"

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
})
