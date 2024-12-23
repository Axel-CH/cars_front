import axios from 'axios';
import type { Vehicle } from '@/types/vehicle';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await api.get('/vehicules');
  return response.data;
}

export async function getManufacturers(): Promise<string[]> {
  const response = await api.get('/vehicules/manufacturers');
  return response.data;
}

export async function getVehicleTypes(): Promise<string[]> {
  const response = await api.get('/vehicules/types');
  return response.data;
} 