import { Vehicle } from './vehicle';

export interface FilterBarProps {
  manufacturers: string[];
  types: string[];
  selectedManufacturer: string | null;
  selectedType: string | null;
  selectedYear: number | null;
  onManufacturerChange: (manufacturer: string | null) => void;
  onTypeChange: (type: string | null) => void;
  onYearChange: (year: number | null) => void;
}

export interface VehicleListProps {
  vehicles: Vehicle[];
}