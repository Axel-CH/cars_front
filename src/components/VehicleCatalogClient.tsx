'use client';

import { Suspense, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import VehicleList from '@/components/VehicleList';
import FilterBar from '@/components/FilterBar';
import { getVehicles, getManufacturers, getVehicleTypes } from '@/services/api';
import type { Vehicle } from '@/types/vehicle';

type SortField = 'price' | 'year';
type SortOrder = 'ASC' | 'DESC';

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
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('price');
  const [sortOrder, setSortOrder] = useState<SortOrder>('ASC');
  const itemsPerPage = 10;

  const { data, isLoading, error } = useQuery<PaginatedResponse>({
    queryKey: ['vehicles', selectedManufacturer, selectedType, selectedYear, currentPage, sortField, sortOrder],
    queryFn: async () => {
      console.log('Fetching vehicles with filters:', { 
        selectedManufacturer, 
        selectedType,
        selectedYear,
        currentPage,
        sortField,
        sortOrder 
      });
      const result = await getVehicles({
        manufacturer: selectedManufacturer,
        type: selectedType,
        year: selectedYear,
        page: currentPage,
        limit: itemsPerPage,
        sort: {
          field: sortField,
          order: sortOrder
        }
      });
      console.log('Received vehicles:', result);
      return result;
    }
  });

  const vehicles = data?.items ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const { data: manufacturers = [] } = useQuery({
    queryKey: ['manufacturers'],
    queryFn: getManufacturers
  });

  const { data: types = [] } = useQuery({
    queryKey: ['types'],
    queryFn: getVehicleTypes
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // If clicking the same field, toggle the order
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      // If clicking a new field, set it as the sort field and default to ascending
      setSortField(field);
      setSortOrder('ASC');
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

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
        selectedYear={selectedYear}
        onManufacturerChange={(value) => {
          setSelectedManufacturer(value);
          setCurrentPage(1);
        }}
        onTypeChange={(value) => {
          setSelectedType(value);
          setCurrentPage(1);
        }}
        onYearChange={(value) => {
          setSelectedYear(value);
          setCurrentPage(1);
        }}
      />

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => handleSort('price')}
          className={`px-4 py-2 rounded ${
            sortField === 'price' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Price {sortField === 'price' && (sortOrder === 'ASC' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('year')}
          className={`px-4 py-2 rounded ${
            sortField === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Year {sortField === 'year' && (sortOrder === 'ASC' ? '↑' : '↓')}
        </button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {isLoading ? (
          <div>Loading vehicles...</div>
        ) : (
          <>
            <VehicleList vehicles={vehicles} />
            
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Previous
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded ${
                        currentPage === page
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </Suspense>
    </>
  );
} 