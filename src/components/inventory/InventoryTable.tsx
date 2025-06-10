import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Edit } from 'lucide-react';
import { useInventoryData, InventoryItem } from '@/hooks/useInventoryData';
import { ItemDetailsDialog } from './ItemDetailsDialog';
import { EditItemDialog } from './EditItemDialog';

export const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const { items, isLoading } = useInventoryData();

  const filteredItems = items.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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

  const handleViewDetails = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditItem(item);
    setShowEdit(true);
  };

  if (isLoading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <>
      <div className="space-y-4" dir="rtl">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في الأصناف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="التصنيف" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع التصنيفات</SelectItem>
              <SelectItem value="قرطاسية">قرطاسية</SelectItem>
              <SelectItem value="عدة">عدة</SelectItem>
              <SelectItem value="مستهلكات">مستهلكات</SelectItem>
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
                <TableHead className="text-right">المسحوب</TableHead>
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
                  <TableCell className="text-center font-semibold">
                    {item.currentStock} {item.unit}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.outsideStoreroom} {item.unit}
                  </TableCell>
                  <TableCell className="text-center text-red-600">
                    {item.reorderThreshold} {item.unit}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(item.currentStock, item.reorderThreshold)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(item)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditItem(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
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

      <ItemDetailsDialog
        item={selectedItem}
        open={showDetails}
        onOpenChange={setShowDetails}
      />

      <EditItemDialog
        item={editItem}
        open={showEdit}
        onOpenChange={setShowEdit}
      />
    </>
  );
};
