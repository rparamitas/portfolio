"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  CircleHelp,
  Home,
  LayoutDashboard,
  LogOut,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  SunDim,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import { josefinSans } from "@/app/font";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/footer";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

interface NavItem {
  title: string;
  icon: LucideIcon;
  href?: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Dashboard", icon: LayoutDashboard, href: "/backstage" },
  { title: "Menu", icon: Utensils, href: "/backstage/menu-daily" },
  { title: "Team", icon: Users },
  { title: "Notifications", icon: Bell, badge: 3 },
  { title: "Settings", icon: Settings },
  { title: "Help", icon: CircleHelp },
];

const mobileQuery = "(max-width: 767px)";
const subscribeMobile = (onChange: () => void) => {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export function BackstageSidebar() {
  const { data: session } = authClient.useSession();
  console.log(session);
  const pathname = usePathname();
  const router = useRouter();
  // Start collapsed on small screens (server renders expanded; this corrects
  // after hydration without an effect-driven setState).
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(mobileQuery).matches,
    () => false,
  );
  const [collapsed, setCollapsed] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const isCollapsed = collapsed || isMobile;

  const handleSignOut = async () => {
    setIsPending(true);
    await authClient.signOut();
    router.push("/");
  };

  return (
    <aside
      className={cn(
        "bg-card sticky top-0 flex h-svh flex-col border-r-2 transition-[width] duration-300",
        EASE,
        collapsed ? "w-[4.5rem]" : "w-64",
      )}
    >
      <div
        className={cn(
          "flex items-center p-4",
          isCollapsed ? "flex-col gap-2" : "justify-between",
        )}
      >
        {!isCollapsed && <Logo />}
        <div
          className={cn("flex items-center gap-1", isCollapsed && "flex-col")}
        >
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle between light and dark mode"
          >
            <SunDim className="dark:hidden" />
            <Moon className="hidden dark:block" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center gap-3 px-4 pb-4",
          isCollapsed && "justify-center px-0",
        )}
      >
        <Avatar size="lg">
          <AvatarImage src="/rahmita.png" alt="Rahmita Paramita Sudirman" />
          <AvatarFallback>RP</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="min-w-0">
            <p
              className={cn(
                "truncate text-sm font-semibold",
                josefinSans.className,
              )}
            >
              {session?.user?.name}
            </p>
            <p className="text-muted-foreground text-xs capitalize">
              {session?.user?.role}
            </p>
          </div>
        )}
      </div>

      <Separator />

      <nav className="flex flex-1 flex-col gap-1 overflow-hidden p-3">
        {navItems.map((item) => {
          const isActive = item.href === pathname;

          const content = (
            <>
              <span className="relative shrink-0">
                <item.icon className="size-5" aria-hidden />
                {item.badge && isCollapsed && (
                  <span className="bg-primary text-primary-foreground absolute -top-1.5 -right-2 flex size-4 items-center justify-center rounded-full border-2 border-black text-[9px] font-bold">
                    {item.badge}
                  </span>
                )}
              </span>
              {!isCollapsed && (
                <>
                  <span className="truncate">{item.title}</span>
                  {item.badge ? (
                    <Badge className="ml-auto">{item.badge}</Badge>
                  ) : null}
                </>
              )}
            </>
          );

          const className = cn(
            "flex w-full cursor-pointer items-center gap-3 rounded border-2 border-transparent px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            josefinSans.className,
            isCollapsed && "justify-center px-0",
            isActive &&
              "border-black bg-primary text-primary-foreground shadow-sm",
          );

          return item.href ? (
            <Link
              key={item.title}
              href={item.href}
              className={className}
              aria-current={isActive ? "page" : undefined}
            >
              {content}
            </Link>
          ) : (
            <button key={item.title} type="button" className={className}>
              {content}
            </button>
          );
        })}
      </nav>

      <Separator />

      <div
        className={cn("flex items-center gap-2 p-3", isCollapsed && "flex-col")}
      >
        <Button
          variant="destructive"
          size={isCollapsed ? "icon-sm" : "sm"}
          className={cn("flex-1", isCollapsed && "flex-none")}
          onClick={handleSignOut}
          disabled={isPending}
          aria-label="Log out"
        >
          <LogOut />
          {!isCollapsed && "Log out"}
        </Button>
      </div>
    </aside>
  );
}
