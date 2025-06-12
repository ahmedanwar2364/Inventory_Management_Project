
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useFamilyManagement } from '@/hooks/useFamilyManagement';
import { FamilySearchHeader } from './FamilySearchHeader';
import { FamilyTable } from './FamilyTable';

export const FamilyRegistrationForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    families,
    editingCell,
    tempValue,
    setTempValue,
    addNewRow,
    deleteRow,
    startEdit,
    saveEdit,
    cancelEdit
  } = useFamilyManagement();

  const filteredFamilies = families.filter(family =>
    family.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    family.nationalId.includes(searchTerm) ||
    family.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6" dir="rtl">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <FamilySearchHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddNew={addNewRow}
          />
        </CardHeader>
        <CardContent className="p-0">
          <FamilyTable
            families={filteredFamilies}
            editingCell={editingCell}
            tempValue={tempValue}
            setTempValue={setTempValue}
            onStartEdit={startEdit}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            onDeleteRow={deleteRow}
          />
          
          {/* Summary Row */}
          <div className="border-t-2 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
            <div className="text-sm text-gray-700 font-medium">
              إجمالي العائلات: <span className="font-bold text-blue-600">{filteredFamilies.length}</span> عائلة
              {searchTerm && (
                <span className="mr-4">
                  نتائج البحث: <span className="font-bold text-green-600">{filteredFamilies.length}</span>
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
