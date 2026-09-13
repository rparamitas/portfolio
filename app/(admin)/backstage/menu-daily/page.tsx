import type { Metadata } from "next"
import Link from "next/link"

import { MenuDailyView } from "@/components/backstage/menu-daily"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Menu Daily",
}

const MenuDailyPage = () => {
  return (
    <>
      <header className="flex flex-col gap-y-2 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-head text-3xl md:text-4xl">Menu Daily</h1>
          <p className="text-muted-foreground">
            Weekly family menu, Monday to Sunday, for adult and children.
          </p>
        </div>
        <Button
          render={<Link href="/backstage/menu-daily/create" />}
          nativeButton={false}
        >
          Create menu
        </Button>
      </header>
      <MenuDailyView />
    </>
  )
}

export default MenuDailyPage
