"use client";

interface ProductCardProps {
  name: string;
  price: string;
  description: string;
  image?: string;
}

export default function ProductCard({
  name,
  price,
  description,
  image,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 flex flex-col transition">
      <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      <div className="mt-3 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-500 text-sm flex-grow">{description}</p>
        <p className="mt-2 font-bold text-blue-600">Rp {price}</p>
      </div>
    </div>
  );
}
