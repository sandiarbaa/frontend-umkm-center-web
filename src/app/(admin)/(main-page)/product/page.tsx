"use client";

import { Suspense } from "react";

export default function ProductCompPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <ProductCompPage />
    </Suspense>
  )
}
