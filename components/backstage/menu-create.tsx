"use client"

import { useMemo, useState } from "react"
import { useMutation, useQuery } from "convex/react"
import {
  Baby,
  ChevronLeft,
  ChevronRight,
  Plus,
  Users,
  type LucideIcon,
} from "lucide-react"

import { api } from "@/convex/_generated/api"
import {
  MEAL_SLOTS,
  SLOT_LABELS,
  menuForDate,
  type MealSlot,
  type Persona,
} from "@/data/menu"
import {
  addDays,
  formatDay,
  formatDayShort,
  formatWeekRange,
  fromDateKey,
  startOfWeek,
  toDateKey,
} from "@/lib/date"
import { cn } from "@/lib/utils"
import Alert from "@/components/common/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  MultiSelect,
  MultiSelectChips,
  MultiSelectChip,
  MultiSelectChipRemove,
  MultiSelectEmpty,
  MultiSelectGroup,
  MultiSelectInput,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectPortal,
  MultiSelectPopup,
  MultiSelectPositioner,
} from "@/components/ui/combobox"

interface SlotValue {
  name: string
  ingredients: string[]
}

const PERSONAS: { persona: Persona; title: string; icon: LucideIcon }[] = [
  { persona: "adult", title: "Adult", icon: Users },
  { persona: "children", title: "Children", icon: Baby },
]

const inputClassName =
  "w-full rounded border-2 border-black bg-transparent px-3 py-1.5 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"

const slotKey = (dateKey: string, persona: Persona, slot: MealSlot) =>
  `${dateKey}|${persona}|${slot}`

function IngredientCombobox({
  options,
  value,
  onValueChange,
  onAddCustom,
  invalid,
}: {
  options: string[]
  value: string[]
  onValueChange: (value: string[]) => void
  onAddCustom: (name: string) => void
  invalid?: boolean
}) {
  const [inputValue, setInputValue] = useState("")
  const [remountKey, setRemountKey] = useState(0)

  return (
    <MultiSelect
      key={remountKey}
      multiple
      items={options}
      value={value}
      onValueChange={(next) => onValueChange(Array.isArray(next) ? next : [])}
      onInputValueChange={setInputValue}
    >
      <MultiSelectGroup
        className={cn(invalid && "border-destructive")}
        aria-label="Ingredients"
      >
        {value.length > 0 && (
          <MultiSelectChips>
            {value.map((item) => (
              <MultiSelectChip key={item}>
                {item}
                <MultiSelectChipRemove aria-label={`Remove ${item}`} />
              </MultiSelectChip>
            ))}
          </MultiSelectChips>
        )}
        <MultiSelectInput placeholder="Search ingredients, type to add new…" />
      </MultiSelectGroup>
      <MultiSelectPortal>
        <MultiSelectPositioner>
          <MultiSelectPopup>
            <MultiSelectList>
              {(item: string) => (
                <MultiSelectItem key={item} value={item}>
                  {item}
                </MultiSelectItem>
              )}
            </MultiSelectList>
            <MultiSelectEmpty>
              {inputValue.trim() ? (
                <button
                  type="button"
                  onClick={() => {
                    onAddCustom(inputValue.trim())
                    setRemountKey((key) => key + 1)
                  }}
                  className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent"
                >
                  <Plus className="size-3.5 shrink-0" aria-hidden />
                  Add &quot;{inputValue.trim()}&quot;
                </button>
              ) : (
                "No ingredients available"
              )}
            </MultiSelectEmpty>
          </MultiSelectPopup>
        </MultiSelectPositioner>
      </MultiSelectPortal>
    </MultiSelect>
  )
}

