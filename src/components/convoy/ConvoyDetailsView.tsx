
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, MapPin, Users, Package, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ConvoyEvent, ConvoyRequirement } from '@/types/convoy';

interface ConvoyDetailsViewProps {
  convoy: ConvoyEvent;
  requirements: ConvoyRequirement[];
}

export const ConvoyDetailsView: React.FC<ConvoyDetailsViewProps> = ({
  convoy,
  requirements
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planning':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">قيد التخطيط</Badge>;
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">نشط</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">مكتمل</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRequirementStatusBadge = (status: string) => {
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

  return (
    <div className="space-y-6" dir="rtl">
      {/* Convoy Information */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{convoy.name}</CardTitle>
              <p className="text-gray-600 mt-1">{convoy.description}</p>
            </div>
            {getStatusBadge(convoy.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>التاريخ:</strong> {convoy.date}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>الموقع:</strong> {convoy.location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>المنظم:</strong> {convoy.organizer}
              </span>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">اللجان المشاركة:</h4>
            <div className="flex gap-2 flex-wrap">
              {convoy.committees.map((committee) => (
                <Badge key={committee} variant="outline">{committee}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>احتياجات القافلة</CardTitle>
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
                    <TableHead className="text-right">تاريخ الطلب</TableHead>
                    <TableHead className="text-right">الوصف</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requirements.map((req) => (
                    <TableRow key={req.id} className="hover:bg-gray-50">
                      <TableCell>{req.committee}</TableCell>
                      <TableCell className="font-medium">{req.itemType}</TableCell>
                      <TableCell>{req.quantity}</TableCell>
                      <TableCell>{getPriorityBadge(req.priority)}</TableCell>
                      <TableCell>{getRequirementStatusBadge(req.status)}</TableCell>
                      <TableCell>{req.requestDate}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={req.description}>
                          {req.description || 'لا يوجد وصف'}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              لا توجد احتياجات مسجلة لهذه القافلة
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
