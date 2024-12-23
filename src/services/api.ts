import axios from 'axios';
import type { Vehicle } from '@/types/vehicle';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const response = await api.get('/vehicules');
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
}

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