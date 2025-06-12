import { useQuery } from '@tanstack/react-query';

export interface InventoryItem {
  itemCode: string;
  itemName: string;
  storeroom: string;
  branch: string;
  team: string;
  category: string;
  currentStock: number;
  outsideStoreroom: number;
  reorderThreshold: number;
  unit: string;
  originalStock: number;
  status: string;
}

// Mock data for testing
const mockItems: InventoryItem[] = [
  {
    itemCode: 'ITM001',
    itemName: 'دفتر A4',
    storeroom: 'مخزن القاهرة',
    branch: 'القاهرة',
    team: 'عيني',
    category: 'قرطاسية',
    currentStock: 50,
    outsideStoreroom: 10,
    reorderThreshold: 20,
    unit: 'قطعة',
    originalStock: 100,
    status: 'متوفر'
  },
  {
    itemCode: 'ITM002',
    itemName: 'قلم جاف',
    storeroom: 'مخزن القاهرة',
    branch: 'القاهرة',
    team: 'عيني',
    category: 'قرطاسية',
    currentStock: 100,
    outsideStoreroom: 25,
    reorderThreshold: 30,
    unit: 'قطعة',
    originalStock: 150,
    status: 'متوفر'
  },
  {
    itemCode: 'ITM003',
    itemName: 'مقص مكتب',
    storeroom: 'مخزن القاهرة',
    branch: 'القاهرة',
    team: 'عيني',
    category: 'عدة',
    currentStock: 5,
    outsideStoreroom: 2,
    reorderThreshold: 10,
    unit: 'قطعة',
    originalStock: 20,
    status: 'منخفض'
  }
];

export const useInventoryData = () => {
  const { data: items = [], isLoading } = useQuery<InventoryItem[]>({
    queryKey: ['inventory'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockItems;
    }
  });

  return { items, isLoading };
}; 