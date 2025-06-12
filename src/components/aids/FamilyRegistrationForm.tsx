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

      {/* Families List - Sheet Style Table */}
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
        <CardContent className="p-0">
          <div className="overflow-auto max-h-[600px]">
            <table className="w-full border-collapse border border-gray-200 bg-white">
              <thead className="sticky top-0 bg-gray-50 z-10">
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[100px]">
                    كود العائلة
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[150px]">
                    اسم العائلة
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[120px]">
                    المنطقة
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[100px]">
                    المرشد
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[120px]">
                    رقم الهوية
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[110px]">
                    الجوال
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-center min-w-[80px]">
                    عدد الأفراد
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[120px]">
                    نوع المساعدة
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-right min-w-[100px]">
                    اللجنة
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 text-center min-w-[120px]">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredFamilies.map((family, index) => (
                  <tr key={family.familyCode} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                    <td className="border border-gray-300 px-3 py-2 text-sm font-mono text-blue-600">
                      {family.familyCode}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm font-medium">
                      {family.name}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {family.area}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {family.guide}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm font-mono">
                      {family.nationalId}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm font-mono">
                      {family.phone}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm text-center font-medium">
                      {family.familySize}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                        {family.aidType}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {family.committee}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <div className="flex gap-1 justify-center">
                        <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-red-600 hover:bg-red-50">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Summary Row */}
          <div className="border-t border-gray-300 bg-gray-50 px-4 py-3">
            <div className="text-sm text-gray-600">
              إجمالي العائلات: <span className="font-semibold">{filteredFamilies.length}</span> عائلة
              {searchTerm && (
                <span className="mr-4">
                  نتائج البحث: <span className="font-semibold">{filteredFamilies.length}</span>
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
