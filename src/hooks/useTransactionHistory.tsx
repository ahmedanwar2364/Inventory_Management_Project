
import { useState, useEffect } from 'react';

export interface Transaction {
  transactionId: string;
  storeroom: string;
  type: 'تسليم' | 'استلام';
  team: string;
  teamLeader: string;
  itemCode: string;
  itemName: string;
  dateTime: string;
  manager: string;
  quantity: number;
}

export const useTransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTransactionHistory = async () => {
      setIsLoading(true);
      
      // Mock transaction data
      const mockTransactions: Transaction[] = [
        {
          transactionId: 'TXN001',
          storeroom: 'المخزن الرئيسي',
          type: 'تسليم',
          team: 'عيني',
          teamLeader: 'أحمد محمد',
          itemCode: 'ITM001',
          itemName: 'أقلام حبر زرقاء',
          dateTime: '2024-06-10T14:30:00Z',
          manager: 'manager@inventory.com',
          quantity: 15
        },
        {
          transactionId: 'TXN002',
          storeroom: 'المخزن الرئيسي',
          type: 'استلام',
          team: 'إعلامي',
          teamLeader: 'فاطمة أحمد',
          itemCode: 'ITM002',
          itemName: 'ورق A4',
          dateTime: '2024-06-10T13:15:00Z',
          manager: 'manager@inventory.com',
          quantity: 20
        },
        {
          transactionId: 'TXN003',
          storeroom: 'مخزن الفرع الأول',
          type: 'تسليم',
          team: 'مجددون',
          teamLeader: 'عمر خالد',
          itemCode: 'ITM003',
          itemName: 'كبلات USB',
          dateTime: '2024-06-10T11:45:00Z',
          manager: 'manager@inventory.com',
          quantity: 8
        },
        {
          transactionId: 'TXN004',
          storeroom: 'المخزن الرئيسي',
          type: 'تسليم',
          team: 'نسائي',
          teamLeader: 'مريم علي',
          itemCode: 'ITM004',
          itemName: 'مناديل ورقية',
          dateTime: '2024-06-10T10:20:00Z',
          manager: 'manager@inventory.com',
          quantity: 25
        },
        {
          transactionId: 'TXN005',
          storeroom: 'مخزن الفرع الثاني',
          type: 'استلام',
          team: 'عيني',
          teamLeader: 'يوسف حسن',
          itemCode: 'ITM005',
          itemName: 'كراسي بلاستيكية',
          dateTime: '2024-06-09T16:00:00Z',
          manager: 'manager@inventory.com',
          quantity: 12
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setTransactions(mockTransactions);
      setIsLoading(false);
    };

    loadTransactionHistory();
  }, []);

  return {
    transactions,
    isLoading
  };
};
