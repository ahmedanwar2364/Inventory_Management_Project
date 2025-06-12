
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ConvoyEvent, ConvoyRequirement } from '@/types/convoy';

export const useConvoyManagement = () => {
  const [convoys] = useState<ConvoyEvent[]>([
    {
      id: 'CONV001',
      name: 'قافلة الشمال الخيرية',
      date: '2024-06-20',
      location: 'المنطقة الشمالية',
      status: 'planning',
      description: 'قافلة خيرية شاملة للمنطقة الشمالية',
      organizer: 'أحمد محمد',
      committees: ['عيني', 'إطعام', 'كسوة']
    },
    {
      id: 'CONV002',
      name: 'قافلة رمضان الخيرية',
      date: '2024-05-15',
      location: 'المنطقة الجنوبية',
      status: 'completed',
      description: 'قافلة رمضانية لتوزيع المساعدات',
      organizer: 'فاطمة أحمد',
      committees: ['إطعام', 'عيني']
    }
  ]);

  const [requirements] = useState<ConvoyRequirement[]>([
    {
      id: 'REQ001',
      convoyId: 'CONV001',
      committee: 'عيني',
      itemType: 'ملابس شتوية',
      quantity: 100,
      priority: 'high',
      description: 'ملابس شتوية للأطفال والكبار',
      status: 'pending',
      requestedBy: 'لجنة الكسوة',
      requestDate: '2024-06-10'
    },
    {
      id: 'REQ002',
      convoyId: 'CONV001',
      committee: 'إطعام',
      itemType: 'وجبات جاهزة',
      quantity: 200,
      priority: 'urgent',
      description: 'وجبات ساخنة جاهزة للتوزيع',
      status: 'approved',
      requestedBy: 'لجنة الإطعام',
      requestDate: '2024-06-08',
      approvedBy: 'مدير المخزن',
      approvalDate: '2024-06-09'
    }
  ]);

  const { toast } = useToast();

  const addRequirement = (requirement: Omit<ConvoyRequirement, 'id' | 'requestDate' | 'status'>) => {
    const newRequirement: ConvoyRequirement = {
      ...requirement,
      id: `REQ${String(requirements.length + 1).padStart(3, '0')}`,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    toast({
      title: "تم إرسال الطلب",
      description: "تم إرسال طلب الاحتياجات بنجاح",
    });
    
    return newRequirement;
  };

  const approveRequirement = (requirementId: string, approvedBy: string) => {
    toast({
      title: "تم الموافقة على الطلب",
      description: "تم الموافقة على طلب الاحتياجات",
    });
  };

  const rejectRequirement = (requirementId: string, reason: string) => {
    toast({
      title: "تم رفض الطلب",
      description: "تم رفض طلب الاحتياجات",
      variant: "destructive",
    });
  };

  return {
    convoys,
    requirements,
    addRequirement,
    approveRequirement,
    rejectRequirement
  };
};
