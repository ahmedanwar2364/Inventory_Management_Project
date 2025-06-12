
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';

interface FamilySearchHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddNew: () => void;
}

export const FamilySearchHeader: React.FC<FamilySearchHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onAddNew
}) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-800">
        العائلات المسجلة - جدول قابل للتحرير
      </h3>
      <div className="flex items-center gap-4">
        <Button onClick={onAddNew} className="bg-green-600 hover:bg-green-700 shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          إضافة عائلة جديدة
        </Button>
        <div className="relative w-72">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في العائلات..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10 border-gray-300 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
