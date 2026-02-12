"use client"

import { useState } from "react"
import { menuItems, type MenuItem } from "@/lib/data"
import { useApp } from "@/lib/app-context"
import {
  ArrowLeft,
  Plus,
  Minus,
  Clock,
  ShoppingCart,
  CheckCircle2,
  QrCode,
  Trash2,
} from "lucide-react"

type Category = "featured" | "food" | "drinks" | "snacks"

export function ConcessionsScreen() {
  const {
    navigate,
    cart,
    addToCart,
    removeFromCart,
    placeOrder,
    orderPlaced,
    orderNumber,
    clearCart,
  } = useApp()
  const [activeCategory, setActiveCategory] = useState<Category>("featured")
  const [showCart, setShowCart] = useState(false)

  const categories: { key: Category; label: string }[] = [
    { key: "featured", label: "Featured" },
    { key: "food", label: "Food" },
    { key: "drinks", label: "Drinks" },
    { key: "snacks", label: "Snacks" },
  ]

  const filteredItems = menuItems.filter((item) => item.category === activeCategory)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleAddItem = (item: MenuItem) => {
    addToCart({ id: item.id, name: item.name, price: item.sthPrice, quantity: 1 })
  }

  // Order placed state
  if (orderPlaced) {
    return (
      <div className="hide-scrollbar flex min-h-screen flex-col pb-24">
        <header className="flex items-center gap-3 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
          <button
            onClick={() => { clearCart(); navigate("home") }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">Order Status</h1>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center px-5">
          <div className="animate-fade-in-up flex flex-col items-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Order {orderNumber}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Preparing your order</p>
          </div>

          <div className="mt-8 w-full space-y-4">
            {/* Progress */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-card-foreground">Order Status</span>
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
                  Preparing
                </span>
              </div>
              <div className="mb-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-1/3 rounded-full bg-[#FFCB05] transition-all" />
              </div>
              <p className="text-xs text-muted-foreground">Estimated ready: 8 minutes</p>
            </div>

            {/* Pickup info */}
            <div className="rounded-2xl border border-[#FFCB05]/20 bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFCB05]/10">
                  <QrCode className="h-6 w-6 text-[#FFCB05]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-card-foreground">Window 5</p>
                  <p className="text-xs text-[#FFCB05] font-medium">Express Line</p>
                </div>
              </div>
              <p className="mt-3 rounded-lg bg-emerald-500/10 p-2 text-center text-xs font-medium text-emerald-400">
                {"You're saving ~12 minutes vs. standard line"}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Cart view
  if (showCart && cart.length > 0) {
    return (
      <div className="hide-scrollbar flex min-h-screen flex-col pb-24">
        <header className="flex items-center gap-3 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
          <button
            onClick={() => setShowCart(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
            aria-label="Go back to menu"
          >
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">Your Order</h1>
        </header>

        <div className="flex-1 px-5">
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
              >
                <div>
                  <p className="text-sm font-medium text-card-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#FFCB05]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 rounded-2xl border border-border bg-card p-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-sm text-card-foreground">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">STH Savings</span>
              <span className="text-sm font-medium text-emerald-400">-20% applied</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="text-sm font-bold text-card-foreground">Total</span>
              <span className="text-sm font-bold text-[#FFCB05]">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-secondary/50 p-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Express Pickup &middot; Window 5 &middot; Est. 8 min
            </span>
          </div>
        </div>

        <div className="px-5 py-4">
          <button
            onClick={placeOrder}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFCB05] py-3.5 text-sm font-bold text-[#00274C] transition-transform active:scale-[0.98]"
          >
            Place Order &middot; ${cartTotal.toFixed(2)}
          </button>
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
        <h1 className="font-display flex-1 text-lg font-bold text-foreground">Order Ahead</h1>
        {cartCount > 0 && (
          <button
            onClick={() => setShowCart(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#FFCB05]/10"
            aria-label={`View cart with ${cartCount} items`}
          >
            <ShoppingCart className="h-4 w-4 text-[#FFCB05]" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFCB05] text-[9px] font-bold text-[#00274C]">
              {cartCount}
            </span>
          </button>
        )}
      </header>

      {/* STH discount banner */}
      <div className="mx-5 mb-4 rounded-xl bg-[#FFCB05]/10 p-3 flex items-center gap-2">
        <span className="rounded-full bg-[#FFCB05] px-2 py-0.5 text-[10px] font-bold text-[#00274C]">
          STH
        </span>
        <span className="text-xs font-medium text-[#FFCB05]">
          20% discount auto-applied to all items
        </span>
      </div>

      {/* Category tabs */}
      <div className="hide-scrollbar mb-4 flex gap-2 overflow-x-auto px-5">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              activeCategory === cat.key
                ? "bg-[#FFCB05] text-[#00274C]"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu items */}
      <div className="flex-1 space-y-3 px-5">
        {filteredItems.map((item) => {
          const inCart = cart.find((c) => c.id === item.id)
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex gap-4 p-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-semibold text-card-foreground">{item.name}</h3>
                      {item.popular && (
                        <span className="rounded-full bg-[#FFCB05]/10 px-2 py-0.5 text-[9px] font-bold text-[#FFCB05]">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-[#FFCB05]">
                        ${item.sthPrice.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-muted-foreground line-through">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.waitTime}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
                {inCart ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary"
                      aria-label="Remove one"
                    >
                      <Minus className="h-3 w-3 text-foreground" />
                    </button>
                    <span className="text-sm font-bold text-foreground">{inCart.quantity}</span>
                    <button
                      onClick={() => handleAddItem(item)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFCB05]"
                      aria-label="Add one more"
                    >
                      <Plus className="h-3 w-3 text-[#00274C]" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddItem(item)}
                    className="flex items-center gap-1.5 rounded-full bg-[#FFCB05]/10 px-3 py-1.5 text-xs font-medium text-[#FFCB05] transition-colors hover:bg-[#FFCB05]/20"
                  >
                    <Plus className="h-3 w-3" />
                    Add to Order
                  </button>
                )}
                <span className="text-[10px] text-muted-foreground">
                  Express pickup available
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-5 right-5 z-40">
          <button
            onClick={() => setShowCart(true)}
            className="flex w-full items-center justify-between rounded-2xl bg-[#FFCB05] p-4 shadow-lg shadow-[#FFCB05]/20 transition-transform active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00274C]/20">
                <span className="text-xs font-bold text-[#00274C]">{cartCount}</span>
              </div>
              <span className="text-sm font-bold text-[#00274C]">View Order</span>
            </div>
            <span className="text-sm font-bold text-[#00274C]">${cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  )
}
