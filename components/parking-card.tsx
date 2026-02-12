"use client"

import { parkingLots } from "@/lib/data"
import { useApp } from "@/lib/app-context"
import { Car, MapPin, ChevronRight, CircleDot } from "lucide-react"

export function ParkingCard() {
  const { navigate, reservedLot } = useApp()

  const topLots = parkingLots.filter((l) => l.status !== "full").slice(0, 3)
  const reserved = reservedLot ? parkingLots.find((l) => l.id === reservedLot) : null

  if (reserved) {
    return (
      <button
        onClick={() => navigate("parking")}
        className="w-full rounded-2xl border border-[#FFCB05]/20 bg-card p-5 text-left transition-transform active:scale-[0.98]"
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFCB05]/10">
              <Car className="h-4 w-4 text-[#FFCB05]" />
            </div>
            <span className="font-display text-sm font-bold uppercase tracking-wide text-card-foreground">
              Parking Reserved
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="rounded-xl bg-[#FFCB05]/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-bold text-card-foreground">{reserved.name}</p>
              <p className="text-sm text-muted-foreground">
                {reserved.distance} from {reserved.gate}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFCB05]/20">
              <CircleDot className="h-5 w-5 text-[#FFCB05]" />
            </div>
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={() => navigate("parking")}
      className="w-full rounded-2xl border border-border bg-card p-5 text-left transition-transform active:scale-[0.98]"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFCB05]/10">
            <Car className="h-4 w-4 text-[#FFCB05]" />
          </div>
          <span className="font-display text-sm font-bold uppercase tracking-wide text-card-foreground">
            Game Day Parking
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Mini lot map indicators */}
      <div className="mb-3 flex gap-2">
        {parkingLots.slice(0, 6).map((lot) => (
          <div key={lot.id} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`h-2 w-full rounded-full ${
                lot.status === "available"
                  ? "bg-emerald-500"
                  : lot.status === "filling"
                    ? "bg-amber-500"
                    : "bg-red-500"
              }`}
            />
            <span className="text-[9px] text-muted-foreground">{lot.name.replace("Lot ", "")}</span>
          </div>
        ))}
      </div>

      {/* Best available */}
      <div className="space-y-2">
        {topLots.map((lot) => (
          <div
            key={lot.id}
            className="flex items-center justify-between rounded-xl bg-secondary/50 px-3 py-2.5"
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  lot.status === "available" ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              <span className="text-sm font-medium text-card-foreground">{lot.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {lot.available} spots
              </span>
              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {lot.distance}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-xs font-medium text-[#FFCB05]">
        Reserve Your Spot
      </p>
    </button>
  )
}
