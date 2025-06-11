
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Family {
  familyCode: string;
  area: string;
  guide: string;
  name: string;
  nationalId: string;
  phone: string;
  familySize: number;
  aidType: string;
  committee: string;
}

export const FamilyRegistrationForm = () => {
  const [formData, setFormData] = useState({
    area: '',
    guide: '',
    name: '',
    nationalId: '',
    phone: '',
    familySize: 1,
    aidType: ''
  });
  
  const [families] = useState<Family[]>([
    {
      familyCode: 'FAM001',
      area: 'المنطقة الشمالية',
      guide: 'أحمد محمد',
      name: 'عائلة السالم',
      nationalId: '1234567890',
      phone: '0501234567',
      familySize: 5,
      aidType: 'غسالة',
      committee: 'عيني'
    },
    {
      familyCode: 'FAM002',
      area: 'المنطقة الجنوبية',
      guide: 'فاطمة أحمد',
      name: 'عائلة الزهراني',
      nationalId: '9876543210',
      phone: '0507654321',
      familySize: 7,
      aidType: 'وجبات',
      committee: 'إطعام'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
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
    if (!formData.name || !formData.nationalId || !formData.phone) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate national ID
    const isDuplicate = families.some(family => family.nationalId === formData.nationalId);
    if (isDuplicate) {
      toast({
        title: "هوية مكررة",
        description: "رقم الهوية الوطنية مسجل مسبقاً",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم تسجيل العائلة بنجاح",
      description: `تم إضافة عائلة ${formData.name} إلى قاعدة البيانات`,
    });

    // Reset form
    setFormData({
      area: '',
      guide: '',
      name: '',
      nationalId: '',
      phone: '',
      familySize: 1,
      aidType: ''
    });
  };

  const filteredFamilies = families.filter(family =>
    family.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    family.nationalId.includes(searchTerm) ||
    family.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            تسجيل عائلة جديدة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area">المنطقة *</Label>
              <Input
                id="area"
                value={formData.area}
                onChange={(e) => handleInputChange('area', e.target.value)}
                placeholder="مثل: المنطقة الشمالية"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guide">المرشد *</Label>
              <Input
                id="guide"
                value={formData.guide}
                onChange={(e) => handleInputChange('guide', e.target.value)}
                placeholder="اسم المرشد"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">اسم العائلة *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="اسم رب الأسرة أو العائلة"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationalId">رقم الهوية الوطنية *</Label>
              <Input
                id="nationalId"
                value={formData.nationalId}
                onChange={(e) => handleInputChange('nationalId', e.target.value)}
                placeholder="1234567890"
                maxLength={10}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الجوال *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="05xxxxxxxx"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="familySize">عدد أفراد الأسرة</Label>
              <Input
                id="familySize"
                type="number"
                min="1"
                value={formData.familySize}
                onChange={(e) => handleInputChange('familySize', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="aidType">نوع المساعدة المطلوبة</Label>
              <Select value={formData.aidType} onValueChange={(value) => handleInputChange('aidType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع المساعدة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="غسالة">غسالة</SelectItem>
                  <SelectItem value="ثلاجة">ثلاجة</SelectItem>
                  <SelectItem value="وجبات">وجبات</SelectItem>
                  <SelectItem value="ملابس">ملابس</SelectItem>
                  <SelectItem value="أجهزة كهربائية">أجهزة كهربائية</SelectItem>
                  <SelectItem value="أثاث">أثاث</SelectItem>
                  <SelectItem value="مواد غذائية">مواد غذائية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                تسجيل العائلة
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Families List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>العائلات المسجلة</CardTitle>
            <div className="relative w-72">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في العائلات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-right">كود العائلة</TableHead>
                  <TableHead className="text-right">اسم العائلة</TableHead>
                  <TableHead className="text-right">المنطقة</TableHead>
                  <TableHead className="text-right">المرشد</TableHead>
                  <TableHead className="text-right">رقم الهوية</TableHead>
                  <TableHead className="text-right">الجوال</TableHead>
                  <TableHead className="text-right">عدد الأفراد</TableHead>
                  <TableHead className="text-right">نوع المساعدة</TableHead>
                  <TableHead className="text-right">اللجنة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFamilies.map((family) => (
                  <TableRow key={family.familyCode} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-sm">{family.familyCode}</TableCell>
                    <TableCell className="font-medium">{family.name}</TableCell>
                    <TableCell>{family.area}</TableCell>
                    <TableCell>{family.guide}</TableCell>
                    <TableCell className="font-mono">{family.nationalId}</TableCell>
                    <TableCell className="font-mono">{family.phone}</TableCell>
                    <TableCell className="text-center">{family.familySize}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{family.aidType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">{family.committee}</Badge>
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
        </CardContent>
      </Card>
    </div>
  );
};
