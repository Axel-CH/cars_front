'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getVehicleById } from '@/services/api';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function VehicleDetailsClient() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const id = typeof params?.id === 'string' ? params.id : '';

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: vehicle, isLoading, error } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => getVehicleById(id),
    enabled: mounted && !!id,
  });

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('http')) return imageUrl;
    return `/vehicles/${imageUrl}`;
  };

  if (!mounted) {
    return <div className="p-4">Loading vehicle details...</div>;
  }

  if (isLoading) {
    return <div className="p-4">Loading vehicle details...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error loading vehicle details</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to vehicles
        </Link>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="p-4">
        <p>Vehicle not found</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to vehicles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
        ← Back to vehicles
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">
          {vehicle.manufacturer} {vehicle.model}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] w-full">
            {vehicle.imageUrl ? (
              <Image
                src={getImageUrl(vehicle.imageUrl)}
                alt={`${vehicle.manufacturer} ${vehicle.model}`}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <dl className="grid grid-cols-2 gap-2">
                <dt className="text-gray-600">Type</dt>
                <dd>{vehicle.type}</dd>
                <dt className="text-gray-600">Year</dt>
                <dd>{vehicle.year}</dd>
                <dt className="text-gray-600">Price</dt>
                <dd>${vehicle.price.toLocaleString()}</dd>
                <dt className="text-gray-600">Mileage</dt>
                <dd>{vehicle.mileage.toLocaleString()} km</dd>
              </dl>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{vehicle.description}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              {vehicle.features && vehicle.features.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {vehicle.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No features listed</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 