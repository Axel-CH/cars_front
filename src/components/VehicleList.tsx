'use client';

import type { VehicleListProps } from '@/types/components';

export default function VehicleList({ initialVehicles }: VehicleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initialVehicles.map((vehicle) => (
        <div key={vehicle.id} className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold">{vehicle.manufacturer} {vehicle.model}</h2>
          <p>Type: {vehicle.type}</p>
          <p>Year: {vehicle.year}</p>
          <p>Price: ${vehicle.price.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
} 