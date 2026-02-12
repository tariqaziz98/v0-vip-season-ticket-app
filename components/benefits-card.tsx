"use client"

import { useApp } from "@/lib/app-context"
import { Percent, ArrowRight, Zap, QrCode } from "lucide-react"

export function BenefitsCard() {
  const { navigate } = useApp()

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-display mb-4 text-sm font-bold uppercase tracking-wide text-card-foreground">
        Your VIP Perks Today
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => navigate("concessions")}
          className="flex flex-col items-center gap-2 rounded-xl bg-secondary/50 p-3 transition-colors hover:bg-secondary active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFCB05]/10">
            <Percent className="h-5 w-5 text-[#FFCB05]" />
          </div>
          <span className="text-center text-[11px] font-medium leading-tight text-card-foreground">
            20% Off Concessions
          </span>
        </button>

        <button
          onClick={() => navigate("vip-pass")}
          className="flex flex-col items-center gap-2 rounded-xl bg-secondary/50 p-3 transition-colors hover:bg-secondary active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFCB05]/10">
            <Zap className="h-5 w-5 text-[#FFCB05]" />
          </div>
          <span className="text-center text-[11px] font-medium leading-tight text-card-foreground">
            Express Entry Gate 12
          </span>
        </button>

        <button
          onClick={() => navigate("concessions")}
          className="flex flex-col items-center gap-2 rounded-xl bg-secondary/50 p-3 transition-colors hover:bg-secondary active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFCB05]/10">
            <QrCode className="h-5 w-5 text-[#FFCB05]" />
          </div>
          <span className="text-center text-[11px] font-medium leading-tight text-card-foreground">
            Order Ahead Available
          </span>
        </button>
      </div>

      <button
        onClick={() => navigate("concessions")}
        className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl border border-border py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-card-foreground"
      >
        View All Benefits
        <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  )
}
