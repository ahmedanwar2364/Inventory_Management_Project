
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

  const [editingCell, setEditingCell] = useState<{rowIndex: number, field: keyof Family} | null>(null);
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

  const startEdit = (rowIndex: number, field: keyof Family, currentValue: string | number) => {
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
      (newFamilies[rowIndex] as any)[field] = tempValue;
    }
    
    setFamilies(newFamilies);
    setEditingCell(null);
    setTempValue('');
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setTempValue('');
  };

  const renderEditableCell = (rowIndex: number, field: keyof Family, value: string | number) => {
    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.field === field;
    
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
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-green-100" onClick={saveEdit}>
              <Save className="w-4 h-4 text-green-600" />
            </Button>
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-red-100" onClick={cancelEdit}>
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
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-green-100" onClick={saveEdit}>
              <Save className="w-4 h-4 text-green-600" />
            </Button>
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-red-100" onClick={cancelEdit}>
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
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') cancelEdit();
            }}
            autoFocus
          />
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-green-100" onClick={saveEdit}>
            <Save className="w-4 h-4 text-green-600" />
          </Button>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-red-100" onClick={cancelEdit}>
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
        onClick={() => startEdit(rowIndex, field, value)}
        title="انقر للتحرير"
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
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              العائلات المسجلة - جدول قابل للتحرير
            </CardTitle>
            <div className="flex items-center gap-4">
              <Button onClick={addNewRow} className="bg-green-600 hover:bg-green-700 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                إضافة عائلة جديدة
              </Button>
              <div className="relative w-72">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث في العائلات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
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
                {filteredFamilies.map((family, index) => (
                  <tr key={family.familyCode} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-25 transition-colors border-b border-gray-200`}>
                    <td className="border-r border-gray-200 px-2 py-1">
                      {renderEditableCell(index, 'familyCode', family.familyCode)}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-1">
                      {renderEditableCell(index, 'name', family.name)}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-1">
                      {renderEditableCell(index, 'area', family.area)}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-1">
                      {renderEditableCell(index, 'guide', family.guide)}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-1">
                      {renderEditableCell(index, 'nationalId', family.nationalId)}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-1">
                      {renderEditableCell(index, 'phone', family.phone)}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-1 text-center">
                      {renderEditableCell(index, 'familySize', family.familySize)}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-1">
                      {renderEditableCell(index, 'aidType', family.aidType)}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-1">
                      {renderEditableCell(index, 'committee', family.committee)}
                    </td>
                    <td className="px-2 py-1">
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                          onClick={() => deleteRow(index)}
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
