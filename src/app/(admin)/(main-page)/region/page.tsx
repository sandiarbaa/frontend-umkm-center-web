"use client"

import RegionCompPage from "@/components/page/region/RegionCompPage"
import { Suspense } from "react"

export default function RegionPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <RegionCompPage />
      </Suspense>
  )
}