export function MenuCreateView({ initialDate }: { initialDate?: string }) {
  const initialAnchor = initialDate ? fromDateKey(initialDate) : new Date()

  const [weekStart, setWeekStart] = useState(() => startOfWeek(initialAnchor))
  const [selectedDayIndex, setSelectedDayIndex] = useState(() =>
    (initialAnchor.getDay() + 6) % 7,
  )
  const [formState, setFormState] = useState<Record<string, SlotValue>>({})
  const [extraIngredients, setExtraIngredients] = useState<string[]>([])
  const [alert, setAlert] = useState<
    { success?: boolean; error?: boolean; message: string } | null
  >(null)
  const [saving, setSaving] = useState(false)

  const ingredientsQuery = useQuery(api.menu.listIngredients)
  const entries = useQuery(api.menu.listByRange, {
    start: toDateKey(weekStart),
    end: toDateKey(addDays(weekStart, 6)),
  })

  const saveEntries = useMutation(api.menu.saveEntries)
  const addIngredient = useMutation(api.menu.addIngredient)

  const ingredientOptions = useMemo(() => {
    const names = (ingredientsQuery ?? []).map((item) => item.name)
    const merged = new Set([...names, ...extraIngredients])
    return Array.from(merged).sort((a, b) => a.localeCompare(b))
  }, [ingredientsQuery, extraIngredients])

  const entryMap = useMemo(() => {
    const map = new Map<string, SlotValue & { status: string }>()
    for (const entry of entries ?? []) {
      map.set(slotKey(entry.date, entry.persona, entry.slot), {
        name: entry.name,
        ingredients: [...entry.ingredients],
        status: entry.status,
      })
    }
    return map
  }, [entries])

  const weekDates = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  )

  const baseValue = (key: string): SlotValue => {
    const entry = entryMap.get(key)
    return {
      name: entry?.name ?? "",
      ingredients: entry ? [...entry.ingredients] : [],
    }
  }

  const resolveValue = (key: string): SlotValue =>
    formState[key] ?? baseValue(key)

  const isIncomplete = (key: string) => {
    const value = resolveValue(key)
    return !value.name.trim() && value.ingredients.length > 0
  }

  const updateSlot = (key: string, patch: Partial<SlotValue>) => {
    setFormState((prev) => ({
      ...prev,
      [key]: { ...(prev[key] ?? baseValue(key)), ...patch },
    }))
  }

  const handleAddCustom = (key: string, name: string) => {
    const current = resolveValue(key)
    if (!current.ingredients.includes(name)) {
      updateSlot(key, { ingredients: [...current.ingredients, name] })
    }
    setExtraIngredients((prev) =>
      prev.includes(name) ? prev : [...prev, name],
    )
    addIngredient({ name }).catch(() => {})
  }

  const prefillTemplate = () => {
    setFormState((prev) => {
      const next = { ...prev }
      for (const date of weekDates) {
        const dateKey = toDateKey(date)
        const plan = menuForDate(date)
        for (const { persona } of PERSONAS) {
          for (const slot of MEAL_SLOTS) {
            const key = slotKey(dateKey, persona, slot)
            if (next[key]?.name.trim()) continue
            next[key] = {
              name: plan[persona][slot].name,
              ingredients: [...plan[persona][slot].ingredients],
            }
          }
        }
      }
      return next
    })
    setAlert({
      message: "Week filled from the template menu — review and save.",
    })
  }

  const collectSlotStats = () => {
    let blanks = 0
    const incomplete: { key: string; label: string }[] = []
    for (const date of weekDates) {
      const dateKey = toDateKey(date)
      for (const { persona, title } of PERSONAS) {
        for (const slot of MEAL_SLOTS) {
          const key = slotKey(dateKey, persona, slot)
          const value = resolveValue(key)
          const name = value.name.trim()

          if (!name && value.ingredients.length === 0) {
            blanks++
          }
          if (!name && value.ingredients.length > 0) {
            incomplete.push({
              key,
              label: `${formatDay(date)} · ${title} · ${SLOT_LABELS[slot]}`,
            })
          }
        }
      }
    }
    return { blanks, incomplete }
  }

  const handleSave = async (status: "draft" | "published") => {
    const { blanks, incomplete } = collectSlotStats()

    if (incomplete.length > 0) {
      const preview = incomplete.slice(0, 5).map((item) => item.label).join("; ")
      const suffix =
        incomplete.length > 5
          ? `; and ${incomplete.length - 5} more`
          : ""
      setAlert({
        error: true,
        message: `${incomplete.length} slot(s) have ingredients but no dish name: ${preview}${suffix}. Fill the dish name or remove the ingredients.`,
      })
      return
    }

    setSaving(true)
    setAlert(null)
    const payload: {
      date: string
      persona: Persona
      slot: MealSlot
      name: string
      ingredients: string[]
      status: "draft" | "published"
    }[] = []

    for (const date of weekDates) {
      const dateKey = toDateKey(date)
      for (const { persona } of PERSONAS) {
        for (const slot of MEAL_SLOTS) {
          const key = slotKey(dateKey, persona, slot)
          const value = resolveValue(key)
          const name = value.name.trim()

          if (!name) {
            if (entryMap.has(key)) {
              payload.push({
                date: dateKey,
                persona,
                slot,
                name: "",
                ingredients: [],
                status,
              })
            }
            continue
          }

          payload.push({
            date: dateKey,
            persona,
            slot,
            name,
            ingredients: value.ingredients,
            status,
          })
        }
      }
    }

    try {
      const result = await saveEntries({ entries: payload })
      if (status === "draft") {
        setAlert({
          success: true,
          message: `Draft saved — ${result.saved} slot(s) stored. Finish anytime from here.`,
        })
      } else if (blanks > 0) {
        setAlert({
          success: true,
          message: `Menu published with ${blanks} blank slot(s) — blank slots show a note on the daily view until you fill them.`,
        })
      } else {
        setAlert({
          success: true,
          message: "Menu published! All slots are filled.",
        })
      }
    } catch (error) {
      setAlert({
        error: true,
        message: error instanceof Error ? error.message : "Failed to save",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-y-6">
      {alert && <Alert {...alert} />}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Previous week"
            onClick={() => setWeekStart((current) => addDays(current, -7))}
          >
            <ChevronLeft />
          </Button>
          <p
            aria-live="polite"
            className="min-w-40 text-center font-head text-sm font-semibold"
          >
            {formatWeekRange(weekStart)}
          </p>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Next week"
            onClick={() => setWeekStart((current) => addDays(current, 7))}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const now = new Date()
              setWeekStart(startOfWeek(now))
              setSelectedDayIndex((now.getDay() + 6) % 7)
            }}
          >
            This week
          </Button>
        </div>

        <Button variant="outline" size="sm" onClick={prefillTemplate}>
          Prefill from template
        </Button>
      </div>

      <div
        role="group"
        aria-label="Day of week"
        className="flex flex-wrap gap-2"
      >
        {weekDates.map((date, index) => (
          <button
            key={toDateKey(date)}
            type="button"
            aria-pressed={selectedDayIndex === index}
            onClick={() => setSelectedDayIndex(index)}
            className={cn(
              "cursor-pointer rounded border-2 px-4 py-1.5 font-head text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              selectedDayIndex === index
                ? "border-black bg-primary text-primary-foreground shadow-sm"
                : "border-transparent hover:bg-accent",
            )}
          >
            {formatDayShort(date)}
          </button>
        ))}
      </div>

      {ingredientsQuery === undefined || entries === undefined ? (
        <div className="rounded border-2 bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          Loading…
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {PERSONAS.map(({ persona, title, icon: Icon }) => (
              <Card key={persona} size="sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-head font-semibold">
                    <Icon className="size-4" aria-hidden />
                    {title}
                  </CardTitle>
                  <CardDescription>
                    {formatDay(weekDates[selectedDayIndex])}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {MEAL_SLOTS.map((slot) => {
                    const dateKey = toDateKey(weekDates[selectedDayIndex])
                    const key = slotKey(dateKey, persona, slot)
                    const value = resolveValue(key)
                    const entryStatus = entryMap.get(key)?.status
                    const invalid = isIncomplete(key)

                    return (
                      <div key={slot} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-muted-foreground">
                            {SLOT_LABELS[slot]}
                          </p>
                          {entryStatus === "draft" && (
                            <Badge variant="outline" className="text-[10px]">
                              Draft
                            </Badge>
                          )}
                          {entryStatus === "published" && (
                            <Badge variant="secondary" className="text-[10px]">
                              Published
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-col gap-1">
                          <input
                            value={value.name}
                            onChange={(event) =>
                              updateSlot(key, { name: event.target.value })
                            }
                            placeholder="Dish name"
                            aria-invalid={invalid || undefined}
                            className={cn(
                              inputClassName,
                              invalid && "border-destructive",
                            )}
                          />
                          {invalid && (
                            <p className="text-xs font-medium text-destructive">
                              Fill the dish name, or remove the ingredients if
                              this slot is not used.
                            </p>
                          )}
                        </div>

                        <IngredientCombobox
                          options={ingredientOptions}
                          value={value.ingredients}
                          onValueChange={(names) =>
                            updateSlot(key, { ingredients: names })
                          }
                          onAddCustom={(name) => handleAddCustom(key, name)}
                        />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col text-sm text-muted-foreground">
              <p>{collectSlotStats().blanks} of 70 slots are still blank</p>
              {collectSlotStats().incomplete.length > 0 && (
                <p className="font-medium text-destructive">
                  {collectSlotStats().incomplete.length} slot(s) have
                  ingredients without a dish name
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                disabled={saving}
                onClick={() => handleSave("draft")}
              >
                Save Draft
              </Button>
              <Button
                disabled={saving}
                onClick={() => handleSave("published")}
              >
                Finish
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
