
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Check, X, Clock, AlertTriangle } from 'lucide-react';
import { usePendingRequests } from '@/hooks/usePendingRequests';
import { useToast } from '@/hooks/use-toast';

export const PendingRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [urgentFilter, setUrgentFilter] = useState('all');
  const [processingRequest, setProcessingRequest] = useState<string | null>(null);
  const { requests, isLoading, approveRequest, rejectRequest } = usePendingRequests();
  const { toast } = useToast();

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const handleApprove = async (requestId: string) => {
    setProcessingRequest(requestId);
    try {
      await approveRequest(requestId);
      toast({
        title: "تم قبول الطلب",
        description: "تم قبول طلب التسليم بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء قبول الطلب",
        variant: "destructive",
      });
    } finally {
      setProcessingRequest(null);
    }
  };

  const handleReject = async (requestId: string) => {
    setProcessingRequest(requestId);
    try {
      await rejectRequest(requestId);
      toast({
        title: "تم رفض الطلب",
        description: "تم رفض طلب التسليم",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء رفض الطلب",
        variant: "destructive",
      });
    } finally {
      setProcessingRequest(null);
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBranch = branchFilter === 'all' || request.branch === branchFilter;
    const matchesUrgent = urgentFilter === 'all' || 
                         (urgentFilter === 'urgent' && request.isUrgent) ||
                         (urgentFilter === 'normal' && !request.isUrgent);
    
    return matchesSearch && matchesBranch && matchesUrgent;
  });

  if (isLoading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-4" dir="rtl">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في الطلبات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="الفرع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الفروع</SelectItem>
            <SelectItem value="الفرع الأول">الفرع الأول</SelectItem>
            <SelectItem value="الفرع الثاني">الفرع الثاني</SelectItem>
            <SelectItem value="الفرع الثالث">الفرع الثالث</SelectItem>
          </SelectContent>
        </Select>
        <Select value={urgentFilter} onValueChange={setUrgentFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="الأولوية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأولويات</SelectItem>
            <SelectItem value="urgent">عاجل</SelectItem>
            <SelectItem value="normal">عادي</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-right">كود الطلب</TableHead>
              <TableHead className="text-right">الفرع</TableHead>
              <TableHead className="text-right">اللجنة</TableHead>
              <TableHead className="text-right">كود الصنف</TableHead>
              <TableHead className="text-right">اسم الصنف</TableHead>
              <TableHead className="text-right">الكمية المطلوبة</TableHead>
              <TableHead className="text-right">المخزن</TableHead>
              <TableHead className="text-right">التاريخ</TableHead>
              <TableHead className="text-right">الوقت</TableHead>
              <TableHead className="text-right">مقدم الطلب</TableHead>
              <TableHead className="text-right">الأولوية</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => {
              const { date, time } = formatDateTime(request.date);
              return (
                <TableRow key={request.requestId} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{request.requestId}</TableCell>
                  <TableCell>{request.branch}</TableCell>
                  <TableCell>{request.committee}</TableCell>
                  <TableCell className="font-mono text-sm">{request.itemCode}</TableCell>
                  <TableCell className="font-medium">{request.itemName}</TableCell>
                  <TableCell className="text-center font-semibold">{request.requestedQuantity}</TableCell>
                  <TableCell>{request.storeroom}</TableCell>
                  <TableCell className="font-mono text-sm">{date}</TableCell>
                  <TableCell className="font-mono text-sm">{time}</TableCell>
                  <TableCell className="text-sm">{request.requestor}</TableCell>
                  <TableCell>
                    {request.isUrgent ? (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        عاجل
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        عادي
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleApprove(request.requestId)}
                        disabled={processingRequest === request.requestId}
                        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleReject(request.requestId)}
                        disabled={processingRequest === request.requestId}
                        className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          لا توجد طلبات معلقة حالياً
        </div>
      )}
    </div>
  );
};
