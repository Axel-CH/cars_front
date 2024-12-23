'use client';

import type { FilterBarProps } from '@/types/components';

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_RANGE = 20; // Show last 20 years

export default function FilterBar({ 
  manufacturers, 
  types, 
  selectedManufacturer, 
  selectedType,
  selectedYear,
  onManufacturerChange,
  onTypeChange,
  onYearChange
}: FilterBarProps) {
  const years = Array.from(
    { length: YEAR_RANGE },
    (_, i) => CURRENT_YEAR - i
  );

  return (
    <div className="flex gap-4 mb-6">
      <select 
        value={selectedManufacturer || ''}
        onChange={(e) => onManufacturerChange(e.target.value || null)}
        className="border p-2 rounded"
      >
        <option value="">All Manufacturers</option>
        {manufacturers.map((manufacturer: string) => (
          <option key={manufacturer} value={manufacturer}>
            {manufacturer}
          </option>
        ))}
      </select>

      <select
        value={selectedType || ''}
        onChange={(e) => onTypeChange(e.target.value || null)}
        className="border p-2 rounded"
      >
        <option value="">All Types</option>
        {types.map((type: string) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={selectedYear || ''}
        onChange={(e) => onYearChange(e.target.value ? Number(e.target.value) : null)}
        className="border p-2 rounded"
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
} 