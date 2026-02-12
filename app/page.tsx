"use client"

import { AppProvider, useApp } from "@/lib/app-context"
import { BottomNav } from "@/components/bottom-nav"
import { HomeScreen } from "@/components/screens/home-screen"
import { ParkingScreen } from "@/components/screens/parking-screen"
import { VipPassScreen } from "@/components/screens/vip-pass-screen"
import { ConcessionsScreen } from "@/components/screens/concessions-screen"
import { FieldAccessScreen } from "@/components/screens/field-access-screen"
import { ScheduleScreen } from "@/components/screens/schedule-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"

function AppContent() {
  const { currentScreen } = useApp()

  return (
    <div className="mx-auto max-w-lg min-h-screen relative">
      {currentScreen === "home" && <HomeScreen />}
      {currentScreen === "parking" && <ParkingScreen />}
      {currentScreen === "vip-pass" && <VipPassScreen />}
      {currentScreen === "concessions" && <ConcessionsScreen />}
      {currentScreen === "field-access" && <FieldAccessScreen />}
      {currentScreen === "schedule" && <ScheduleScreen />}
      {currentScreen === "profile" && <ProfileScreen />}
      <BottomNav />
    </div>
  )
}

export default function Page() {
  return (
    <main className="bg-background">
      <AppProvider>
        <AppContent />
      </AppProvider>
    </main>
  )
}
