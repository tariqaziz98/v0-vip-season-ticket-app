"use client"

import { user, gameInfo } from "@/lib/data"
import { useApp } from "@/lib/app-context"
import { ArrowLeft, Star, Shield, Zap, Percent, Clock, Award } from "lucide-react"

export function VipPassScreen() {
  const { navigate } = useApp()

  const progressPercent = Math.round(
    ((user.points) / (user.points + user.pointsToNext)) * 100
  )

  return (
    <div className="hide-scrollbar min-h-screen pb-24">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
        <button
          onClick={() => navigate("home")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="font-display text-lg font-bold text-foreground">VIP Pass</h1>
      </header>

      {/* Full pass card */}
      <div className="mx-5 mb-6">
        <div
          className="relative overflow-hidden rounded-3xl p-6"
          style={{
            background:
              "linear-gradient(135deg, #00274C 0%, #003366 40%, #004a7c 70%, #00274C 100%)",
          }}
        >
          {/* Shimmer */}
          <div
            className="animate-shimmer pointer-events-none absolute inset-0 opacity-10"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,203,5,0.4) 50%, transparent 100%)",
            }}
          />
          {/* Glow border */}
          <div className="animate-pulse-glow pointer-events-none absolute inset-0 rounded-3xl border border-[#FFCB05]/20" />

          <div className="relative z-10">
            {/* Top bar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#FFCB05]">
                Michigan Athletics
              </div>
              <div className="flex items-center gap-1 rounded-full bg-[#FFCB05]/15 px-2.5 py-1">
                <Star className="h-3 w-3 fill-[#FFCB05] text-[#FFCB05]" />
                <span className="text-[10px] font-bold text-[#FFCB05]">{user.tier} Tier</span>
              </div>
            </div>

            {/* User info */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFCB05]/20 text-2xl font-bold text-[#FFCB05]">
                {user.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-white">{user.name}</h2>
                <p className="text-sm text-white/60">Season Ticket Holder</p>
                <p className="mt-0.5 text-xs text-white/40">
                  Member Since {user.memberSince} &middot; {user.tenure} Years
                </p>
              </div>
            </div>

            {/* Large QR Code */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-2xl bg-white p-4">
                <div className="grid grid-cols-7 grid-rows-7 gap-[2px]">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-4 w-4 rounded-[1px] ${
                        [0,1,2,3,4,5,6,7,13,14,20,21,28,35,36,42,43,44,45,46,47,48,
                         10,11,12,16,17,18,22,24,26,30,31,32,38,39,40,
                         9,15,19,23,25,29,33,37,41].includes(i)
                          ? "bg-[#00274C]"
                          : "bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="mb-4 text-center text-xs text-white/40">
              Sec {user.section} &middot; Row {user.row} &middot; Seats {user.seats}
            </p>

            {/* Game info */}
            <div className="rounded-xl bg-black/20 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-white/40">Next Game</p>
                  <p className="text-sm font-semibold text-white">vs. {gameInfo.opponent}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60">{gameInfo.date}</p>
                  <p className="text-xs text-white/60">{gameInfo.time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Benefits */}
      <div className="px-5">
        <h3 className="font-display mb-3 text-sm font-bold uppercase tracking-wide text-foreground">
          Active Benefits
        </h3>

        <div className="space-y-2">
          {[
            {
              icon: Percent,
              title: "20% Off Concessions",
              sub: "Valid today until 5:00 PM",
              active: true,
            },
            {
              icon: Zap,
              title: "Express Entry - Gate 12",
              sub: "Show QR at gate",
              active: true,
            },
            {
              icon: Shield,
              title: "Field Access",
              sub: "RSVP required - limited spots",
              active: true,
            },
            {
              icon: Clock,
              title: "Early Merchandise Access",
              sub: "Shop opens 3 hours before kickoff",
              active: true,
            },
          ].map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFCB05]/10">
                <benefit.icon className="h-5 w-5 text-[#FFCB05]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{benefit.title}</p>
                <p className="text-xs text-muted-foreground">{benefit.sub}</p>
              </div>
              {benefit.active && (
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              )}
            </div>
          ))}
        </div>

        {/* Rewards Progress */}
        <h3 className="font-display mb-3 mt-6 text-sm font-bold uppercase tracking-wide text-foreground">
          Rewards Balance
        </h3>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#FFCB05]" />
              <span className="text-2xl font-bold text-foreground">{user.points.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">pts</span>
            </div>
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
        <h3 className="font-display mb-3 mt-6 text-sm font-bold uppercase tracking-wide text-foreground">
          Your Badges
        </h3>
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
    </div>
  )
}
