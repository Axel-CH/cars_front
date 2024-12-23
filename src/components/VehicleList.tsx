'use client';

import type { VehicleListProps } from '@/types/components';

export default function VehicleList({ vehicles }: VehicleListProps) {
  console.log('VehicleList received:', vehicles);

  // Check if vehicles is undefined or null
  if (!vehicles) {
    console.log('Vehicles is null or undefined');
    return <div>No vehicles data available.</div>;
  }

  // Check if vehicles is an array
  if (!Array.isArray(vehicles)) {
    console.log('Vehicles is not an array:', typeof vehicles);
    return <div>Invalid vehicles data format.</div>;
  }

  // Check if the array is empty
  if (vehicles.length === 0) {
    console.log('Vehicles array is empty');
    return <div>No vehicles found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => {
        console.log('Rendering vehicle:', vehicle);
        return (
          <div key={vehicle.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">
              {vehicle.manufacturer || 'Unknown'} {vehicle.model || 'Unknown'}
            </h2>
            <p>Type: {vehicle.type || 'Unknown'}</p>
            <p>Year: {vehicle.year || 'Unknown'}</p>
            <p>Price: {vehicle.price ? `$${vehicle.price.toLocaleString()}` : 'Unknown'}</p>
          </div>
        );
      })}
    </div>
  );
} 