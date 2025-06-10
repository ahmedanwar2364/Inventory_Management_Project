
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface InventoryItem {
  itemCode: string;
  itemName: string;
  storeroom: string;
  branch: string;
  team: string;
  category: string;
  status: string;
  unit: string;
  originalStock: number;
  reorderThreshold: number;
  currentStock: number;
  outsideStoreroom: number;
}

export const useInventoryData = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading inventory data
    const loadInventoryData = async () => {
      setIsLoading(true);
      
      // Mock data for demonstration
      const mockItems: InventoryItem[] = [
        {
          itemCode: 'ITM001',
          itemName: 'أقلام حبر زرقاء',
          storeroom: 'المخزن الرئيسي',
          branch: 'الفرع الأول',
          team: 'عيني',
          category: 'قرطاسية',
          status: 'جيد',
          unit: 'قطعة',
          originalStock: 100,
          reorderThreshold: 10,
          currentStock: 25,
          outsideStoreroom: 15
        },
        {
          itemCode: 'ITM002',
          itemName: 'ورق A4',
          storeroom: 'المخزن الرئيسي',
          branch: 'الفرع الأول',
          team: 'إعلامي',
          category: 'قرطاسية',
          status: 'جيد',
          unit: 'علبة',
          originalStock: 50,
          reorderThreshold: 5,
          currentStock: 8,
          outsideStoreroom: 2
        },
        {
          itemCode: 'ITM003',
          itemName: 'كبلات USB',
          storeroom: 'مخزن الفرع الأول',
          branch: 'الفرع الثاني',
          team: 'مجددون',
          category: 'عدة',
          status: 'جيد',
          unit: 'قطعة',
          originalStock: 30,
          reorderThreshold: 3,
          currentStock: 12,
          outsideStoreroom: 5
        },
        {
          itemCode: 'ITM004',
          itemName: 'مناديل ورقية',
          storeroom: 'المخزن الرئيسي',
          branch: 'الفرع الثالث',
          team: 'نسائي',
          category: 'مستهلكات',
          status: 'جيد',
          unit: 'علبة',
          originalStock: 200,
          reorderThreshold: 20,
          currentStock: 5,
          outsideStoreroom: 10
        },
        {
          itemCode: 'ITM005',
          itemName: 'كراسي بلاستيكية',
          storeroom: 'مخزن الفرع الثاني',
          branch: 'الفرع الثاني',
          team: 'عيني',
          category: 'عدة',
          status: 'جيد',
          unit: 'قطعة',
          originalStock: 80,
          reorderThreshold: 8,
          currentStock: 45,
          outsideStoreroom: 12
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setItems(mockItems);
      setIsLoading(false);
    };

    loadInventoryData();
  }, []);

  const addItem = async (newItem: Omit<InventoryItem, 'currentStock' | 'outsideStoreroom'> & { currentStock: number, outsideStoreroom: number }) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setItems(prev => [...prev, newItem as InventoryItem]);
    setIsLoading(false);
  };

  const updateItem = async (itemCode: string, updates: Partial<InventoryItem>) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setItems(prev => prev.map(item => 
      item.itemCode === itemCode ? { ...item, ...updates } : item
    ));
    setIsLoading(false);
  };

  return {
    items,
    isLoading,
    addItem,
    updateItem
  };
};
