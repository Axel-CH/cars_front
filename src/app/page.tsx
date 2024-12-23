'use client';

import { Suspense } from 'react';
import VehicleList from '@/components/VehicleList';
import FilterBar from '@/components/FilterBar';
import { getVehicles, getManufacturers, getVehicleTypes } from '@/services/api';

export default async function Home() {
  // Move data fetching to a server component or use React Query
  const [vehicles, manufacturers, types] = await Promise.all([
    getVehicles(),
    getManufacturers(),
    getVehicleTypes(),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vehicle Catalog</h1>
      <FilterBar 
        manufacturers={manufacturers} 
        types={types} 
      />
      <Suspense fallback={<div>Loading...</div>}>
        <VehicleList initialVehicles={vehicles} />
      </Suspense>
    </main>
  );
}
