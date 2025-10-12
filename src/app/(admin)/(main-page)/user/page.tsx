"use client"

import UserCompPage from "@/components/page/user/UserCompPage"
import { Suspense } from "react"


export default function UserPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <UserCompPage />
    </Suspense>
  )
}