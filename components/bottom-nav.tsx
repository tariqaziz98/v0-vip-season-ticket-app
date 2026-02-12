"use client"

import { useApp, type Screen } from "@/lib/app-context"
import { Home, CalendarDays, User } from "lucide-react"

const navItems: { label: string; icon: typeof Home; screen: Screen }[] = [
  { label: "Home", icon: Home, screen: "home" },
  { label: "Schedule", icon: CalendarDays, screen: "schedule" },
  { label: "Profile", icon: User, screen: "profile" },
]

export function BottomNav() {
  const { currentScreen, navigate } = useApp()

  const isActive = (screen: Screen) => {
    if (screen === "home") {
      return ["home", "parking", "concessions", "field-access", "vip-pass"].includes(currentScreen)
    }
    return currentScreen === screen
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg" role="navigation" aria-label="Main navigation">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const active = isActive(item.screen)
          return (
            <button
              key={item.screen}
              onClick={() => navigate(item.screen)}
              className={`flex flex-col items-center gap-0.5 px-6 py-1 transition-colors ${
                active ? "text-[#FFCB05]" : "text-muted-foreground"
              }`}
              aria-current={active ? "page" : undefined}
              aria-label={item.label}
            >
              <item.icon className={`h-5 w-5 ${active ? "fill-[#FFCB05]/20" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
