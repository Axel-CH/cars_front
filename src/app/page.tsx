import VehicleList from '@/components/VehicleList';
import FilterBar from '@/components/FilterBar';
import QueryProvider from '@/providers/QueryProvider';
import VehicleCatalogClient from '@/components/VehicleCatalogClient';

// This is now a Server Component
export default function Home() {
  return (
    <QueryProvider>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Vehicle Catalog</h1>
        <VehicleCatalogClient />
      </main>
    </QueryProvider>
  );
}
