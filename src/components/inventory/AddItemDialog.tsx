
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useInventoryData } from '@/hooks/useInventoryData';

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddItemDialog = ({ open, onOpenChange }: AddItemDialogProps) => {
  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    storeroom: '',
    branch: '',
    team: '',
    category: '',
    status: '',
    unit: '',
    originalStock: '',
    reorderThreshold: ''
  });

  const { toast } = useToast();
  const { addItem } = useInventoryData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addItem({
        ...formData,
        originalStock: parseInt(formData.originalStock),
        reorderThreshold: parseInt(formData.reorderThreshold),
        currentStock: parseInt(formData.originalStock),
        outsideStoreroom: 0
      });

      toast({
        title: "تم إضافة الصنف",
        description: "تم إضافة الصنف الجديد بنجاح",
      });

      onOpenChange(false);
      setFormData({
        itemCode: '',
        itemName: '',
        storeroom: '',
        branch: '',
        team: '',
        category: '',
        status: '',
        unit: '',
        originalStock: '',
        reorderThreshold: ''
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة الصنف",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle>إضافة صنف جديد</DialogTitle>
          <DialogDescription>
            أدخل تفاصيل الصنف الجديد في المخزون
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemCode">كود الصنف</Label>
              <Input
                id="itemCode"
                value={formData.itemCode}
                onChange={(e) => setFormData(prev => ({ ...prev, itemCode: e.target.value }))}
                placeholder="مثال: ITM001"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="itemName">اسم الصنف</Label>
              <Input
                id="itemName"
                value={formData.itemName}
                onChange={(e) => setFormData(prev => ({ ...prev, itemName: e.target.value }))}
                placeholder="مثال: أقلام حبر"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeroom">المخزن</Label>
              <Select value={formData.storeroom} onValueChange={(value) => setFormData(prev => ({ ...prev, storeroom: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المخزن" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="المخزن الرئيسي">المخزن الرئيسي</SelectItem>
                  <SelectItem value="مخزن الفرع الأول">مخزن الفرع الأول</SelectItem>
                  <SelectItem value="مخزن الفرع الثاني">مخزن الفرع الثاني</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">الفرع</Label>
              <Select value={formData.branch} onValueChange={(value) => setFormData(prev => ({ ...prev, branch: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفرع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الفرع الأول">الفرع الأول</SelectItem>
                  <SelectItem value="الفرع الثاني">الفرع الثاني</SelectItem>
                  <SelectItem value="الفرع الثالث">الفرع الثالث</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team">اللجنة</Label>
              <Select value={formData.team} onValueChange={(value) => setFormData(prev => ({ ...prev, team: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر اللجنة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عيني">عيني</SelectItem>
                  <SelectItem value="مجددون">مجددون</SelectItem>
                  <SelectItem value="إعلامي">إعلامي</SelectItem>
                  <SelectItem value="نسائي">نسائي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">التصنيف</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عدة">عدة</SelectItem>
                  <SelectItem value="مستهلكات">مستهلكات</SelectItem>
                  <SelectItem value="قرطاسية">قرطاسية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">الحالة</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="جيد">جيد</SelectItem>
                  <SelectItem value="تالف">تالف</SelectItem>
                  <SelectItem value="يحتاج صيانة">يحتاج صيانة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">وحدة القياس</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="الوحدة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="قطعة">قطعة</SelectItem>
                  <SelectItem value="متر">متر</SelectItem>
                  <SelectItem value="كيلوجرام">كيلوجرام</SelectItem>
                  <SelectItem value="علبة">علبة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalStock">الرصيد الأصلي</Label>
              <Input
                id="originalStock"
                type="number"
                value={formData.originalStock}
                onChange={(e) => setFormData(prev => ({ ...prev, originalStock: e.target.value }))}
                placeholder="100"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reorderThreshold">حد الخطر</Label>
              <Input
                id="reorderThreshold"
                type="number"
                value={formData.reorderThreshold}
                onChange={(e) => setFormData(prev => ({ ...prev, reorderThreshold: e.target.value }))}
                placeholder="10"
                required
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              إضافة الصنف
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
