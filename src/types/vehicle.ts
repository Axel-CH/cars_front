export interface Vehicle {
  id: string;
  manufacturer: string;
  model: string;
  type: string;
  year: number;
  price: number;
  mileage: number;
  description?: string;
  imageUrl?: string;
  features?: string[];
} 