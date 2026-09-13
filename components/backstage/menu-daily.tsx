"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useQuery } from "convex/react"
import {
  Apple,
  Baby,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cookie,
  Info,
  Moon,
  Sunrise,
  UtensilsCrossed,
  Users,
  type LucideIcon,
} from "lucide-react"

import { api } from "@/convex/_generated/api"
import type { Doc } from "@/convex/_generated/dataModel"
import {
  MEAL_SLOTS,
  SLOT_LABELS,
  type MealSlot,
  type Persona,
} from "@/data/menu"
import {
  addDays,
  addMonths,
  endOfMonth,
  formatDay,
  formatDayShort,
  formatMonthYear,
  formatWeekRange,
  getMonthGrid,
  getWeekDates,
  isSameDay,
  startOfMonth,
  startOfWeek,
  toDateKey,
  WEEKDAYS_SHORT,
} from "@/lib/date"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const SLOT_ICONS: Record<MealSlot, LucideIcon> = {
  breakfast: Sunrise,
  "snack-morning": Apple,
  lunch: UtensilsCrossed,
  "snack-afternoon": Cookie,
  dinner: Moon,
}

const PERSONAS: {
  persona: Persona
  title: string
  description: string
  icon: LucideIcon
}[] = [
  {
    persona: "adult",
    title: "Adult",
    description: "Full seasoning, standard portions for grown-ups.",
    icon: Users,
  },
  {
    persona: "children",
    title: "Children",
    description: "Kid-friendly, mild seasoning, no chilies.",
    icon: Baby,
  },
]

type MenuView = "day" | "week" | "month"

const VIEW_OPTIONS: { value: MenuView; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
]

const chipClassName = cn(
  "cursor-pointer rounded border-2 px-4 py-1.5 font-head text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
)

