import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Warehouse, Building } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const Warehouses = () => {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة المخازن</h1>
            <p className="text-gray-600 mt-1">إدارة المخازن وتوزيع الأصناف</p>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border rounded-lg p-1">
            <TabsTrigger value="inventory" className="text-sm">المخزون</TabsTrigger>
            <TabsTrigger value="warehouses" className="text-sm">المخازن</TabsTrigger>
            <TabsTrigger value="distribution" className="text-sm">التوزيع</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  المخزون
                </CardTitle>
                <CardDescription>
                  عرض وإدارة الأصناف في المخازن
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  سيتم إضافة محتوى المخزون قريباً
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="warehouses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Warehouse className="w-5 h-5" />
                  المخازن
                </CardTitle>
                <CardDescription>
                  إدارة المخازن والمواقع
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  سيتم إضافة محتوى المخازن قريباً
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  التوزيع
                </CardTitle>
                <CardDescription>
                  إدارة توزيع الأصناف بين المخازن
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  سيتم إضافة محتوى التوزيع قريباً
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Warehouses; 