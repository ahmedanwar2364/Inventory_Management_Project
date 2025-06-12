
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Package } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { priorityLevels } from '@/types/convoy';
import { useToast } from '@/hooks/use-toast';

interface ConvoyRequirementsFormProps {
  convoyId: string;
  convoyName: string;
  onSubmit: (requirement: any) => void;
}

export const ConvoyRequirementsForm: React.FC<ConvoyRequirementsFormProps> = ({
  convoyId,
  convoyName,
  onSubmit
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    itemType: '',
    quantity: 1,
    priority: 'medium',
    description: ''
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.itemType || formData.quantity <= 0) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      convoyId,
      committee: user?.committee || 'عام',
      requestedBy: user?.name || 'مجهول',
      ...formData
    });

    // Reset form
    setFormData({
      itemType: '',
      quantity: 1,
      priority: 'medium',
      description: ''
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          طلب احتياجات للقافلة: {convoyName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemType">نوع الصنف *</Label>
              <Input
                id="itemType"
                value={formData.itemType}
                onChange={(e) => handleInputChange('itemType', e.target.value)}
                placeholder="مثل: ملابس، أطعمة، أدوية"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">الكمية المطلوبة *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">الأولوية</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">منخفضة</SelectItem>
                  <SelectItem value="medium">متوسطة</SelectItem>
                  <SelectItem value="high">عالية</SelectItem>
                  <SelectItem value="urgent">عاجلة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">وصف تفصيلي</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="تفاصيل إضافية عن الاحتياج"
                rows={3}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            إرسال طلب الاحتياج
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
