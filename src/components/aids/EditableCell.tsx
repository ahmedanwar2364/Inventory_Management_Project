
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X } from 'lucide-react';
import { Family } from '@/types/family';
import { aidTypes, committees } from '@/types/family';

interface EditableCellProps {
  rowIndex: number;
  field: keyof Family;
  value: string | number;
  isEditing: boolean;
  tempValue: string;
  setTempValue: (value: string) => void;
  onStartEdit: (rowIndex: number, field: keyof Family, value: string | number) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  rowIndex,
  field,
  value,
  isEditing,
  tempValue,
  setTempValue,
  onStartEdit,
  onSaveEdit,
  onCancelEdit
}) => {
  if (isEditing) {
    if (field === 'aidType') {
      return (
        <div className="flex items-center gap-1">
          <Select value={tempValue} onValueChange={setTempValue}>
            <SelectTrigger className="h-8 text-sm border-2 border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {aidTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-green-100" onClick={onSaveEdit}>
            <Save className="w-4 h-4 text-green-600" />
          </Button>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-red-100" onClick={onCancelEdit}>
            <X className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      );
    }
    
    if (field === 'committee') {
      return (
        <div className="flex items-center gap-1">
          <Select value={tempValue} onValueChange={setTempValue}>
            <SelectTrigger className="h-8 text-sm border-2 border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {committees.map(committee => (
                <SelectItem key={committee} value={committee}>{committee}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-green-100" onClick={onSaveEdit}>
            <Save className="w-4 h-4 text-green-600" />
          </Button>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-red-100" onClick={onCancelEdit}>
            <X className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-1">
        <Input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="h-8 text-sm border-2 border-blue-500 focus:border-blue-600"
          type={field === 'familySize' ? 'number' : 'text'}
          min={field === 'familySize' ? 1 : undefined}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSaveEdit();
            if (e.key === 'Escape') onCancelEdit();
          }}
          autoFocus
        />
        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-green-100" onClick={onSaveEdit}>
          <Save className="w-4 h-4 text-green-600" />
        </Button>
        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-red-100" onClick={onCancelEdit}>
          <X className="w-4 h-4 text-red-600" />
        </Button>
      </div>
    );
  }
  
  const cellContent = field === 'aidType' ? (
    <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
      {value || 'غير محدد'}
    </span>
  ) : field === 'committee' ? (
    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
      {value || 'غير محدد'}
    </span>
  ) : field === 'familyCode' ? (
    <span className="font-mono text-blue-600 font-medium">{value}</span>
  ) : field === 'nationalId' || field === 'phone' ? (
    <span className="font-mono text-gray-700">{value}</span>
  ) : field === 'familySize' ? (
    <span className="font-semibold text-center text-gray-800">{value}</span>
  ) : (
    <span className="text-gray-800">{value || ''}</span>
  );
  
  return (
    <div 
      className="cursor-pointer hover:bg-blue-50 p-2 rounded transition-colors min-h-[36px] flex items-center border border-transparent hover:border-blue-200"
      onClick={() => onStartEdit(rowIndex, field, value)}
      title="انقر للتحرير"
    >
      {cellContent}
    </div>
  );
};
