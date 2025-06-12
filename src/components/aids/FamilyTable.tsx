
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { EditableCell } from './EditableCell';
import { Family } from '@/types/family';

interface FamilyTableProps {
  families: Family[];
  editingCell: {rowIndex: number, field: keyof Family} | null;
  tempValue: string;
  setTempValue: (value: string) => void;
  onStartEdit: (rowIndex: number, field: keyof Family, value: string | number) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDeleteRow: (index: number) => void;
}

export const FamilyTable: React.FC<FamilyTableProps> = ({
  families,
  editingCell,
  tempValue,
  setTempValue,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteRow
}) => {
  return (
    <div className="overflow-auto max-h-[700px] border border-gray-200 rounded-b-lg">
      <table className="w-full border-collapse bg-white">
        <thead className="sticky top-0 bg-gray-100 z-10 border-b-2 border-gray-300">
          <tr>
            <th className="border-r border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 text-right min-w-[100px] bg-gray-50">
              كود العائلة
            </th>
            <th className="border-r border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 text-right min-w-[150px] bg-gray-50">
              اسم العائلة
            </th>
            <th className="border-r border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 text-right min-w-[120px] bg-gray-50">
              المنطقة
            </th>
            <th className="border-r border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 text-right min-w-[100px] bg-gray-50">
              المرشد
            </th>
            <th className="border-r border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 text-right min-w-[120px] bg-gray-50">
              رقم الهوية
            </th>
            <th className="border-r border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 text-right min-w-[110px] bg-gray-50">
              الجوال
            </th>
            <th className="border-r border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 text-center min-w-[80px] bg-gray-50">
              عدد الأفراد
            </th>
            <th className="border-r border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 text-right min-w-[120px] bg-gray-50">
              نوع المساعدة
            </th>
            <th className="border-r border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 text-right min-w-[100px] bg-gray-50">
              اللجنة
            </th>
            <th className="px-4 py-3 text-sm font-bold text-gray-700 text-center min-w-[80px] bg-gray-50">
              حذف
            </th>
          </tr>
        </thead>
        <tbody>
          {families.map((family, index) => (
            <tr key={family.familyCode} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-25 transition-colors border-b border-gray-200`}>
              <td className="border-r border-gray-200 px-2 py-1">
                <EditableCell
                  rowIndex={index}
                  field="familyCode"
                  value={family.familyCode}
                  isEditing={editingCell?.rowIndex === index && editingCell?.field === 'familyCode'}
                  tempValue={tempValue}
                  setTempValue={setTempValue}
                  onStartEdit={onStartEdit}
                  onSaveEdit={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                />
              </td>
              <td className="border-r border-gray-200 px-2 py-1">
                <EditableCell
                  rowIndex={index}
                  field="name"
                  value={family.name}
                  isEditing={editingCell?.rowIndex === index && editingCell?.field === 'name'}
                  tempValue={tempValue}
                  setTempValue={setTempValue}
                  onStartEdit={onStartEdit}
                  onSaveEdit={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                />
              </td>
              <td className="border-r border-gray-200 px-2 py-1">
                <EditableCell
                  rowIndex={index}
                  field="area"
                  value={family.area}
                  isEditing={editingCell?.rowIndex === index && editingCell?.field === 'area'}
                  tempValue={tempValue}
                  setTempValue={setTempValue}
                  onStartEdit={onStartEdit}
                  onSaveEdit={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                />
              </td>
              <td className="border-r border-gray-200 px-2 py-1">
                <EditableCell
                  rowIndex={index}
                  field="guide"
                  value={family.guide}
                  isEditing={editingCell?.rowIndex === index && editingCell?.field === 'guide'}
                  tempValue={tempValue}
                  setTempValue={setTempValue}
                  onStartEdit={onStartEdit}
                  onSaveEdit={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                />
              </td>
              <td className="border-r border-gray-200 px-2 py-1">
                <EditableCell
                  rowIndex={index}
                  field="nationalId"
                  value={family.nationalId}
                  isEditing={editingCell?.rowIndex === index && editingCell?.field === 'nationalId'}
                  tempValue={tempValue}
                  setTempValue={setTempValue}
                  onStartEdit={onStartEdit}
                  onSaveEdit={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                />
              </td>
              <td className="border-r border-gray-200 px-2 py-1">
                <EditableCell
                  rowIndex={index}
                  field="phone"
                  value={family.phone}
                  isEditing={editingCell?.rowIndex === index && editingCell?.field === 'phone'}
                  tempValue={tempValue}
                  setTempValue={setTempValue}
                  onStartEdit={onStartEdit}
                  onSaveEdit={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                />
              </td>
              <td className="border-r border-gray-200 px-2 py-1 text-center">
                <EditableCell
                  rowIndex={index}
                  field="familySize"
                  value={family.familySize}
                  isEditing={editingCell?.rowIndex === index && editingCell?.field === 'familySize'}
                  tempValue={tempValue}
                  setTempValue={setTempValue}
                  onStartEdit={onStartEdit}
                  onSaveEdit={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                />
              </td>
              <td className="border-r border-gray-200 px-2 py-1">
                <EditableCell
                  rowIndex={index}
                  field="aidType"
                  value={family.aidType}
                  isEditing={editingCell?.rowIndex === index && editingCell?.field === 'aidType'}
                  tempValue={tempValue}
                  setTempValue={setTempValue}
                  onStartEdit={onStartEdit}
                  onSaveEdit={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                />
              </td>
              <td className="border-r border-gray-200 px-2 py-1">
                <EditableCell
                  rowIndex={index}
                  field="committee"
                  value={family.committee}
                  isEditing={editingCell?.rowIndex === index && editingCell?.field === 'committee'}
                  tempValue={tempValue}
                  setTempValue={setTempValue}
                  onStartEdit={onStartEdit}
                  onSaveEdit={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                />
              </td>
              <td className="px-2 py-1">
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                    onClick={() => onDeleteRow(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
