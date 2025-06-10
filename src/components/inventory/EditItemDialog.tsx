
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { InventoryItem, useInventoryData } from '@/hooks/useInventoryData';
import { useToast } from '@/hooks/use-toast';

interface EditItemDialogProps {
  item: InventoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditItemDialog = ({ item, open, onOpenChange }: EditItemDialogProps) => {
  const { updateItem } = useInventoryData();
  const { toast } = useToast();
  
  const { register, handleSubmit, setValue, watch, reset } = useForm<InventoryItem>({
    defaultValues: item || undefined
  });

  React.useEffect(() => {
    if (item) {
      reset(item);
    }
  }, [item, reset]);

  const onSubmit = async (data: InventoryItem) => {
    if (!item) return;
    
    try {
      await updateItem(item.itemCode, data);
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث بيانات الصنف بنجاح",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث بيانات الصنف",
        variant: "destructive",
      });
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">تعديل الصنف: {item.itemName}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Item Code - Read Only */}
            <div>
              <Label htmlFor="itemCode">كود الصنف</Label>
              <Input
                id="itemCode"
                {...register('itemCode')}
                readOnly
                className="bg-gray-100"
              />
            </div>

            {/* Item Name */}
            <div>
              <Label htmlFor="itemName">اسم الصنف</Label>
              <Input
                id="itemName"
                {...register('itemName', { required: true })}
                placeholder="أدخل اسم الصنف"
              />
            </div>

            {/* Storeroom */}
            <div>
              <Label htmlFor="storeroom">المخزن</Label>
              <Select value={watch('storeroom')} onValueChange={(value) => setValue('storeroom', value)}>
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

            {/* Team */}
            <div>
              <Label htmlFor="team">اللجنة</Label>
              <Select value={watch('team')} onValueChange={(value) => setValue('team', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر اللجنة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عيني">عيني</SelectItem>
                  <SelectItem value="إعلامي">إعلامي</SelectItem>
                  <SelectItem value="مجددون">مجددون</SelectItem>
                  <SelectItem value="نسائي">نسائي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">التصنيف</Label>
              <Select value={watch('category')} onValueChange={(value) => setValue('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="قرطاسية">قرطاسية</SelectItem>
                  <SelectItem value="عدة">عدة</SelectItem>
                  <SelectItem value="مستهلكات">مستهلكات</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div>
              <Label htmlFor="status">الحالة</Label>
              <Select value={watch('status')} onValueChange={(value) => setValue('status', value)}>
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

            {/* Unit */}
            <div>
              <Label htmlFor="unit">وحدة القياس</Label>
              <Select value={watch('unit')} onValueChange={(value) => setValue('unit', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر وحدة القياس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="قطعة">قطعة</SelectItem>
                  <SelectItem value="علبة">علبة</SelectItem>
                  <SelectItem value="متر">متر</SelectItem>
                  <SelectItem value="كيلو">كيلو</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Original Stock */}
            <div>
              <Label htmlFor="originalStock">الرصيد الأصلي</Label>
              <Input
                id="originalStock"
                type="number"
                {...register('originalStock', { required: true, min: 0 })}
                placeholder="0"
              />
            </div>

            {/* Reorder Threshold */}
            <div>
              <Label htmlFor="reorderThreshold">حد الخطر</Label>
              <Input
                id="reorderThreshold"
                type="number"
                {...register('reorderThreshold', { required: true, min: 0 })}
                placeholder="0"
              />
            </div>

            {/* Current Stock */}
            <div>
              <Label htmlFor="currentStock">الرصيد الحالي</Label>
              <Input
                id="currentStock"
                type="number"
                {...register('currentStock', { required: true, min: 0 })}
                placeholder="0"
              />
            </div>

            {/* Outside Storeroom */}
            <div>
              <Label htmlFor="outsideStoreroom">المسحوب</Label>
              <Input
                id="outsideStoreroom"
                type="number"
                {...register('outsideStoreroom', { required: true, min: 0 })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit">
              حفظ التغييرات
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
