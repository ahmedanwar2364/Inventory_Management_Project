
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Family {
  familyCode: string;
  area: string;
  guide: string;
  name: string;
  nationalId: string;
  phone: string;
  familySize: number;
  aidType: string;
  committee: string;
}

export const FamilyRegistrationForm = () => {
  const [families, setFamilies] = useState<Family[]>([
    {
      familyCode: 'FAM001',
      area: 'المنطقة الشمالية',
      guide: 'أحمد محمد',
      name: 'عائلة السالم',
      nationalId: '1234567890',
      phone: '0501234567',
      familySize: 5,
      aidType: 'غسالة',
      committee: 'عيني'
    },
    {
      familyCode: 'FAM002',
      area: 'المنطقة الجنوبية',
      guide: 'فاطمة أحمد',
      name: 'عائلة الزهراني',
      nationalId: '9876543210',
      phone: '0507654321',
      familySize: 7,
      aidType: 'وجبات',
      committee: 'إطعام'
    }
  ]);

  const [editingCell, setEditingCell] = useState<{rowIndex: number, field: string} | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const aidTypes = ['غسالة', 'ثلاجة', 'وجبات', 'ملابس', 'أجهزة كهربائية', 'أثاث', 'مواد غذائية'];
  const committees = ['عيني', 'إطعام', 'كسوة', 'أثاث'];

  const addNewRow = () => {
    const newFamily: Family = {
      familyCode: `FAM${String(families.length + 1).padStart(3, '0')}`,
      area: '',
      guide: '',
      name: '',
      nationalId: '',
      phone: '',
      familySize: 1,
      aidType: '',
      committee: ''
    };
    setFamilies([...families, newFamily]);
  };

  const deleteRow = (index: number) => {
    const newFamilies = families.filter((_, i) => i !== index);
    setFamilies(newFamilies);
    toast({
      title: "تم حذف العائلة",
      description: "تم حذف العائلة بنجاح",
    });
  };

  const startEdit = (rowIndex: number, field: string, currentValue: any) => {
    setEditingCell({ rowIndex, field });
    setTempValue(String(currentValue));
  };

  const saveEdit = () => {
    if (!editingCell) return;
    
    const { rowIndex, field } = editingCell;
    const newFamilies = [...families];
    
    if (field === 'familySize') {
      newFamilies[rowIndex][field] = parseInt(tempValue) || 1;
    } else {
      newFamilies[rowIndex][field as keyof Family] = tempValue as any;
    }
    
    setFamilies(newFamilies);
    setEditingCell(null);
    setTempValue('');
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setTempValue('');
  };

  const renderEditableCell = (rowIndex: number, field: string, value: any) => {
    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.field === field;
    
    if (isEditing) {
      if (field === 'aidType') {
        return (
          <div className="flex items-center gap-1">
            <Select value={tempValue} onValueChange={setTempValue}>
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {aidTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={saveEdit}>
              <Save className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={cancelEdit}>
              <X className="w-3 h-3" />
            </Button>
          </div>
        );
      }
      
      if (field === 'committee') {
        return (
          <div className="flex items-center gap-1">
            <Select value={tempValue} onValueChange={setTempValue}>
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {committees.map(committee => (
                  <SelectItem key={committee} value={committee}>{committee}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={saveEdit}>
              <Save className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={cancelEdit}>
              <X className="w-3 h-3" />
            </Button>
          </div>
        );
      }
      
      return (
        <div className="flex items-center gap-1">
          <Input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="h-7 text-xs"
            type={field === 'familySize' ? 'number' : 'text'}
            min={field === 'familySize' ? 1 : undefined}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') cancelEdit();
            }}
            autoFocus
          />
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={saveEdit}>
            <Save className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={cancelEdit}>
            <X className="w-3 h-3" />
          </Button>
        </div>
      );
    }
    
    const cellContent = field === 'aidType' ? (
      <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
        {value || 'غير محدد'}
      </span>
    ) : field === 'committee' ? (
      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
        {value || 'غير محدد'}
      </span>
    ) : field === 'familyCode' ? (
      <span className="font-mono text-blue-600">{value}</span>
    ) : field === 'nationalId' || field === 'phone' ? (
      <span className="font-mono">{value}</span>
    ) : field === 'familySize' ? (
      <span className="font-medium">{value}</span>
    ) : (
      <span>{value || ''}</span>
    );
    
    return (
      <div 
        className="cursor-pointer hover:bg-blue-50 p-1 rounded min-h-[28px] flex items-center"
        onClick={() => startEdit(rowIndex, field, value)}
      >
        {cellContent}
      </div>
    );
  };

  const filteredFamilies = families.filter(family =>
    family.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    family.nationalId.includes(searchTerm) ||
    family.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header with Add Button and Search */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              العائلات المسجلة - جدول قابل للتحرير
            </CardTitle>
            <div className="flex items-center gap-4">
              <Button onClick={addNewRow} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                إضافة عائلة جديدة
              </Button>
              <div className="relative w-72">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث في العائلات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto max-h-[600px]">
            <table className="w-full border-collapse border border-gray-200 bg-white">
              <thead className="sticky top-0 bg-gray-50 z-10">
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[100px]">
                    كود العائلة
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[150px]">
                    اسم العائلة
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[120px]">
                    المنطقة
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[100px]">
                    المرشد
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[120px]">
                    رقم الهوية
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[110px]">
                    الجوال
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-center min-w-[80px]">
                    عدد الأفراد
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[120px]">
                    نوع المساعدة
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[100px]">
                    اللجنة
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-center min-w-[80px]">
                    حذف
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredFamilies.map((family, index) => (
                  <tr key={family.familyCode} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                    <td className="border border-gray-300 px-2 py-1 text-sm">
                      {renderEditableCell(index, 'familyCode', family.familyCode)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-sm">
                      {renderEditableCell(index, 'name', family.name)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-sm">
                      {renderEditableCell(index, 'area', family.area)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-sm">
                      {renderEditableCell(index, 'guide', family.guide)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-sm">
                      {renderEditableCell(index, 'nationalId', family.nationalId)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-sm">
                      {renderEditableCell(index, 'phone', family.phone)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-sm text-center">
                      {renderEditableCell(index, 'familySize', family.familySize)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-sm">
                      {renderEditableCell(index, 'aidType', family.aidType)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-sm">
                      {renderEditableCell(index, 'committee', family.committee)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-red-600 hover:bg-red-50"
                          onClick={() => deleteRow(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Summary Row */}
          <div className="border-t border-gray-300 bg-gray-50 px-4 py-3">
            <div className="text-sm text-gray-600">
              إجمالي العائلات: <span className="font-semibold">{filteredFamilies.length}</span> عائلة
              {searchTerm && (
                <span className="mr-4">
                  نتائج البحث: <span className="font-semibold">{filteredFamilies.length}</span>
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
