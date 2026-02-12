"use client"

import { fieldAccessSlots } from "@/lib/data"
import { useApp } from "@/lib/app-context"
import { ChevronRight, Lock, Users } from "lucide-react"

export function FieldAccessCard() {
  const { navigate, rsvpSlots } = useApp()
  const slot = fieldAccessSlots[0]
  const isRsvpd = rsvpSlots.includes(slot.id)

  return (
    <button
      onClick={() => navigate("field-access")}
      className="relative w-full overflow-hidden rounded-2xl text-left transition-transform active:scale-[0.98]"
    >
      {/* Background image */}
      <div className="relative h-44">
        <img
          src="/field-access.jpg"
          alt="Pregame sideline view at Michigan Stadium"
          className="h-full w-full rounded-2xl object-cover"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Badge */}
        <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-[#FFCB05] px-2.5 py-1">
          <Lock className="h-3 w-3 text-[#00274C]" />
          <span className="text-[10px] font-bold uppercase text-[#00274C]">
            STH Exclusive
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-base font-bold text-white">
            {slot.title}
          </h3>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/70">
                {slot.date} &middot; {slot.time}
              </span>
            </div>
            {isRsvpd ? (
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                RSVP&apos;d
              </span>
            ) : (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-[#FFCB05]" />
                <span className="text-xs font-semibold text-[#FFCB05]">
                  {slot.spotsRemaining} spots left
                </span>
                <ChevronRight className="h-3 w-3 text-[#FFCB05]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
