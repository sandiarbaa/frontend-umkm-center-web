"use client"

import EventCompPage from "@/components/page/event/EventCompPage"
import { Suspense } from "react"


export default function UserPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <EventCompPage />
    </Suspense>
  )
}