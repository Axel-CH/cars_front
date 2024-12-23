import axios from 'axios';
import type { Vehicle } from '@/types/vehicle';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

interface VehicleFilters {
  manufacturer?: string | null;
  type?: string | null;
  page: number;
  limit: number;
}

export const getVehicles = async (filters: VehicleFilters) => {
  const params = new URLSearchParams();
  if (filters.manufacturer) params.append('manufacturer', filters.manufacturer);
  if (filters.type) params.append('type', filters.type);
  params.append('page', filters.page.toString());
  params.append('limit', filters.limit.toString());

  const response = await fetch(`/api/vehicules?${params.toString()}`);

  if (!response.ok) throw new Error('Failed to fetch vehicles');
  return response.json();
};

export async function getManufacturers(): Promise<string[]> {
  try {
    const response = await api.get('/vehicules/manufacturers');
    return response.data;
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    return [];
  }
}

export async function getVehicleTypes(): Promise<string[]> {
  try {
    const response = await api.get('/vehicules/types');
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    return [];
  }
} 