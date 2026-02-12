"use client"

import { useApp } from "@/lib/app-context"
import { ArrowLeft, MapPin, Tv } from "lucide-react"

const schedule = [
  { opponent: "Minnesota Golden Gophers", date: "Sep 6", time: "12:00 PM", tv: "BTN", home: true, result: "W 38-14" },
  { opponent: "Texas Longhorns", date: "Sep 13", time: "3:30 PM", tv: "FOX", home: false, result: "W 24-21" },
  { opponent: "Arkansas State", date: "Sep 20", time: "12:00 PM", tv: "BTN", home: true, result: "W 52-7" },
  { opponent: "USC Trojans", date: "Sep 27", time: "7:30 PM", tv: "NBC", home: true, result: "W 31-28" },
  { opponent: "Wisconsin Badgers", date: "Oct 4", time: "3:30 PM", tv: "CBS", home: false, result: "L 21-24" },
  { opponent: "Nebraska Cornhuskers", date: "Oct 18", time: "12:00 PM", tv: "FOX", home: true, result: "W 35-17" },
  { opponent: "Michigan State", date: "Oct 25", time: "7:00 PM", tv: "NBC", home: false, result: "W 42-10" },
  { opponent: "Illinois Fighting Illini", date: "Nov 1", time: "12:00 PM", tv: "BTN", home: true, result: "W 28-14" },
  { opponent: "Indiana Hoosiers", date: "Nov 8", time: "3:30 PM", tv: "FOX", home: false, result: null },
  { opponent: "Northwestern Wildcats", date: "Nov 15", time: "12:00 PM", tv: "BTN", home: true, result: null },
  { opponent: "Ohio State Buckeyes", date: "Nov 29", time: "3:30 PM", tv: "FOX", home: true, result: null, next: true },
]

export function ScheduleScreen() {
  const { navigate } = useApp()

  return (
    <div className="hide-scrollbar min-h-screen pb-24">
      <header className="flex items-center gap-3 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
        <button
          onClick={() => navigate("home")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="font-display text-lg font-bold text-foreground">2025 Schedule</h1>
      </header>

      <div className="mx-5 mb-4 flex items-center justify-between rounded-xl bg-card p-4 border border-border">
        <div>
          <p className="text-xs text-muted-foreground">Season Record</p>
          <p className="font-display text-lg font-bold text-foreground">7-1</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Home Record</p>
          <p className="font-display text-lg font-bold text-[#FFCB05]">5-0</p>
        </div>
      </div>

      <div className="space-y-2 px-5">
        {schedule.map((game) => (
          <div
            key={game.date}
            className={`flex items-center gap-3 rounded-xl border p-4 ${
              game.next
                ? "border-[#FFCB05]/30 bg-[#FFCB05]/5"
                : "border-border bg-card"
            }`}
          >
            <div className="w-12 text-center">
              <p className="text-xs font-medium text-muted-foreground">{game.date}</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className={`text-sm font-medium ${game.next ? "text-[#FFCB05]" : "text-card-foreground"}`}>
                  {game.home ? "vs." : "@"} {game.opponent}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Tv className="h-2.5 w-2.5" /> {game.tv}
                </span>
                <span className="text-[10px] text-muted-foreground">{game.time}</span>
                {game.home && (
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <MapPin className="h-2.5 w-2.5" /> Home
                  </span>
                )}
              </div>
            </div>
            <div>
              {game.result ? (
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  game.result.startsWith("W")
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}>
                  {game.result}
                </span>
              ) : game.next ? (
                <span className="rounded-full bg-[#FFCB05]/20 px-2.5 py-1 text-[10px] font-bold text-[#FFCB05]">
                  NEXT
                </span>
              ) : (
                <span className="text-[10px] text-muted-foreground">Upcoming</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
