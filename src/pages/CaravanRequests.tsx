import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';

const CaravanRequests = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>طلبات القوافل</CardTitle>
            <CardDescription>
              إدارة طلبات القوافل وتتبعها
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-500">
              سيتم إضافة محتوى طلبات القوافل قريباً
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CaravanRequests; 