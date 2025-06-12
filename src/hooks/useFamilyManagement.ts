
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Family } from '@/types/family';

export const useFamilyManagement = () => {
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
  const { toast } = useToast();

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
      (newFamilies[rowIndex] as Record<string, any>)[field] = tempValue;
    }
    
    setFamilies(newFamilies);
    setEditingCell(null);
    setTempValue('');
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setTempValue('');
  };

  return {
    families,
    editingCell,
    tempValue,
    setTempValue,
    addNewRow,
    deleteRow,
    startEdit,
    saveEdit,
    cancelEdit
  };
};
