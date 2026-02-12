"use client"

import { useApp } from "@/lib/app-context"
import { UtensilsCrossed, Navigation, Share2 } from "lucide-react"

export function QuickActions() {
  const { navigate } = useApp()

  return (
    <div className="flex gap-3">
      <button
        onClick={() => navigate("concessions")}
        className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 transition-transform active:scale-95"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFCB05]/10">
          <UtensilsCrossed className="h-5 w-5 text-[#FFCB05]" />
        </div>
        <span className="text-xs font-medium text-card-foreground">Order Food</span>
      </button>

      <button
        onClick={() => navigate("parking")}
        className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 transition-transform active:scale-95"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFCB05]/10">
          <Navigation className="h-5 w-5 text-[#FFCB05]" />
        </div>
        <span className="text-xs font-medium text-card-foreground">Navigate</span>
      </button>

      <button
        className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 transition-transform active:scale-95"
        onClick={() => {
          if (typeof navigator !== "undefined" && navigator.share) {
            navigator.share({
              title: "Michigan STH VIP",
              text: "7-Year Season Ticket Holder at The Big House!",
            })
          }
        }}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFCB05]/10">
          <Share2 className="h-5 w-5 text-[#FFCB05]" />
        </div>
        <span className="text-xs font-medium text-card-foreground">Share</span>
      </button>
    </div>
  )
}
