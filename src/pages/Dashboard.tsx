
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Users, AlertTriangle, TrendingUp, Plus, Filter } from 'lucide-react';
import { InventoryTable } from '@/components/inventory/InventoryTable';
import { TransactionHistory } from '@/components/inventory/TransactionHistory';
import { PendingRequests } from '@/components/inventory/PendingRequests';
import { AddItemDialog } from '@/components/inventory/AddItemDialog';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const { user, userRole } = useAuth();

  const statsData = [
    {
      title: 'إجمالي الأصناف',
      value: '247',
      description: 'في جميع المخازن',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'الطلبات المعلقة',
      value: '18',
      description: 'تحتاج للمراجعة',
      icon: AlertTriangle,
      color: 'bg-yellow-500'
    },
    {
      title: 'أصناف منخفضة',
      value: '12',
      description: 'تحت حد الخطر',
      icon: TrendingUp,
      color: 'bg-red-500'
    },
    {
      title: 'عدد المستخدمين',
      value: '34',
      description: 'في النظام',
      icon: Users,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">لوحة إدارة المخزون</h1>
            <p className="text-gray-600 mt-1">مرحباً {user?.name || 'بك'} - {userRole === 'مدير المخزن' ? 'مدير المخزن' : 'عضو فريق'}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowAddItem(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 ml-2" />
              إضافة صنف جديد
            </Button>
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
        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border rounded-lg p-1">
            <TabsTrigger value="inventory" className="text-sm">المخزون</TabsTrigger>
            <TabsTrigger value="pending" className="text-sm">الطلبات المعلقة</TabsTrigger>
            <TabsTrigger value="transactions" className="text-sm">تاريخ العمليات</TabsTrigger>
            <TabsTrigger value="reports" className="text-sm">التقارير</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>إدارة المخزون</span>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 ml-2" />
                    تصفية
                  </Button>
                </CardTitle>
                <CardDescription>
                  جميع الأصناف المتوفرة في المخازن
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>الطلبات المعلقة</CardTitle>
                <CardDescription>
                  طلبات التسليم التي تحتاج للمراجعة والموافقة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PendingRequests />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>تاريخ العمليات</CardTitle>
                <CardDescription>
                  سجل جميع عمليات التسليم والاستلام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionHistory />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>التقارير</CardTitle>
                <CardDescription>
                  تقارير وإحصائيات المخزون
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  سيتم إضافة التقارير قريباً
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AddItemDialog open={showAddItem} onOpenChange={setShowAddItem} />
      </div>
    </div>
  );
};

export default Dashboard;
