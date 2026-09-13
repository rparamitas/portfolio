import { v } from "convex/values"

import { ALL_INGREDIENTS } from "../data/menu"
import { authComponent } from "./auth"
import { mutation, query, type MutationCtx } from "./_generated/server"

const personaValidator = v.union(v.literal("adult"), v.literal("children"))

const slotValidator = v.union(
  v.literal("breakfast"),
  v.literal("snack-morning"),
  v.literal("lunch"),
  v.literal("snack-afternoon"),
  v.literal("dinner"),
)

const statusValidator = v.union(
  v.literal("draft"),
  v.literal("published"),
)

async function requireAuth(ctx: MutationCtx) {
  const user = await authComponent.safeGetAuthUser(ctx)
  if (!user) {
    throw new Error("Unauthenticated — please sign in first")
  }
  return user
}

export const listIngredients = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("ingredients").withIndex("name").order("asc").collect()
  },
})

export const seedIngredients = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = new Set(
      (await ctx.db.query("ingredients").collect()).map((item) => item.name),
    )
    let added = 0
    for (const name of ALL_INGREDIENTS) {
      if (!existing.has(name)) {
        await ctx.db.insert("ingredients", { name })
        added++
      }
    }
    return { added, total: existing.size + added }
  },
})

// Manual maintenance utility: run with `bunx convex run menu:reseedIngredients`
// to replace all ingredients with the template list (e.g. after renaming).
export const reseedIngredients = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("ingredients").collect()
    for (const item of existing) {
      await ctx.db.delete(item._id)
    }
    for (const name of ALL_INGREDIENTS) {
      await ctx.db.insert("ingredients", { name })
    }
    return { total: ALL_INGREDIENTS.length }
  },
})

export const addIngredient = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    await requireAuth(ctx)
    const name = args.name.trim()
    if (!name) {
      throw new Error("Ingredient name is empty")
    }
    const existing = await ctx.db
      .query("ingredients")
      .withIndex("name", (q) => q.eq("name", name))
      .unique()
    if (existing) {
      return { id: existing._id, name: existing.name, created: false }
    }
    const id = await ctx.db.insert("ingredients", { name })
    return { id, name, created: true }
  },
})

export const listByRange = query({
  args: { start: v.string(), end: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("menuEntries")
      .withIndex("by_date", (q) =>
        q.gte("date", args.start).lte("date", args.end),
      )
      .collect()
  },
})

export const saveEntries = mutation({
  args: {
    entries: v.array(
      v.object({
        date: v.string(),
        persona: personaValidator,
        slot: slotValidator,
        name: v.string(),
        ingredients: v.array(v.string()),
        status: statusValidator,
      }),
    ),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx)
    const now = Date.now()
    let saved = 0
    let deleted = 0

    for (const entry of args.entries) {
      const existing = await ctx.db
        .query("menuEntries")
        .withIndex("by_date_persona_slot", (q) =>
          q
            .eq("date", entry.date)
            .eq("persona", entry.persona)
            .eq("slot", entry.slot),
        )
        .unique()

      const name = entry.name.trim()

      if (!name) {
        if (existing) {
          await ctx.db.delete(existing._id)
          deleted++
        }
        continue
      }

      if (existing) {
        await ctx.db.patch(existing._id, {
          name,
          ingredients: entry.ingredients,
          status: entry.status,
          updatedAt: now,
        })
      } else {
        await ctx.db.insert("menuEntries", {
          date: entry.date,
          persona: entry.persona,
          slot: entry.slot,
          name,
          ingredients: entry.ingredients,
          status: entry.status,
          updatedAt: now,
        })
      }
      saved++
    }

    return { saved, deleted }
  },
})
