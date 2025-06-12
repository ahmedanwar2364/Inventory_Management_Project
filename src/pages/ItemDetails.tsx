import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Package, AlertTriangle, Users, Calendar } from 'lucide-react';
import { useInventoryData } from '@/hooks/useInventoryData';

const ItemDetails = () => {
  const { itemCode } = useParams();
  const navigate = useNavigate();
  const { items } = useInventoryData();
  
  const item = items.find(i => i.itemCode === itemCode);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-500">
                الصنف غير موجود
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">تفاصيل الصنف</h1>
        </div>

        {/* Main Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{item.itemName}</span>
              <Badge variant={item.currentStock <= item.reorderThreshold ? "destructive" : "default"}>
                {item.currentStock <= item.reorderThreshold ? "منخفض" : "متوفر"}
              </Badge>
            </CardTitle>
            <CardDescription>كود الصنف: {item.itemCode}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">المخزن</div>
                    <div className="font-medium">{item.storeroom}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">اللجنة</div>
                    <div className="font-medium">{item.team}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">حد الخطر</div>
                    <div className="font-medium">{item.reorderThreshold} {item.unit}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">الرصيد الحالي</div>
                    <div className="font-medium">{item.currentStock} {item.unit}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">المسحوب</div>
                    <div className="font-medium">{item.outsideStoreroom} {item.unit}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">آخر تحديث</div>
                    <div className="font-medium">{new Date().toLocaleDateString('en-US')}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History Card */}
        <Card>
          <CardHeader>
            <CardTitle>سجل العمليات</CardTitle>
            <CardDescription>آخر العمليات على هذا الصنف</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              سيتم إضافة سجل العمليات قريباً
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ItemDetails; 