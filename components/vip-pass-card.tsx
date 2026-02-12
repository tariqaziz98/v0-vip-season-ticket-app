"use client"

import { user, gameInfo } from "@/lib/data"
import { useApp } from "@/lib/app-context"
import { Star, QrCode, ChevronRight } from "lucide-react"

export function VipPassCard() {
  const { navigate } = useApp()

  return (
    <button
      onClick={() => navigate("vip-pass")}
      className="relative w-full overflow-hidden rounded-2xl p-5 text-left transition-transform active:scale-[0.98]"
      style={{
        background: "linear-gradient(135deg, #00274C 0%, #00375e 50%, #004a7c 100%)",
      }}
    >
      {/* Shimmer effect overlay */}
      <div
        className="animate-shimmer pointer-events-none absolute inset-0 opacity-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,203,5,0.3) 50%, transparent 100%)",
        }}
      />

      {/* Border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[#FFCB05]/20" />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-[#FFCB05]">
              Season Ticket Holder
            </span>
          </div>
          <h2 className="font-display text-xl font-bold text-white">{user.name}</h2>
          <p className="mt-1 text-sm text-white/60">
            Member Since {user.memberSince}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFCB05]/15 px-3 py-1 text-xs font-semibold text-[#FFCB05]">
              <Star className="h-3 w-3 fill-current" />
              {user.tenure}-Year Member
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              {user.tier} Tier
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
            <QrCode className="h-8 w-8 text-[#FFCB05]" />
          </div>
          <span className="text-[10px] text-white/40">Tap to scan</span>
        </div>
      </div>

      <div className="relative z-10 mt-4 flex items-center justify-between rounded-xl bg-black/20 px-4 py-2.5">
        <div>
          <p className="text-xs text-white/50">Next Game</p>
          <p className="text-sm font-semibold text-white">
            vs. {gameInfo.opponent}
          </p>
        </div>
        <div className="flex items-center gap-1 text-[#FFCB05]">
          <span className="text-xs font-medium">{gameInfo.date}</span>
          <ChevronRight className="h-3 w-3" />
        </div>
      </div>
    </button>
  )
}
