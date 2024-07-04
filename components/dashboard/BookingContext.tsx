"use client"

import React, { createContext, ReactNode, useContext, useState } from "react"
import { Order } from "@/schemas/order/order"

type BookingContextType = {
  selectedBooking: Order | undefined
  setSelectedBooking: (booking: Order | undefined) => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const useBookingContext = (): BookingContextType => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider")
  }
  return context
}

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBooking, setSelectedBooking] = useState<Order | undefined>(
    undefined
  )

  return (
    <BookingContext.Provider value={{ selectedBooking, setSelectedBooking }}>
      {children}
    </BookingContext.Provider>
  )
}
