"use client"

import { useEffect, useState } from "react"
import { gameInfo } from "@/lib/data"

export function Countdown() {
  const [time, setTime] = useState(gameInfo.kickoffIn)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev
        seconds -= 1
        if (seconds < 0) {
          seconds = 59
          minutes -= 1
        }
        if (minutes < 0) {
          minutes = 59
          hours -= 1
        }
        if (hours < 0) {
          return { hours: 0, minutes: 0, seconds: 0 }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <div className="flex items-center gap-1 text-center">
      <div className="flex flex-col items-center">
        <span className="font-display text-2xl font-bold tabular-nums text-[#FFCB05]">
          {pad(time.hours)}
        </span>
        <span className="text-[9px] uppercase text-muted-foreground">hrs</span>
      </div>
      <span className="mb-3 text-lg font-bold text-[#FFCB05]/50">:</span>
      <div className="flex flex-col items-center">
        <span className="font-display text-2xl font-bold tabular-nums text-[#FFCB05]">
          {pad(time.minutes)}
        </span>
        <span className="text-[9px] uppercase text-muted-foreground">min</span>
      </div>
      <span className="mb-3 text-lg font-bold text-[#FFCB05]/50">:</span>
      <div className="flex flex-col items-center">
        <span className="font-display text-2xl font-bold tabular-nums text-[#FFCB05]">
          {pad(time.seconds)}
        </span>
        <span className="text-[9px] uppercase text-muted-foreground">sec</span>
      </div>
    </div>
  )
}
