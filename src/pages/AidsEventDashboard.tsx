
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Package, FileText, Calendar, Plus } from 'lucide-react';
import { FamilyRegistrationForm } from '@/components/aids/FamilyRegistrationForm';
import { InventoryRequestForm } from '@/components/aids/InventoryRequestForm';
import { PendingRequestsTable } from '@/components/aids/PendingRequestsTable';
import { EventPlanningForm } from '@/components/aids/EventPlanningForm';
import { useAuth } from '@/hooks/useAuth';

const AidsEventDashboard = () => {
  const { user, userRole } = useAuth();

  const statsData = [
    {
      title: 'إجمالي العائلات',
      value: '127',
      description: 'عائلة مسجلة',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'الطلبات المعلقة',
      value: '23',
      description: 'تحتاج للمراجعة',
      icon: FileText,
      color: 'bg-yellow-500'
    },
    {
      title: 'أصناف متوفرة',
      value: '156',
      description: 'في المخزون',
      icon: Package,
      color: 'bg-green-500'
    },
    {
      title: 'خطط اليوم',
      value: '8',
      description: 'نشاط مجدول',
      icon: Calendar,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة فعالية المساعدات</h1>
            <p className="text-gray-600 mt-1">
              مرحباً {user?.name || 'بك'} - {user?.committee ? `لجنة ${user.committee}` : userRole}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="families" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white border rounded-lg p-1">
            <TabsTrigger value="families" className="text-sm">العائلات</TabsTrigger>
            <TabsTrigger value="requests" className="text-sm">طلبات المخزون</TabsTrigger>
            <TabsTrigger value="approvals" className="text-sm">الموافقات</TabsTrigger>
            <TabsTrigger value="planning" className="text-sm">خطة اليوم</TabsTrigger>
            <TabsTrigger value="inventory" className="text-sm">المخزون</TabsTrigger>
          </TabsList>

          <TabsContent value="families" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة العائلات</CardTitle>
                <CardDescription>
                  تسجيل وإدارة بيانات العائلات المستفيدة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FamilyRegistrationForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>طلبات المخزون</CardTitle>
                <CardDescription>
                  إرسال وتتبع طلبات الأصناف من المخزون
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryRequestForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>الموافقات على الطلبات</CardTitle>
                <CardDescription>
                  مراجعة والموافقة على طلبات اللجان
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PendingRequestsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planning" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>خطة فعاليات اليوم</CardTitle>
                <CardDescription>
                  تخطيط وتنظيم أنشطة اللجان
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EventPlanningForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>حالة المخزون</CardTitle>
                <CardDescription>
                  عرض الأرصدة المتوفرة حسب الفرع والمخزن
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  سيتم عرض تفاصيل المخزون هنا
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AidsEventDashboard;
