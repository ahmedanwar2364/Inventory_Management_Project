
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Clock, AlertCircle } from 'lucide-react';
import { usePendingRequests } from '@/hooks/usePendingRequests';
import { useToast } from '@/hooks/use-toast';

export const PendingRequests = () => {
  const { requests, isLoading, approveRequest, rejectRequest } = usePendingRequests();
  const { toast } = useToast();

  const handleApprove = async (requestId: string) => {
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
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await rejectRequest(requestId);
      toast({
        title: "تم رفض الطلب",
        description: "تم رفض طلب التسليم",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء رفض الطلب",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات معلقة</h3>
          <p className="text-gray-500">جميع الطلبات تمت مراجعتها</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              الطلبات المعلقة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{requests.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              طلبات عاجلة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {requests.filter(r => r.isUrgent).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              متوسط وقت الانتظار
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2.5 ساعة</div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
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
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.requestId} className="hover:bg-gray-50">
                <TableCell className="font-mono text-sm">{request.requestId}</TableCell>
                <TableCell>{request.branch}</TableCell>
                <TableCell>{request.committee}</TableCell>
                <TableCell className="font-mono text-sm">{request.itemCode}</TableCell>
                <TableCell>{request.itemName}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    {request.isUrgent && (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="font-semibold">{request.requestedQuantity}</span>
                  </div>
                </TableCell>
                <TableCell>{request.storeroom}</TableCell>
                <TableCell className="text-sm text-gray-600">
                  {new Date(request.date).toLocaleDateString('ar-SA')}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Clock className="w-3 h-3 ml-1" />
                    معلق
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(request.requestId)}
                    >
                      <Check className="w-4 h-4 ml-1" />
                      قبول
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(request.requestId)}
                    >
                      <X className="w-4 h-4 ml-1" />
                      رفض
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
