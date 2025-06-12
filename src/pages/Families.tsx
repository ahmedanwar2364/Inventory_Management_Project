import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import FamiliesManagement from '@/components/convoy/FamiliesManagement';

const FamiliesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>إدارة العائلات المستفيدة</CardTitle>
            <CardDescription>
              تسجيل وإدارة بيانات العائلات في النظام
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FamiliesManagement />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FamiliesPage; 