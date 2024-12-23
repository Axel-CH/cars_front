'use client';

import { useState } from 'react';
import type { FilterBarProps } from '@/types/components';

export default function FilterBar({ manufacturers, types }: FilterBarProps) {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedType, setSelectedType] = useState('');

  return (
    <div className="flex gap-4 mb-6">
      <select 
        value={selectedManufacturer}
        onChange={(e) => setSelectedManufacturer(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Manufacturers</option>
        {manufacturers.map((manufacturer) => (
          <option key={manufacturer} value={manufacturer}>
            {manufacturer}
          </option>
        ))}
      </select>

      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
} 