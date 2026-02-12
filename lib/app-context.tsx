"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Screen = "home" | "parking" | "vip-pass" | "concessions" | "field-access" | "schedule" | "profile"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface AppState {
  currentScreen: Screen
  reservedLot: string | null
  rsvpSlots: string[]
  cart: CartItem[]
  orderPlaced: boolean
  orderNumber: string | null
}

interface AppContextType extends AppState {
  navigate: (screen: Screen) => void
  reserveLot: (lotId: string) => void
  cancelReservation: () => void
  rsvpFieldAccess: (slotId: string) => void
  cancelRsvp: (slotId: string) => void
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  placeOrder: () => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentScreen: "home",
    reservedLot: null,
    rsvpSlots: [],
    cart: [],
    orderPlaced: false,
    orderNumber: null,
  })

  const navigate = useCallback((screen: Screen) => {
    setState((prev) => ({ ...prev, currentScreen: screen }))
  }, [])

  const reserveLot = useCallback((lotId: string) => {
    setState((prev) => ({ ...prev, reservedLot: lotId }))
  }, [])

  const cancelReservation = useCallback(() => {
    setState((prev) => ({ ...prev, reservedLot: null }))
  }, [])

  const rsvpFieldAccess = useCallback((slotId: string) => {
    setState((prev) => ({
      ...prev,
      rsvpSlots: [...prev.rsvpSlots, slotId],
    }))
  }, [])

  const cancelRsvp = useCallback((slotId: string) => {
    setState((prev) => ({
      ...prev,
      rsvpSlots: prev.rsvpSlots.filter((id) => id !== slotId),
    }))
  }, [])

  const addToCart = useCallback((item: CartItem) => {
    setState((prev) => {
      const existing = prev.cart.find((i) => i.id === item.id)
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { ...prev, cart: [...prev.cart, { ...item, quantity: 1 }] }
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((i) => i.id !== id),
    }))
  }, [])

  const clearCart = useCallback(() => {
    setState((prev) => ({ ...prev, cart: [], orderPlaced: false, orderNumber: null }))
  }, [])

  const placeOrder = useCallback(() => {
    const orderNum = `#${Math.floor(4000 + Math.random() * 1000)}`
    setState((prev) => ({
      ...prev,
      orderPlaced: true,
      orderNumber: orderNum,
      cart: [],
    }))
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        navigate,
        reserveLot,
        cancelReservation,
        rsvpFieldAccess,
        cancelRsvp,
        addToCart,
        removeFromCart,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}
