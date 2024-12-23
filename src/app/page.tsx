'use client';

import { Suspense } from 'react';
import VehicleList from '@/components/VehicleList';
import FilterBar from '@/components/FilterBar';
import { getVehicles, getManufacturers, getVehicleTypes } from '@/services/api';
import QueryProvider from '@/providers/QueryProvider';
import type { FilterBarProps, VehicleListProps } from '@/types/components';

export default async function Home() {
  try {
    const [vehicles, manufacturers, types] = await Promise.all([
      getVehicles(),
      getManufacturers(),
      getVehicleTypes(),
    ]);

    return (
      <QueryProvider>
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
      </QueryProvider>
    );
  } catch (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Vehicle Catalog</h1>
        <div className="text-red-500">
          Error loading data. Please try again later.
        </div>
      </main>
    );
  }
}
