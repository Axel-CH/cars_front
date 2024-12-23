'use client';

import { Vehicle } from '@/types/vehicle';
import Link from 'next/link';

interface VehicleListProps {
  vehicles: Vehicle[];
}

export default function VehicleList({ vehicles }: VehicleListProps) {
  if (!vehicles.length) {
    return <div className="text-center p-4">No vehicles found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <Link
          key={vehicle.id}
          href={`/vehicles/${vehicle.id}`}
          className="block transition-transform hover:scale-105"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {vehicle.imageUrl && (
              <img
                src={vehicle.imageUrl}
                alt={`${vehicle.manufacturer} ${vehicle.model}`}
                className="w-full h-48 object-cover"
              />
            )}
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