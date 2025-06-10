
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTransactionHistory } from '@/hooks/useTransactionHistory';

export const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const { transactions, isLoading } = useTransactionHistory();

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const getTypeBadge = (type: string) => {
    return type === 'تسليم' 
      ? <Badge variant="destructive">تسليم</Badge>
      : <Badge className="bg-green-500">استلام</Badge>;
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.teamLeader.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesTeam = teamFilter === 'all' || transaction.team === teamFilter;
    
    return matchesSearch && matchesType && matchesTeam;
  });

  if (isLoading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-4" dir="rtl">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في العمليات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="نوع العملية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع العمليات</SelectItem>
            <SelectItem value="تسليم">تسليم</SelectItem>
            <SelectItem value="استلام">استلام</SelectItem>
          </SelectContent>
        </Select>
        <Select value={teamFilter} onValueChange={setTeamFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="اللجنة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع اللجان</SelectItem>
            <SelectItem value="عيني">عيني</SelectItem>
            <SelectItem value="إعلامي">إعلامي</SelectItem>
            <SelectItem value="مجددون">مجددون</SelectItem>
            <SelectItem value="نسائي">نسائي</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 ml-2" />
          تصدير
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-right">كود العملية</TableHead>
              <TableHead className="text-right">النوع</TableHead>
              <TableHead className="text-right">كود الصنف</TableHead>
              <TableHead className="text-right">اسم الصنف</TableHead>
              <TableHead className="text-right">الكمية</TableHead>
              <TableHead className="text-right">اللجنة</TableHead>
              <TableHead className="text-right">مسؤول اللجنة</TableHead>
              <TableHead className="text-right">المخزن</TableHead>
              <TableHead className="text-right">التاريخ</TableHead>
              <TableHead className="text-right">الوقت</TableHead>
              <TableHead className="text-right">مسؤول المخزن</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => {
              const { date, time } = formatDateTime(transaction.dateTime);
              return (
                <TableRow key={transaction.transactionId} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{transaction.transactionId}</TableCell>
                  <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                  <TableCell className="font-mono text-sm">{transaction.itemCode}</TableCell>
                  <TableCell className="font-medium">{transaction.itemName}</TableCell>
                  <TableCell className="text-center font-semibold">{transaction.quantity}</TableCell>
                  <TableCell>{transaction.team}</TableCell>
                  <TableCell>{transaction.teamLeader}</TableCell>
                  <TableCell>{transaction.storeroom}</TableCell>
                  <TableCell className="font-mono text-sm">{date}</TableCell>
                  <TableCell className="font-mono text-sm">{time}</TableCell>
                  <TableCell className="text-sm text-gray-600">{transaction.manager}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          لا توجد عمليات تطابق معايير البحث
        </div>
      )}
    </div>
  );
};
