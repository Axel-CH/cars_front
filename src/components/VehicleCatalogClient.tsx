'use client';

import { Suspense, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import VehicleList from '@/components/VehicleList';
import FilterBar from '@/components/FilterBar';
import { getVehicles, getManufacturers, getVehicleTypes } from '@/services/api';

export default function VehicleCatalogClient() {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles', selectedManufacturer, selectedType],
    queryFn: () => getVehicles({
      manufacturer: selectedManufacturer,
      type: selectedType,
      page: 1,
      limit: 10
    })
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
        selectedManufacturer={selectedManufacturer}
        selectedType={selectedType}
        onManufacturerChange={setSelectedManufacturer}
        onTypeChange={setSelectedType}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <VehicleList initialVehicles={vehicles} />
      </Suspense>
    </>
  );
} 