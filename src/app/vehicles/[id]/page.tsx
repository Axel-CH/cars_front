import { Suspense } from 'react';
import VehicleDetailsClient from '@/components/VehicleDetailsClient';

export default function VehicleDetailsPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <VehicleDetailsClient />
    </Suspense>
  );
} 