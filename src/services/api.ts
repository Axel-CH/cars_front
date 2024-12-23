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
  year?: number | null;
  page: number;
  limit: number;
  sort?: {
    field: 'price' | 'year';
    order: 'ASC' | 'DESC';
  };
}

export const getVehicles = async (filters: VehicleFilters) => {
  try {
    const params = new URLSearchParams();
    if (filters.manufacturer) params.append('manufacturer', filters.manufacturer);
    if (filters.type) params.append('type', filters.type);
    if (filters.year) params.append('year', filters.year.toString());
    params.append('page', filters.page.toString());
    params.append('limit', filters.limit.toString());
    
    if (filters.sort) {
      params.append('sortBy', filters.sort.field);
      params.append('sortOrder', filters.sort.order);
    }

    const response = await fetch(`/api/vehicules?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to fetch vehicles');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
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

export async function getVehicleById(id: string): Promise<Vehicle> {
  try {
    const response = await api.get(`/vehicules/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    throw error;
  }
}