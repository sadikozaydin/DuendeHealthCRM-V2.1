import React from 'react';
import { Filter } from 'lucide-react';

interface PatientFiltersProps {
  filters: {
    status: string;
    treatment: string;
    country: string;
  };
  onFiltersChange: (filters: any) => void;
}

const PatientFilters: React.FC<PatientFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filtreler:</span>
        </div>
        
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="consultation">Konsültasyon</option>
          <option value="planning">Planlama</option>
          <option value="in-treatment">Tedavide</option>
          <option value="completed">Tamamlandı</option>
        </select>
        
        <select
          value={filters.treatment}
          onChange={(e) => handleFilterChange('treatment', e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Tüm Tedaviler</option>
          <option value="cardiology">Kardiyoloji</option>
          <option value="orthopedics">Ortopedi</option>
          <option value="oncology">Onkoloji</option>
          <option value="plastic-surgery">Plastik Cerrahi</option>
          <option value="dental">Diş Tedavisi</option>
        </select>
        
        <select
          value={filters.country}
          onChange={(e) => handleFilterChange('country', e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Tüm Ülkeler</option>
          <option value="spain">İspanya</option>
          <option value="uk">İngiltere</option>
          <option value="uae">BAE</option>
          <option value="germany">Almanya</option>
          <option value="france">Fransa</option>
        </select>
      </div>
    </div>
  );
};

export default PatientFilters;