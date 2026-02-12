"use client"

import { useState } from "react"
import { parkingLots, type ParkingLot } from "@/lib/data"
import { useApp } from "@/lib/app-context"
import {
  ArrowLeft,
  MapPin,
  Car,
  CheckCircle2,
  X,
  Navigation,
  RefreshCw,
} from "lucide-react"

type SortMode = "closest" | "available" | "cheapest"

export function ParkingScreen() {
  const { navigate, reservedLot, reserveLot, cancelReservation } = useApp()
  const [sortMode, setSortMode] = useState<SortMode>("closest")
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const reserved = reservedLot ? parkingLots.find((l) => l.id === reservedLot) : null

  const sortedLots = [...parkingLots].sort((a, b) => {
    if (sortMode === "closest") return a.distanceMi - b.distanceMi
    if (sortMode === "available") return b.available - a.available
    return a.sthPrice - b.sthPrice
  })

  const handleReserve = (lot: ParkingLot) => {
    reserveLot(lot.id)
    setSelectedLot(null)
    setShowConfirmation(true)
  }

  // Reservation confirmation state
  if (showConfirmation && reserved) {
    return (
      <div className="hide-scrollbar flex min-h-screen flex-col pb-24">
        <header className="flex items-center gap-3 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
          <button
            onClick={() => { setShowConfirmation(false); navigate("home") }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">Parking Reserved</h1>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center px-5">
          <div className="animate-fade-in-up flex flex-col items-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">{reserved.name} Reserved!</h2>
            <p className="mt-1 text-sm text-muted-foreground">Your spot is guaranteed</p>
          </div>

          <div className="mt-8 w-full space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              {/* QR placeholder for parking */}
              <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-xl bg-white">
                <div className="grid grid-cols-5 grid-rows-5 gap-0.5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-5 w-5 ${
                        [0,1,2,4,5,6,9,10,12,14,18,20,21,22,24].includes(i)
                          ? "bg-[#00274C]"
                          : "bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Show QR code to parking attendant
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Lot</span>
                <span className="text-sm font-medium text-card-foreground">{reserved.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Distance</span>
                <span className="text-sm font-medium text-card-foreground">{reserved.distance} from {reserved.gate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">STH Price</span>
                <span className="text-sm font-medium text-[#FFCB05]">${reserved.sthPrice} <span className="text-muted-foreground line-through">${reserved.price}</span></span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Best For</span>
                <span className="text-sm font-medium text-card-foreground">{reserved.bestFor}</span>
              </div>
            </div>

            <button
              onClick={() => {/* In a real app, this would open maps */}}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFCB05] py-3.5 text-sm font-bold text-[#00274C] transition-transform active:scale-[0.98]"
            >
              <Navigation className="h-4 w-4" />
              Navigate to {reserved.name}
            </button>

            <button
              onClick={() => { cancelReservation(); setShowConfirmation(false) }}
              className="w-full py-2 text-center text-xs text-muted-foreground transition-colors hover:text-destructive"
            >
              Cancel Reservation
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="hide-scrollbar flex min-h-screen flex-col pb-24">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
        <button
          onClick={() => navigate("home")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="font-display text-lg font-bold text-foreground">Game Day Parking</h1>
      </header>

      {/* Stadium map area */}
      <div className="relative mx-5 mb-4 h-48 overflow-hidden rounded-2xl bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Simplified stadium map visualization */}
          <div className="relative">
            {/* Stadium oval */}
            <div className="h-20 w-32 rounded-[50%] border-2 border-[#FFCB05]/30 bg-[#FFCB05]/5 flex items-center justify-center">
              <span className="font-display text-[10px] font-bold text-[#FFCB05]/60">STADIUM</span>
            </div>
            {/* Lot indicators positioned around the stadium */}
            {parkingLots.map((lot, i) => {
              const positions = [
                { top: -16, left: -20 },
                { top: -16, right: -20 },
                { bottom: -16, left: -30 },
                { bottom: -16, right: -30 },
                { top: 20, left: -50 },
                { top: 20, right: -50 },
              ]
              const pos = positions[i] || positions[0]
              return (
                <button
                  key={lot.id}
                  onClick={() => setSelectedLot(lot)}
                  className="absolute flex flex-col items-center"
                  style={pos as React.CSSProperties}
                >
                  <div
                    className={`h-3 w-3 rounded-full border-2 border-background ${
                      lot.status === "available"
                        ? "bg-emerald-500"
                        : lot.status === "filling"
                          ? "bg-amber-500"
                          : "bg-red-500"
                    } ${selectedLot?.id === lot.id ? "ring-2 ring-[#FFCB05]" : ""}`}
                  />
                  <span className="mt-0.5 text-[8px] font-medium text-muted-foreground whitespace-nowrap">
                    {lot.name.replace("Lot ", "")}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex gap-3">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[9px] text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-[9px] text-muted-foreground">Filling</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-[9px] text-muted-foreground">Full</span>
          </div>
        </div>

        {/* Refresh indicator */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 backdrop-blur-sm">
          <RefreshCw className="h-3 w-3 text-muted-foreground" />
          <span className="text-[9px] text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Sort tabs */}
      <div className="mx-5 mb-4 flex gap-2">
        {([
          { key: "closest", label: "Closest" },
          { key: "available", label: "Most Available" },
          { key: "cheapest", label: "Cheapest" },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSortMode(tab.key)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              sortMode === tab.key
                ? "bg-[#FFCB05] text-[#00274C]"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lot list */}
      <div className="flex-1 space-y-3 px-5">
        {sortedLots.map((lot) => (
          <button
            key={lot.id}
            onClick={() => setSelectedLot(lot)}
            className={`w-full rounded-2xl border p-4 text-left transition-all ${
              selectedLot?.id === lot.id
                ? "border-[#FFCB05]/50 bg-card"
                : "border-border bg-card"
            } ${lot.status === "full" ? "opacity-50" : ""}`}
            disabled={lot.status === "full"}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 h-3 w-3 rounded-full ${
                    lot.status === "available"
                      ? "bg-emerald-500"
                      : lot.status === "filling"
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                />
                <div>
                  <h3 className="font-display text-sm font-bold text-card-foreground">
                    {lot.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {lot.available > 0 ? `${lot.available} spaces available` : "Full"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#FFCB05]">${lot.sthPrice}</p>
                {lot.sthPrice < lot.price && (
                  <p className="text-[10px] text-muted-foreground line-through">${lot.price}</p>
                )}
              </div>
            </div>

            {selectedLot?.id === lot.id && lot.status !== "full" && (
              <div className="mt-4 animate-fade-in-up space-y-3 border-t border-border pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Distance</p>
                    <p className="flex items-center gap-1 text-xs font-medium text-card-foreground">
                      <MapPin className="h-3 w-3" /> {lot.distance} to {lot.gate}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Best For</p>
                    <p className="text-xs font-medium text-card-foreground">{lot.bestFor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <RefreshCw className="h-2.5 w-2.5" /> Updated {lot.updatedAgo}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleReserve(lot)
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFCB05] py-3 text-sm font-bold text-[#00274C] transition-transform active:scale-[0.98]"
                >
                  <Car className="h-4 w-4" />
                  Reserve {lot.name}
                </button>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Already reserved banner */}
      {reserved && !showConfirmation && (
        <div className="fixed bottom-20 left-5 right-5 z-40 flex items-center justify-between rounded-2xl bg-emerald-500/20 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <div>
              <p className="text-sm font-semibold text-card-foreground">{reserved.name} Reserved</p>
              <p className="text-xs text-muted-foreground">{reserved.distance} from {reserved.gate}</p>
            </div>
          </div>
          <button
            onClick={cancelReservation}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-background/50"
            aria-label="Cancel reservation"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  )
}
