
import { useState, useEffect } from 'react';

export interface PendingRequest {
  requestId: string;
  branch: string;
  committee: string;
  itemCode: string;
  itemName: string;
  requestedQuantity: number;
  storeroom: string;
  date: string;
  requestor: string;
  isUrgent: boolean;
}

export const usePendingRequests = () => {
  const [requests, setRequests] = useState<PendingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPendingRequests = async () => {
      setIsLoading(true);
      
      // Mock data for pending requests
      const mockRequests: PendingRequest[] = [
        {
          requestId: 'REQ001',
          branch: 'الفرع الأول',
          committee: 'عيني',
          itemCode: 'ITM001',
          itemName: 'أقلام حبر زرقاء',
          requestedQuantity: 20,
          storeroom: 'المخزن الرئيسي',
          date: '2024-06-10T10:30:00Z',
          requestor: 'omar@branch1.com',
          isUrgent: false
        },
        {
          requestId: 'REQ002',
          branch: 'الفرع الثاني',
          committee: 'إعلامي',
          itemCode: 'ITM002',
          itemName: 'ورق A4',
          requestedQuantity: 5,
          storeroom: 'المخزن الرئيسي',
          date: '2024-06-10T09:15:00Z',
          requestor: 'sara@branch2.com',
          isUrgent: true
        },
        {
          requestId: 'REQ003',
          branch: 'الفرع الثالث',
          committee: 'مجددون',
          itemCode: 'ITM003',
          itemName: 'كبلات USB',
          requestedQuantity: 10,
          storeroom: 'مخزن الفرع الأول',
          date: '2024-06-10T08:45:00Z',
          requestor: 'ahmed@branch3.com',
          isUrgent: false
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setRequests(mockRequests);
      setIsLoading(false);
    };

    loadPendingRequests();
  }, []);

  const approveRequest = async (requestId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setRequests(prev => prev.filter(req => req.requestId !== requestId));
  };

  const rejectRequest = async (requestId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setRequests(prev => prev.filter(req => req.requestId !== requestId));
  };

  return {
    requests,
    isLoading,
    approveRequest,
    rejectRequest
  };
};
