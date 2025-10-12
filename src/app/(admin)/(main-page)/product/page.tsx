"use client";

import ProductCompPage from "@/components/page/product/ProductCompPage";
import { Suspense } from "react";

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <ProductCompPage />
    </Suspense>
  )
}
