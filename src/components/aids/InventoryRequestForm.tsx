
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InventoryItem {
  itemCode: string;
  itemName: string;
  category: string;
  unit: string;
  availableStock: number;
  storeroom: string;
}

interface Request {
  requestId: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  requestType: 'Fixed' | 'Special';
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

export const InventoryRequestForm = () => {
  const [formData, setFormData] = useState({
    itemCode: '',
    quantity: 1,
    requestType: 'Fixed' as 'Fixed' | 'Special'
  });

  const [inventoryItems] = useState<InventoryItem[]>([
    {
      itemCode: 'ITM001',
      itemName: 'ملابس أطفال',
      category: 'ملابس',
      unit: 'قطعة',
      availableStock: 150,
      storeroom: 'القرية'
    },
    {
      itemCode: 'ITM002',
      itemName: 'طبق فل',
      category: 'إطعام',
      unit: 'قطعة',
      availableStock: 200,
      storeroom: 'المركز'
    },
    {
      itemCode: 'ITM003',
      itemName: 'غسالة ملابس',
      category: 'أجهزة كهربائية',
      unit: 'قطعة',
      availableStock: 25,
      storeroom: 'المخزن الرئيسي'
    }
  ]);

  const [requests] = useState<Request[]>([
    {
      requestId: 'REQ001',
      itemCode: 'ITM001',
      itemName: 'ملابس أطفال',
      quantity: 50,
      requestType: 'Fixed',
      status: 'Pending',
      createdAt: '2024-01-15'
    },
    {
      requestId: 'REQ002',
      itemCode: 'ITM002',
      itemName: 'طبق فل',
      quantity: 30,
      requestType: 'Special',
      status: 'Approved',
      createdAt: '2024-01-14'
    }
  ]);

  const { toast } = useToast();

  const selectedItem = inventoryItems.find(item => item.itemCode === formData.itemCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.itemCode || formData.quantity <= 0) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى اختيار صنف وكمية صحيحة",
        variant: "destructive",
      });
      return;
    }

    if (selectedItem && formData.quantity > selectedItem.availableStock) {
      toast({
        title: "كمية غير متوفرة",
        description: `الكمية المتوفرة: ${selectedItem.availableStock} ${selectedItem.unit}`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم إرسال الطلب بنجاح",
      description: `طلب ${selectedItem?.itemName} بكمية ${formData.quantity} ${selectedItem?.unit}`,
    });

    // Reset form
    setFormData({
      itemCode: '',
      quantity: 1,
      requestType: 'Fixed'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">معلق</Badge>;
      case 'Approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">موافق</Badge>;
      case 'Rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">مرفوض</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRequestTypeBadge = (type: string) => {
    return type === 'Fixed' ? (
      <Badge variant="outline">ثابت</Badge>
    ) : (
      <Badge className="bg-purple-100 text-purple-800">خاص</Badge>
    );
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Request Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            طلب صنف من المخزون
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemCode">الصنف المطلوب *</Label>
              <Select value={formData.itemCode} onValueChange={(value) => setFormData(prev => ({ ...prev, itemCode: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الصنف" />
                </SelectTrigger>
                <SelectContent>
                  {inventoryItems.map((item) => (
                    <SelectItem key={item.itemCode} value={item.itemCode}>
                      {item.itemName} - متوفر: {item.availableStock} {item.unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">الكمية المطلوبة *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                placeholder="الكمية"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requestType">نوع الطلب</Label>
              <Select value={formData.requestType} onValueChange={(value: 'Fixed' | 'Special') => setFormData(prev => ({ ...prev, requestType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fixed">طلب ثابت</SelectItem>
                  <SelectItem value="Special">طلب خاص</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stock Info */}
            {selectedItem && (
              <div className="space-y-2">
                <Label>معلومات المخزون</Label>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{selectedItem.itemName}</span>
                  </div>
                  <div className="text-sm mt-1 space-y-1">
                    <p>المخزن: {selectedItem.storeroom}</p>
                    <p>الرصيد: {selectedItem.availableStock} {selectedItem.unit}</p>
                    <p>التصنيف: {selectedItem.category}</p>
                  </div>
                  {formData.quantity > selectedItem.availableStock && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>الكمية المطلوبة أكبر من المتوفر!</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!selectedItem || formData.quantity > selectedItem.availableStock}
              >
                إرسال الطلب
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Requests List */}
      <Card>
        <CardHeader>
          <CardTitle>طلباتي السابقة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-right">رقم الطلب</TableHead>
                  <TableHead className="text-right">الصنف</TableHead>
                  <TableHead className="text-right">الكمية</TableHead>
                  <TableHead className="text-right">نوع الطلب</TableHead>
                  <TableHead className="text-right">تاريخ الطلب</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.requestId} className="hover:bg-gray-50">
                    <TableCell className="font-mono font-medium">{request.requestId}</TableCell>
                    <TableCell>{request.itemName}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>{getRequestTypeBadge(request.requestType)}</TableCell>
                    <TableCell>{request.createdAt}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {requests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              لا توجد طلبات سابقة
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
