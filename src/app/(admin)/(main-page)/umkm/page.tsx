"use client";

import UmkmCompPage from "@/components/page/umkm/UmkmCompPage";
import { Suspense } from "react";

export default function UmkmPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <UmkmCompPage />
    </Suspense>
  )
}
