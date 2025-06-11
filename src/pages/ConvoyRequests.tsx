
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

const ConvoyRequests = () => {
  const requests = [
    {
      id: 'REQ001',
      convoyName: 'قافلة الشمال',
      requestDate: '2024-01-15',
      status: 'pending',
      itemsCount: 15,
      priority: 'high',
      destination: 'المنطقة الشمالية'
    },
    {
      id: 'REQ002',
      convoyName: 'قافلة الجنوب',
      requestDate: '2024-01-14',
      status: 'approved',
      itemsCount: 8,
      priority: 'medium',
      destination: 'المنطقة الجنوبية'
    },
    {
      id: 'REQ003',
      convoyName: 'قافلة الطوارئ',
      requestDate: '2024-01-13',
      status: 'rejected',
      itemsCount: 12,
      priority: 'urgent',
      destination: 'منطقة الطوارئ'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 ml-1" />معلق</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 ml-1" />موافق عليه</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 ml-1" />مرفوض</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">عاجل</Badge>;
      case 'high':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">عالي</Badge>;
      case 'medium':
        return <Badge variant="outline">متوسط</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">طلبات القوافل</h1>
            <p className="text-gray-600 mt-1">إدارة طلبات التموين للقوافل</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 ml-2" />
            طلب جديد
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">إجمالي الطلبات</CardTitle>
              <FileText className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-gray-500 mt-1">هذا الشهر</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">طلبات معلقة</CardTitle>
              <Clock className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-500 mt-1">تحتاج مراجعة</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">طلبات موافق عليها</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500 mt-1">جاهزة للتنفيذ</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">قوافل نشطة</CardTitle>
              <Truck className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-gray-500 mt-1">في الطريق</p>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <Card>
          <CardHeader>
            <CardTitle>طلبات القوافل الحديثة</CardTitle>
            <CardDescription>قائمة بجميع طلبات التموين للقوافل</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{request.convoyName}</h3>
                        {getStatusBadge(request.status)}
                        {getPriorityBadge(request.priority)}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">رقم الطلب:</span> {request.id}</p>
                        <p><span className="font-medium">تاريخ الطلب:</span> {request.requestDate}</p>
                        <p><span className="font-medium">الوجهة:</span> {request.destination}</p>
                        <p><span className="font-medium">عدد الأصناف:</span> {request.itemsCount} صنف</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        عرض التفاصيل
                      </Button>
                      {request.status === 'pending' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                            موافقة
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                            رفض
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConvoyRequests;
