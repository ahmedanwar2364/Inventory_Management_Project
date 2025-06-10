
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Edit, AlertTriangle } from 'lucide-react';
import { useInventoryData } from '@/hooks/useInventoryData';

export const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { items, isLoading } = useInventoryData();

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

  const filteredItems = items.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'low' && item.currentStock <= item.reorderThreshold) ||
                         (statusFilter === 'available' && item.currentStock > item.reorderThreshold) ||
                         (statusFilter === 'out' && item.currentStock === 0);
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (isLoading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث عن صنف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="حالة المخزون" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="available">متوفر</SelectItem>
            <SelectItem value="low">منخفض</SelectItem>
            <SelectItem value="out">نفذ</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="التصنيف" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع التصنيفات</SelectItem>
            <SelectItem value="عدة">عدة</SelectItem>
            <SelectItem value="مستهلكات">مستهلكات</SelectItem>
            <SelectItem value="قرطاسية">قرطاسية</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-right">كود الصنف</TableHead>
              <TableHead className="text-right">اسم الصنف</TableHead>
              <TableHead className="text-right">المخزن</TableHead>
              <TableHead className="text-right">اللجنة</TableHead>
              <TableHead className="text-right">التصنيف</TableHead>
              <TableHead className="text-right">الرصيد الحالي</TableHead>
              <TableHead className="text-right">حد الخطر</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.itemCode} className="hover:bg-gray-50">
                <TableCell className="font-mono text-sm">{item.itemCode}</TableCell>
                <TableCell className="font-medium">{item.itemName}</TableCell>
                <TableCell>{item.storeroom}</TableCell>
                <TableCell>{item.team}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    {item.currentStock <= item.reorderThreshold && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="font-semibold">{item.currentStock}</span>
                    <span className="text-gray-500 text-sm">{item.unit}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{item.reorderThreshold}</TableCell>
                <TableCell>
                  {getStatusBadge(item.currentStock, item.reorderThreshold)}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          لا توجد أصناف تطابق معايير البحث
        </div>
      )}
    </div>
  );
};
