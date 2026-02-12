"use client"

import { gameInfo } from "@/lib/data"
import { VipPassCard } from "@/components/vip-pass-card"
import { ParkingCard } from "@/components/parking-card"
import { BenefitsCard } from "@/components/benefits-card"
import { FieldAccessCard } from "@/components/field-access-card"
import { QuickActions } from "@/components/quick-actions"
import { Countdown } from "@/components/countdown"

export function HomeScreen() {
  return (
    <div className="hide-scrollbar min-h-screen overflow-y-auto pb-24">
      {/* Header with stadium image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src="/stadium-hero.jpg"
          alt="Michigan Stadium aerial view during a game"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />

        {/* Logo / Title */}
        <div className="absolute left-5 top-[max(1rem,env(safe-area-inset-top))]">
          <h1 className="font-display text-lg font-bold tracking-tight text-white">
            Maize & Blue <span className="text-[#FFCB05]">VIP</span>
          </h1>
        </div>

        {/* Countdown overlay */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
          <span className="mb-1 text-[10px] font-medium uppercase tracking-widest text-white/60">
            Kickoff In
          </span>
          <Countdown />
        </div>
      </div>

      {/* Game info bar */}
      <div className="mx-5 -mt-2 mb-4 flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-lg shadow-black/20">
        <div>
          <p className="text-xs text-muted-foreground">vs. {gameInfo.opponent}</p>
          <p className="text-sm font-semibold text-card-foreground">
            {gameInfo.time} &middot; {gameInfo.tvNetwork}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">{gameInfo.weather}</p>
          <p className="text-xs text-muted-foreground">{gameInfo.attendance}</p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 px-5">
        {/* VIP Pass */}
        <VipPassCard />

        {/* Parking */}
        <ParkingCard />

        {/* Benefits */}
        <BenefitsCard />

        {/* Field Access */}
        <FieldAccessCard />

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  )
}
