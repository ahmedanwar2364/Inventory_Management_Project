
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Clock, AlertCircle, Package } from 'lucide-react';
import { ConvoyRequirement } from '@/types/convoy';
import { useAuth } from '@/hooks/useAuth';

interface AdminRequirementsViewProps {
  requirements: ConvoyRequirement[];
  onApprove: (requirementId: string, approvedBy: string) => void;
  onReject: (requirementId: string, reason: string) => void;
}

export const AdminRequirementsView: React.FC<AdminRequirementsViewProps> = ({
  requirements,
  onApprove,
  onReject
}) => {
  const { user } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 ml-1" />معلق</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 ml-1" />موافق عليه</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 ml-1" />مرفوض</Badge>;
      case 'fulfilled':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Package className="w-3 h-3 ml-1" />تم التوفير</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 ml-1" />عاجل</Badge>;
      case 'high':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">عالي</Badge>;
      case 'medium':
        return <Badge variant="outline">متوسط</Badge>;
      case 'low':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-600">منخفض</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const pendingRequirements = requirements.filter(req => req.status === 'pending');

  return (
    <Card>
      <CardHeader>
        <CardTitle>الموافقة على الطلبات</CardTitle>
        <p className="text-sm text-gray-600">
          {pendingRequirements.length} طلب معلق للمراجعة
        </p>
      </CardHeader>
      <CardContent>
        {requirements.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-right">اللجنة</TableHead>
                  <TableHead className="text-right">نوع الصنف</TableHead>
                  <TableHead className="text-right">الكمية</TableHead>
                  <TableHead className="text-right">الأولوية</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">طالب الاحتياج</TableHead>
                  <TableHead className="text-right">تاريخ الطلب</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requirements.map((req) => (
                  <TableRow key={req.id} className="hover:bg-gray-50">
                    <TableCell>{req.committee}</TableCell>
                    <TableCell className="font-medium">{req.itemType}</TableCell>
                    <TableCell>{req.quantity}</TableCell>
                    <TableCell>{getPriorityBadge(req.priority)}</TableCell>
                    <TableCell>{getStatusBadge(req.status)}</TableCell>
                    <TableCell>{req.requestedBy}</TableCell>
                    <TableCell>{req.requestDate}</TableCell>
                    <TableCell>
                      {req.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => onApprove(req.id, user?.name || 'مدير')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => onReject(req.id, 'لم يتم توضيح السبب')}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                      {req.status !== 'pending' && (
                        <span className="text-sm text-gray-500">
                          {req.status === 'approved' ? `موافق من: ${req.approvedBy}` : 'تم الرفض'}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            لا توجد طلبات للمراجعة
          </div>
        )}
      </CardContent>
    </Card>
  );
};
