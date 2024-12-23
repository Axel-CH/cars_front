'use client';

import { Vehicle } from '@/types/vehicle';
import Link from 'next/link';
import Image from 'next/image';

interface VehicleListProps {
  vehicles: Vehicle[];
}

export default function VehicleList({ vehicles }: VehicleListProps) {
  if (!vehicles.length) {
    return <div className="text-center p-4">No vehicles found</div>;
  }

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('http')) return imageUrl;
    return `/vehicles/${imageUrl}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <Link
          key={vehicle.id}
          href={`/vehicles/${vehicle.id}`}
          className="block transition-transform hover:scale-105"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-48 relative">
              {vehicle.imageUrl ? (
                <Image
                  src={getImageUrl(vehicle.imageUrl)}
                  alt={`${vehicle.manufacturer} ${vehicle.model}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {vehicle.manufacturer} {vehicle.model}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Year</div>
                <div>{vehicle.year}</div>
                <div className="text-gray-600">Type</div>
                <div>{vehicle.type}</div>
                <div className="text-gray-600">Price</div>
                <div>${vehicle.price.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 