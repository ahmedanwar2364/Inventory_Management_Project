
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, AlertTriangle, Calendar, User, Building } from 'lucide-react';
import { InventoryItem } from '@/hooks/useInventoryData';

interface ItemDetailsDialogProps {
  item: InventoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ItemDetailsDialog = ({ item, open, onOpenChange }: ItemDetailsDialogProps) => {
  if (!item) return null;

  const getStatusBadge = (currentStock: number, reorderThreshold: number) => {
    if (currentStock === 0) {
      return <Badge variant="destructive">نفذ</Badge>;
    } else if (currentStock <= reorderThreshold) {
      return <Badge variant="destructive">منخفض</Badge>;
    } else if (currentStock <= reorderThreshold * 2) {
      return <Badge className="bg-yellow-500">متوسط</Badge>;
    } else {
      return <Badge className="bg-green-500">متوفر</Badge>;
    }
  };

  const getStockPercentage = () => {
    if (item.originalStock === 0) return 0;
    return Math.round((item.currentStock / item.originalStock) * 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-right">
            <Package className="w-5 h-5" />
            تفاصيل الصنف: {item.itemName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-right text-lg">المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">كود الصنف</label>
                  <p className="font-mono font-medium">{item.itemCode}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">اسم الصنف</label>
                  <p className="font-medium">{item.itemName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">التصنيف</label>
                  <p>{item.category}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">وحدة القياس</label>
                  <p>{item.unit}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">الحالة</label>
                  <p>{item.status}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">حالة المخزون</label>
                  <div className="mt-1">
                    {getStatusBadge(item.currentStock, item.reorderThreshold)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-right text-lg flex items-center gap-2">
                <Building className="w-4 h-4" />
                معلومات الموقع
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">المخزن</label>
                <p className="font-medium">{item.storeroom}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">اللجنة المسؤولة</label>
                <p className="font-medium">{item.team}</p>
              </div>
            </CardContent>
          </Card>

          {/* Stock Information */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-right text-lg flex items-center gap-2">
                <Package className="w-4 h-4" />
                معلومات المخزون
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{item.originalStock}</div>
                  <div className="text-sm text-gray-600">الرصيد الأصلي</div>
                  <div className="text-xs text-gray-500">{item.unit}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{item.currentStock}</div>
                  <div className="text-sm text-gray-600">الرصيد الحالي</div>
                  <div className="text-xs text-gray-500">{item.unit}</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{item.outsideStoreroom}</div>
                  <div className="text-sm text-gray-600">المسحوب</div>
                  <div className="text-xs text-gray-500">{item.unit}</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{item.reorderThreshold}</div>
                  <div className="text-sm text-gray-600">حد الخطر</div>
                  <div className="text-xs text-gray-500">{item.unit}</div>
                </div>
              </div>

              {/* Stock Level Indicator */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">مستوى المخزون</span>
                  <span className="text-sm font-medium">{getStockPercentage()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      getStockPercentage() <= (item.reorderThreshold / item.originalStock * 100) 
                        ? 'bg-red-500' 
                        : getStockPercentage() <= 50 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(getStockPercentage(), 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Alert for low stock */}
              {item.currentStock <= item.reorderThreshold && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-red-800 font-medium">تحذير: المخزون منخفض</p>
                    <p className="text-red-600 text-sm">الرصيد الحالي أقل من أو يساوي حد الخطر</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
