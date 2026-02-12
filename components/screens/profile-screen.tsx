"use client"

import { user } from "@/lib/data"
import { useApp } from "@/lib/app-context"
import {
  ArrowLeft,
  Star,
  Trophy,
  Ticket,
  Award,
  Settings,
  Bell,
  HelpCircle,
  ChevronRight,
} from "lucide-react"

export function ProfileScreen() {
  const { navigate } = useApp()

  const progressPercent = Math.round(
    ((user.points) / (user.points + user.pointsToNext)) * 100
  )

  return (
    <div className="hide-scrollbar min-h-screen pb-24">
      <header className="flex items-center gap-3 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
        <button
          onClick={() => navigate("home")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="font-display text-lg font-bold text-foreground">Profile</h1>
      </header>

      {/* Profile header */}
      <div className="mx-5 mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFCB05]/20 text-xl font-bold text-[#FFCB05]">
          {user.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.tier} Tier &middot; {user.tenure}-Year Member</p>
          <p className="text-xs text-muted-foreground">Sec {user.section} &middot; Row {user.row} &middot; Seats {user.seats}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 mb-6 grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center rounded-xl border border-border bg-card p-3">
          <Trophy className="mb-1 h-5 w-5 text-[#FFCB05]" />
          <span className="text-lg font-bold text-foreground">{user.tenure}</span>
          <span className="text-[10px] text-muted-foreground">Years</span>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-border bg-card p-3">
          <Ticket className="mb-1 h-5 w-5 text-[#FFCB05]" />
          <span className="text-lg font-bold text-foreground">48</span>
          <span className="text-[10px] text-muted-foreground">Games</span>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-border bg-card p-3">
          <Award className="mb-1 h-5 w-5 text-[#FFCB05]" />
          <span className="text-lg font-bold text-foreground">{user.points.toLocaleString()}</span>
          <span className="text-[10px] text-muted-foreground">Points</span>
        </div>
      </div>

      {/* Rewards */}
      <div className="mx-5 mb-6 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-bold text-card-foreground">Rewards Progress</h3>
          <span className="text-xs text-[#FFCB05] font-medium">{user.tier} Tier</span>
        </div>
        <div className="mb-2 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-[#FFCB05] transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {user.pointsToNext} pts to {user.nextReward}
        </p>
      </div>

      {/* Badges */}
      <div className="mx-5 mb-6">
        <h3 className="font-display mb-3 text-sm font-bold text-foreground">Badges</h3>
        <div className="flex gap-3">
          {user.badges.map((badge) => (
            <div
              key={badge}
              className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-[#FFCB05]/20 bg-card p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFCB05]/10">
                <Star className="h-5 w-5 text-[#FFCB05]" />
              </div>
              <span className="text-center text-[10px] font-medium text-card-foreground">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="mx-5 space-y-1">
        {[
          { icon: Bell, label: "Notifications", sub: "Manage alerts" },
          { icon: Settings, label: "Account Settings", sub: "Update preferences" },
          { icon: HelpCircle, label: "Help & Support", sub: "FAQs and contact" },
        ].map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-secondary"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <item.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.sub}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}
