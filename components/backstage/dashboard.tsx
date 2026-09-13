import {
  ArrowDownRight,
  ArrowUpRight,
  PackageCheck,
  ShoppingBag,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Stat {
  id: number
  title: string
  value: string
  delta: string
  trend: "up" | "down"
  icon: LucideIcon
}

const stats: Stat[] = [
  {
    id: 1,
    title: "Total Projects",
    value: "24",
    delta: "+12.5%",
    trend: "up",
    icon: ShoppingBag,
  },
  {
    id: 2,
    title: "Units Shipped",
    value: "58,400",
    delta: "+8.2%",
    trend: "up",
    icon: PackageCheck,
  },
  {
    id: 3,
    title: "Clients",
    value: "18",
    delta: "+3",
    trend: "up",
    icon: Users,
  },
  {
    id: 4,
    title: "Avg. Review",
    value: "4.9",
    delta: "-0.1",
    trend: "down",
    icon: Star,
  },
]

interface Activity {
  id: number
  title: string
  category: string
  status: "In Progress" | "Shipped" | "Review"
  date: string
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Whitening Serum Reformulation",
    category: "Skincare",
    status: "In Progress",
    date: "Sep 10, 2026",
  },
  {
    id: 2,
    title: "Baby Lotion Batch #204 QA",
    category: "Baby Care",
    status: "Review",
    date: "Sep 08, 2026",
  },
  {
    id: 3,
    title: "Pillars White Label Restock",
    category: "Body Care",
    status: "Shipped",
    date: "Sep 05, 2026",
  },
  {
    id: 4,
    title: "Sunscreen SPF 50 Stability Test",
    category: "Facial Care",
    status: "In Progress",
    date: "Sep 02, 2026",
  },
  {
    id: 5,
    title: "Lip Tint Packaging Refresh",
    category: "Makeup",
    status: "Review",
    date: "Aug 28, 2026",
  },
]

const statusVariant = {
  "In Progress": "default",
  Review: "secondary",
  Shipped: "outline",
} as const

export function DashboardContent() {
  return (
    <div className="flex flex-col gap-y-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription className="font-head font-semibold">
                  {stat.title}
                </CardDescription>
                <stat.icon className="size-4 text-muted-foreground" aria-hidden />
              </div>
              <CardTitle className="text-3xl font-bold">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className={cn(
                  "flex w-fit items-center gap-1 text-xs font-semibold",
                  stat.trend === "up"
                    ? "text-green-600 dark:text-green-400"
                    : "text-destructive",
                )}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="size-3" aria-hidden />
                ) : (
                  <ArrowDownRight className="size-3" aria-hidden />
                )}
                {stat.delta}
                <span className="font-normal text-muted-foreground">
                  vs last month
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-y-4">
        <h2 className="font-head text-xl font-bold">Recent Activity</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {activities.map((activity) => (
            <Card key={activity.id} size="sm">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="font-semibold">
                      {activity.title}
                    </CardTitle>
                    <CardDescription>
                      {activity.category} · {activity.date}
                    </CardDescription>
                  </div>
                  <Badge variant={statusVariant[activity.status]}>
                    {activity.status}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
