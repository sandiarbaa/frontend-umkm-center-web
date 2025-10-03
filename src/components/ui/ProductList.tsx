"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import ProductCard from "./ProductCard";

interface product {
  id: number;
  name: string;
  price: string;
  description: string;
  image?: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get<product[]>('/products');
      setProducts(res.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('error: ', error);
    }
  }

  useEffect(() => {fetchProducts()}, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Daftar Produk</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          ))
        ) : (
          <p className="text-gray-500">Belum ada produk tersedia</p>
        )}
      </div>
    </div>
  )
}