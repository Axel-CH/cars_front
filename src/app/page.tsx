'use client';

import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import VehicleList from '@/components/VehicleList';
import FilterBar from '@/components/FilterBar';
import { getVehicles, getManufacturers, getVehicleTypes } from '@/services/api';
import QueryProvider from '@/providers/QueryProvider';

function VehicleCatalog() {
  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles
  });

  const { data: manufacturers = [] } = useQuery({
    queryKey: ['manufacturers'],
    queryFn: getManufacturers
  });

  const { data: types = [] } = useQuery({
    queryKey: ['types'],
    queryFn: getVehicleTypes
  });

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

export default function Home() {
  return (
    <QueryProvider>
      <VehicleCatalog />
    </QueryProvider>
  );
}
