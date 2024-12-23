'use client';

import { Suspense, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import VehicleList from '@/components/VehicleList';
import FilterBar from '@/components/FilterBar';
import { getVehicles, getManufacturers, getVehicleTypes } from '@/services/api';
import type { Vehicle } from '@/types/vehicle';

interface PaginatedResponse {
  items: Vehicle[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function VehicleCatalogClient() {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery<PaginatedResponse>({
    queryKey: ['vehicles', selectedManufacturer, selectedType],
    queryFn: async () => {
      console.log('Fetching vehicles with filters:', { selectedManufacturer, selectedType });
      const result = await getVehicles({
        manufacturer: selectedManufacturer,
        type: selectedType,
        page: 1,
        limit: 10
      });
      console.log('Received vehicles:', result);
      return result;
    }
  });

  const vehicles = data?.items ?? [];

  const { data: manufacturers = [] } = useQuery({
    queryKey: ['manufacturers'],
    queryFn: getManufacturers
  });

  const { data: types = [] } = useQuery({
    queryKey: ['types'],
    queryFn: getVehicleTypes
  });

  console.log('Current state:', { vehicles, selectedManufacturer, selectedType, isLoading, error });

  if (error) {
    console.error('Error fetching vehicles:', error);
    return <div>Error loading vehicles</div>;
  }

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
        {isLoading ? (
          <div>Loading vehicles...</div>
        ) : (
          <VehicleList vehicles={vehicles} />
        )}
      </Suspense>
    </>
  );
} 