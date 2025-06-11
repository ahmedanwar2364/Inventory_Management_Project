
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Filter } from 'lucide-react';

interface Request {
  requestId: string;
  branch: string;
  committee: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  requestType: 'Fixed' | 'Special';
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
  storeroom: string;
  availableStock: number;
}

export const PendingRequestsTable = () => {
  const [branchFilter, setBranchFilter] = useState('all');
  const [committeeFilter, setCommitteeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('Pending');
  const { toast } = useToast();

  const [requests] = useState<Request[]>([
    {
      requestId: 'REQ001',
      branch: 'مصدق',
      committee: 'عيني',
      itemCode: 'ITM001',
      itemName: 'ملابس أطفال',
      quantity: 50,
      requestType: 'Fixed',
      status: 'Pending',
      createdAt: '2024-06-15',
      storeroom: 'القرية',
      availableStock: 150
    },
    {
      requestId: 'REQ002',
      branch: 'سلطان',
      committee: 'براعم',
      itemCode: 'ITM003',
      itemName: 'غسالة ملابس',
      quantity: 3,
      requestType: 'Fixed',
      status: 'Pending',
      createdAt: '2024-06-14',
      storeroom: 'المخزن الرئيسي',
      availableStock: 5
    },
    {
      requestId: 'REQ003',
      branch: 'مصدق',
      committee: 'إطعام',
      itemCode: 'ITM002',
      itemName: 'طبق فل',
      quantity: 100,
      requestType: 'Fixed',
      status: 'Pending',
      createdAt: '2024-06-13',
      storeroom: 'المركز',
      availableStock: 80
    }
  ]);

  const filteredRequests = requests.filter(request => {
    const matchesBranch = branchFilter === 'all' || request.branch === branchFilter;
    const matchesCommittee = committeeFilter === 'all' || request.committee === committeeFilter;
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesBranch && matchesCommittee && matchesStatus;
  });

  const handleApprove = (requestId: string) => {
    const request = requests.find(r => r.requestId === requestId);
    if (request) {
      if (request.quantity > request.availableStock) {
        toast({
          title: "تعذر الموافقة",
          description: `الكمية المطلوبة (${request.quantity}) أكبر من المتوفر (${request.availableStock})`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "تمت الموافقة",
          description: `تمت الموافقة على طلب ${request.itemName} للجنة ${request.committee}`,
        });
      }
    }
  };

  const handleReject = (requestId: string) => {
    const request = requests.find(r => r.requestId === requestId);
    if (request) {
      toast({
        title: "تم الرفض",
        description: `تم رفض طلب ${request.itemName} للجنة ${request.committee}`,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">معلق</Badge>;
      case 'Approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">موافق</Badge>;
      case 'Rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">مرفوض</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRequestTypeBadge = (type: string) => {
    return type === 'Fixed' ? (
      <Badge variant="outline">ثابت</Badge>
    ) : (
      <Badge className="bg-purple-100 text-purple-800">خاص</Badge>
    );
  };

  const getStockStatus = (request: Request) => {
    if (request.quantity > request.availableStock) {
      return (
        <div className="text-red-600 text-xs flex items-center gap-1">
          <span className="font-bold">{request.availableStock}</span> / <span>{request.quantity}</span>
          <span className="ml-1">غير كافي</span>
        </div>
      );
    } else {
      return (
        <div className="text-green-600 text-xs flex items-center gap-1">
          <span className="font-bold">{request.availableStock}</span> / <span>{request.quantity}</span>
          <span className="ml-1">متوفر</span>
        </div>
      );
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">تصفية:</span>
        </div>
        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="الفرع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الفروع</SelectItem>
            <SelectItem value="مصدق">مصدق</SelectItem>
            <SelectItem value="سلطان">سلطان</SelectItem>
            <SelectItem value="الواحة">الواحة</SelectItem>
          </SelectContent>
        </Select>

        <Select value={committeeFilter} onValueChange={setCommitteeFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="اللجنة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع اللجان</SelectItem>
            <SelectItem value="عيني">عيني</SelectItem>
            <SelectItem value="إطعام">إطعام</SelectItem>
            <SelectItem value="براعم">براعم</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="Pending">معلق</SelectItem>
            <SelectItem value="Approved">موافق عليه</SelectItem>
            <SelectItem value="Rejected">مرفوض</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-right">رقم الطلب</TableHead>
              <TableHead className="text-right">الفرع</TableHead>
              <TableHead className="text-right">اللجنة</TableHead>
              <TableHead className="text-right">الصنف</TableHead>
              <TableHead className="text-right">الكمية</TableHead>
              <TableHead className="text-right">المخزن</TableHead>
              <TableHead className="text-right">حالة المخزون</TableHead>
              <TableHead className="text-right">النوع</TableHead>
              <TableHead className="text-right">التاريخ</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.requestId} className="hover:bg-gray-50">
                <TableCell className="font-mono">{request.requestId}</TableCell>
                <TableCell>{request.branch}</TableCell>
                <TableCell>{request.committee}</TableCell>
                <TableCell className="font-medium">{request.itemName}</TableCell>
                <TableCell className="text-center">{request.quantity}</TableCell>
                <TableCell>{request.storeroom}</TableCell>
                <TableCell>{getStockStatus(request)}</TableCell>
                <TableCell>{getRequestTypeBadge(request.requestType)}</TableCell>
                <TableCell>{request.createdAt}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>
                  {request.status === 'Pending' && (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-green-50 text-green-700 hover:bg-green-100"
                        onClick={() => handleApprove(request.requestId)}
                        disabled={request.quantity > request.availableStock}
                      >
                        <CheckCircle className="w-4 h-4 ml-1" />
                        موافقة
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-red-50 text-red-700 hover:bg-red-100"
                        onClick={() => handleReject(request.requestId)}
                      >
                        <XCircle className="w-4 h-4 ml-1" />
                        رفض
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          لا توجد طلبات تطابق معايير البحث
        </div>
      )}
    </div>
  );
};
