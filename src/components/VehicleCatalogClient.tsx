'use client';

import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import VehicleList from '@/components/VehicleList';
import FilterBar from '@/components/FilterBar';
import { getVehicles, getManufacturers, getVehicleTypes } from '@/services/api';

export default function VehicleCatalogClient() {
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
    <>
      <FilterBar 
        manufacturers={manufacturers} 
        types={types} 
      />
      <Suspense fallback={<div>Loading...</div>}>
        <VehicleList initialVehicles={vehicles} />
      </Suspense>
    </>
  );
} 