'use client';

import type { FilterBarProps } from '@/types/components';

export default function FilterBar({ 
  manufacturers, 
  types, 
  selectedManufacturer, 
  selectedType,
  onManufacturerChange,
  onTypeChange 
}: FilterBarProps) {
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
    </div>
  );
} 