export function MenuDailyView() {
  const [view, setView] = useState<MenuView>("day")
  const [anchor, setAnchor] = useState(() => new Date())
  const [persona, setPersona] = useState<Persona>("adult")

  const today = new Date()

  const { start, end } = useMemo(() => {
    if (view === "day") {
      const key = toDateKey(anchor)
      return { start: key, end: key }
    }
    if (view === "week") {
      const week = getWeekDates(anchor)
      return { start: toDateKey(week[0]), end: toDateKey(week[6]) }
    }
    return {
      start: toDateKey(startOfMonth(anchor)),
      end: toDateKey(endOfMonth(anchor)),
    }
  }, [view, anchor])

  const entries = useQuery(api.menu.listByRange, { start, end })

  const entryMap = useMemo(() => {
    const map = new Map<string, Doc<"menuEntries">>()
    for (const entry of entries ?? []) {
      map.set(`${entry.date}|${entry.persona}|${entry.slot}`, entry)
    }
    return map
  }, [entries])

  const getEntry = (dateKey: string, personaKey: Persona, slot: MealSlot) =>
    entryMap.get(`${dateKey}|${personaKey}|${slot}`)

  const periodLabel =
    view === "day"
      ? formatDay(anchor)
      : view === "week"
        ? formatWeekRange(startOfWeek(anchor))
        : formatMonthYear(anchor)

  const shift = (direction: 1 | -1) => {
    if (view === "day") {
      setAnchor((current) => addDays(current, direction))
    } else if (view === "week") {
      setAnchor((current) => addDays(current, 7 * direction))
    } else {
      setAnchor((current) => addMonths(current, direction))
    }
  }

  const openDay = (date: Date) => {
    setAnchor(date)
    setView("day")
  }

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Menu view"
          className="flex gap-1 rounded border-2 bg-card p-1"
        >
          {VIEW_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={view === option.value}
              onClick={() => setView(option.value)}
              className={cn(
                chipClassName,
                "border-transparent px-3 py-1",
                view === option.value
                  ? "border-black bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-accent",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Previous period"
            onClick={() => shift(-1)}
          >
            <ChevronLeft />
          </Button>
          <p
            aria-live="polite"
            className="min-w-44 text-center font-head text-sm font-semibold"
          >
            {periodLabel}
          </p>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Next period"
            onClick={() => shift(1)}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAnchor(new Date())}
          >
            Today
          </Button>
        </div>
      </div>

      {entries === undefined ? (
        <div className="rounded border-2 bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          Loading menu…
        </div>
      ) : view === "day" ? (
        <>
          <div className="flex items-start gap-2 rounded border-2 bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            <p>
              Cooking happens once in the morning — lunch comes from the same
              batch, so it keeps until the afternoon.
            </p>
          </div>

          <div
            role="group"
            aria-label="Day of week"
            className="flex flex-wrap gap-2"
          >
            {getWeekDates(anchor).map((date) => {
              const isActive = isSameDay(date, anchor)
              const isToday = isSameDay(date, today)

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setAnchor(date)}
                  className={cn(
                    chipClassName,
                    "relative",
                    isActive
                      ? "border-black bg-primary text-primary-foreground shadow-sm"
                      : "border-transparent hover:bg-accent",
                  )}
                >
                  {formatDayShort(date)}
                  {isToday && !isActive && (
                    <span
                      className="absolute top-1 right-1 size-1.5 rounded-full bg-primary"
                      aria-hidden
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {PERSONAS.map(
              ({ persona: personaKey, title, description, icon: Icon }) => {
                const dateKey = toDateKey(anchor)

                return (
                  <Card key={personaKey} size="sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 font-head font-semibold">
                        <Icon className="size-4" aria-hidden />
                        {title}
                      </CardTitle>
                      <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col">
                      {MEAL_SLOTS.map((slot, index) => {
                        const entry = getEntry(dateKey, personaKey, slot)
                        const SlotIcon = SLOT_ICONS[slot]

                        return (
                          <div key={slot}>
                            {index > 0 && <Separator className="my-3" />}
                            <div className="flex items-start gap-3">
                              <div className="flex size-9 shrink-0 items-center justify-center rounded border-2 bg-muted/50">
                                <SlotIcon className="size-4" aria-hidden />
                              </div>
                              {entry ? (
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-xs font-semibold text-muted-foreground">
                                      {SLOT_LABELS[slot]}
                                    </p>
                                    {entry.status === "draft" && (
                                      <Badge
                                        variant="outline"
                                        className="text-[10px]"
                                      >
                                        <Clock aria-hidden />
                                        Draft
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="font-semibold">{entry.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {entry.ingredients.length > 0
                                      ? entry.ingredients.join(", ")
                                      : "No ingredients"}
                                  </p>
                                </div>
                              ) : (
                                <div className="min-w-0 flex-1 rounded border-2 border-dashed bg-muted/30 px-3 py-2">
                                  <p className="text-xs font-semibold text-muted-foreground">
                                    {SLOT_LABELS[slot]}
                                  </p>
                                  <p className="text-sm italic text-muted-foreground">
                                    Data is blank, you can add menu on create
                                    page
                                  </p>
                                  <Link
                                    href={`/backstage/menu-daily/create?date=${dateKey}`}
                                    className="text-xs font-semibold underline underline-offset-2"
                                  >
                                    Add menu
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                )
              },
            )}
          </div>
        </>
      ) : view === "week" ? (
        <>
          <div role="group" aria-label="Persona" className="flex gap-2">
            {PERSONAS.map(({ persona: personaKey, title, icon: Icon }) => (
              <button
                key={personaKey}
                type="button"
                aria-pressed={persona === personaKey}
                onClick={() => setPersona(personaKey)}
                className={cn(
                  chipClassName,
                  "flex items-center gap-2",
                  persona === personaKey
                    ? "border-black bg-primary text-primary-foreground shadow-sm"
                    : "border-transparent hover:bg-accent",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {getWeekDates(anchor).map((date) => {
              const dateKey = toDateKey(date)
              const isToday = isSameDay(date, today)

              return (
                <Card
                  key={dateKey}
                  size="sm"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${formatDay(date)} menu`}
                  onClick={() => openDay(date)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      openDay(date)
                    }
                  }}
                  className="cursor-pointer transition-colors hover:bg-accent/50"
                >
                  <CardHeader>
                    <CardTitle className="font-head text-sm font-semibold">
                      {formatDayShort(date)}
                    </CardTitle>
                    {isToday && (
                      <CardAction>
                        <Badge className="text-[10px]">Today</Badge>
                      </CardAction>
                    )}
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    {MEAL_SLOTS.map((slot) => {
                      const SlotIcon = SLOT_ICONS[slot]
                      const name = getEntry(dateKey, persona, slot)?.name

                      return (
                        <div key={slot} className="flex items-center gap-1.5">
                          <SlotIcon
                            className="size-3 shrink-0 text-muted-foreground"
                            aria-hidden
                          />
                          <p
                            title={name ?? undefined}
                            className={cn(
                              "truncate text-xs leading-snug",
                              !name && "italic text-muted-foreground",
                            )}
                          >
                            {name ?? "blank"}
                          </p>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </>
      ) : (
        <Card size="sm">
          <CardContent>
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-muted-foreground">
              {WEEKDAYS_SHORT.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="mt-1.5 grid grid-cols-7 gap-1.5">
              {getMonthGrid(anchor).map((row, rowIndex) =>
                row.map((date, cellIndex) => {
                  const key = `${rowIndex}-${cellIndex}`

                  if (!date) {
                    return <div key={key} aria-hidden />
                  }

                  const dateKey = toDateKey(date)
                  const name = getEntry(dateKey, "adult", "lunch")?.name
                  const isToday = isSameDay(date, today)

                  return (
                    <button
                      key={key}
                      type="button"
                      aria-label={`Open ${formatDay(date)} menu`}
                      onClick={() => openDay(date)}
                      className={cn(
                        "flex min-h-20 flex-col items-start gap-1 rounded border-2 p-1.5 text-left transition-colors hover:bg-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                        isToday && "bg-primary text-primary-foreground shadow-sm",
                      )}
                    >
                      <span className="font-head text-xs font-bold">
                        {date.getDate()}
                      </span>
                      {name && (
                        <span
                          title={name}
                          className="line-clamp-2 text-[10px] leading-tight text-muted-foreground"
                        >
                          {name}
                        </span>
                      )}
                    </button>
                  )
                }),
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
