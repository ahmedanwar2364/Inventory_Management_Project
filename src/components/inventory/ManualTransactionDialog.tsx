
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { InventoryItem } from '@/hooks/useInventoryData';

interface ManualTransactionDialogProps {
  item: InventoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualTransactionDialog = ({ item, open, onOpenChange }: ManualTransactionDialogProps) => {
  const [transactionType, setTransactionType] = useState<'سحب' | 'استلام' | ''>('');
  const [quantity, setQuantity] = useState('');
  const [team, setTeam] = useState('');
  const [teamLeader, setTeamLeader] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!item || !transactionType || !quantity || !team || !teamLeader) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "تم بنجاح",
      description: `تم تسجيل عملية ${transactionType} للصنف ${item.itemName}`,
    });

    // Reset form
    setTransactionType('');
    setQuantity('');
    setTeam('');
    setTeamLeader('');
    setNotes('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>عملية سحب/استلام يدوية</DialogTitle>
        </DialogHeader>

        {item && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Item Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">معلومات الصنف</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">كود الصنف: </span>
                  <span className="font-mono">{item.itemCode}</span>
                </div>
                <div>
                  <span className="text-gray-600">اسم الصنف: </span>
                  <span>{item.itemName}</span>
                </div>
                <div>
                  <span className="text-gray-600">الرصيد الحالي: </span>
                  <span className="font-semibold">{item.currentStock} {item.unit}</span>
                </div>
                <div>
                  <span className="text-gray-600">المسحوب: </span>
                  <span>{item.outsideStoreroom} {item.unit}</span>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="transactionType">نوع العملية *</Label>
                <Select value={transactionType} onValueChange={(value: 'سحب' | 'استلام') => setTransactionType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع العملية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="سحب">سحب</SelectItem>
                    <SelectItem value="استلام">استلام</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">الكمية *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="أدخل الكمية"
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="team">اللجنة *</Label>
                <Select value={team} onValueChange={setTeam}>
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

              <div>
                <Label htmlFor="teamLeader">مسؤول اللجنة *</Label>
                <Input
                  id="teamLeader"
                  value={teamLeader}
                  onChange={(e) => setTeamLeader(e.target.value)}
                  placeholder="اسم مسؤول اللجنة"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">ملاحظات</Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ملاحظات إضافية (اختياري)"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                إلغاء
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                تأكيد العملية
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
