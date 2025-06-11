
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Clock, Users, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EventPlan {
  planId: string;
  branch: string;
  committee: string;
  task: string;
  volunteerCount: number;
  startTime: string;
  endTime: string;
  responsibilities: string;
  date: string;
}

export const EventPlanningForm = () => {
  const [formData, setFormData] = useState({
    task: '',
    volunteerCount: 1,
    startTime: '09:00',
    endTime: '17:00',
    responsibilities: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [eventPlans] = useState<EventPlan[]>([
    {
      planId: 'PLAN001',
      branch: 'مصدق',
      committee: 'عيني',
      task: 'توزيع ملابس',
      volunteerCount: 5,
      startTime: '09:00',
      endTime: '13:00',
      responsibilities: 'استقبال العائلات، توزيع الملابس، تسجيل البيانات',
      date: '2024-06-15'
    },
    {
      planId: 'PLAN002',
      branch: 'سلطان',
      committee: 'إطعام',
      task: 'إعداد وجبات',
      volunteerCount: 8,
      startTime: '08:00',
      endTime: '16:00',
      responsibilities: 'إعداد الوجبات، التغليف، التوزيع',
      date: '2024-06-15'
    }
  ]);

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.task || !formData.startTime || !formData.endTime) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم إضافة خطة النشاط",
      description: `تم تسجيل نشاط "${formData.task}" بنجاح`,
    });

    // Reset form
    setFormData({
      task: '',
      volunteerCount: 1,
      startTime: '09:00',
      endTime: '17:00',
      responsibilities: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Planning Form */}
      <Card>
        <CardHeader>
          <CardTitle>إضافة نشاط جديد</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="task">النشاط *</Label>
              <Input
                id="task"
                value={formData.task}
                onChange={(e) => handleInputChange('task', e.target.value)}
                placeholder="مثل: توزيع ملابس، تسجيل عائلات، إعداد وجبات"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">تاريخ النشاط *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startTime">وقت البداية *</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">وقت النهاية *</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="volunteerCount">عدد المتطوعين</Label>
              <Input
                id="volunteerCount"
                type="number"
                min="1"
                value={formData.volunteerCount}
                onChange={(e) => handleInputChange('volunteerCount', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="responsibilities">المهام والمسؤوليات</Label>
              <Textarea
                id="responsibilities"
                value={formData.responsibilities}
                onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                placeholder="وصف تفصيلي للمهام والمسؤوليات"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                إضافة النشاط
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Event Plans List */}
      <Card>
        <CardHeader>
          <CardTitle>أنشطة اليوم</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-right">الفرع</TableHead>
                  <TableHead className="text-right">اللجنة</TableHead>
                  <TableHead className="text-right">النشاط</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">التوقيت</TableHead>
                  <TableHead className="text-right">عدد المتطوعين</TableHead>
                  <TableHead className="text-right">المسؤوليات</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventPlans.map((plan) => (
                  <TableRow key={plan.planId} className="hover:bg-gray-50">
                    <TableCell>{plan.branch}</TableCell>
                    <TableCell>{plan.committee}</TableCell>
                    <TableCell className="font-medium">{plan.task}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{plan.date}</span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{plan.startTime} - {plan.endTime}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{plan.volunteerCount}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={plan.responsibilities}>
                        {plan.responsibilities}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {eventPlans.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              لا توجد أنشطة مجدولة اليوم
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
