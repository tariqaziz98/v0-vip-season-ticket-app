"use client"

import { fieldAccessSlots } from "@/lib/data"
import { useApp } from "@/lib/app-context"
import {
  ArrowLeft,
  Lock,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  QrCode,
  CalendarPlus,
  Share2,
} from "lucide-react"

export function FieldAccessScreen() {
  const { navigate, rsvpSlots, rsvpFieldAccess, cancelRsvp } = useApp()

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
        <h1 className="font-display text-lg font-bold text-foreground">Field Access</h1>
      </header>

      {/* Hero */}
      <div className="relative mx-5 mb-6 h-52 overflow-hidden rounded-2xl">
        <img
          src="/field-access.jpg"
          alt="Players warming up on the sideline at Michigan Stadium"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="mb-2 flex items-center gap-1">
            <Lock className="h-3 w-3 text-[#FFCB05]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFCB05]">
              Season Ticket Holders Only
            </span>
          </div>
          <h2 className="font-display text-xl font-bold text-white text-balance">
            Exclusive Pregame Field Experiences
          </h2>
          <p className="mt-1 text-xs text-white/60">
            Get closer to the action than anyone else in the stadium
          </p>
        </div>
      </div>

      {/* Slots */}
      <div className="space-y-4 px-5">
        {fieldAccessSlots.map((slot) => {
          const isRsvpd = rsvpSlots.includes(slot.id)
          const spotsPercent = Math.round(
            ((slot.spotsTotal - slot.spotsRemaining) / slot.spotsTotal) * 100
          )

          return (
            <div
              key={slot.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-card-foreground">
                      {slot.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {slot.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {slot.location}
                      </span>
                    </div>
                  </div>
                  {isRsvpd && (
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                      Confirmed
                    </span>
                  )}
                </div>

                <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                  {slot.description}
                </p>

                {/* Capacity bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {slot.rsvpCount} STH already RSVP&apos;d
                      </span>
                    </div>
                    <span className={`text-xs font-semibold ${
                      slot.spotsRemaining <= 10 ? "text-amber-500" : "text-card-foreground"
                    }`}>
                      {slot.spotsRemaining} spots left
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full transition-all ${
                        spotsPercent > 80 ? "bg-amber-500" : "bg-[#FFCB05]"
                      }`}
                      style={{ width: `${spotsPercent}%` }}
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {slot.requirements.map((req) => (
                    <span
                      key={req}
                      className="rounded-full bg-secondary px-2.5 py-1 text-[10px] text-muted-foreground"
                    >
                      {req}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                {isRsvpd ? (
                  <div className="space-y-3">
                    {/* Confirmation card */}
                    <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span className="text-sm font-semibold text-card-foreground">
                          {"You're in!"}
                        </span>
                      </div>

                      {/* QR code for field entry */}
                      <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-xl bg-white">
                        <QrCode className="h-12 w-12 text-[#00274C]" />
                      </div>

                      <p className="text-center text-[10px] text-muted-foreground mb-3">
                        Show QR code at {slot.location}
                      </p>

                      <div className="flex gap-2">
                        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary py-2 text-xs font-medium text-card-foreground">
                          <CalendarPlus className="h-3 w-3" />
                          Add to Calendar
                        </button>
                        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary py-2 text-xs font-medium text-card-foreground">
                          <Share2 className="h-3 w-3" />
                          Share
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => cancelRsvp(slot.id)}
                      className="w-full text-center text-xs text-muted-foreground hover:text-destructive"
                    >
                      Cancel RSVP
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => rsvpFieldAccess(slot.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFCB05] py-3.5 text-sm font-bold text-[#00274C] transition-transform active:scale-[0.98]"
                  >
                    RSVP Now &middot; {slot.spotsRemaining} spots left
                  </button>
                )}
              </div>
            </div>
          )
        })}

        {/* Social sharing section */}
        <div className="rounded-2xl border border-[#FFCB05]/20 bg-card p-5 mt-2">
          <h3 className="font-display mb-2 text-sm font-bold text-card-foreground">
            Share Your Experience
          </h3>
          <p className="mb-4 text-xs text-muted-foreground">
            Let everyone know about your exclusive sideline access
          </p>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#FFCB05]/30 py-3 text-sm font-medium text-[#FFCB05] transition-colors hover:bg-[#FFCB05]/5"
          >
            <Share2 className="h-4 w-4" />
            Share on Social Media
          </button>
        </div>
      </div>
    </div>
  )
}
