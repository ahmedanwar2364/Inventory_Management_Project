
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar, ArrowUpRight, ArrowDownLeft, Package } from 'lucide-react';
import { useTransactionHistory } from '@/hooks/useTransactionHistory';

export const TransactionHistory = () => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const { transactions, isLoading } = useTransactionHistory();

  const getTransactionIcon = (type: string) => {
    return type === 'تسليم' ? (
      <ArrowUpRight className="w-4 h-4 text-red-500" />
    ) : (
      <ArrowDownLeft className="w-4 h-4 text-green-500" />
    );
  };

  const getTransactionBadge = (type: string) => {
    return type === 'تسليم' ? (
      <Badge variant="destructive" className="flex items-center gap-1">
        <ArrowUpRight className="w-3 h-3" />
        تسليم
      </Badge>
    ) : (
      <Badge className="bg-green-500 flex items-center gap-1">
        <ArrowDownLeft className="w-3 h-3" />
        استلام
      </Badge>
    );
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchesType;
  });

  if (isLoading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              إجمالي العمليات اليوم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {transactions.filter(t => 
                new Date(t.dateTime).toDateString() === new Date().toDateString()
              ).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              عمليات التسليم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {transactions.filter(t => t.type === 'تسليم').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              عمليات الاستلام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {transactions.filter(t => t.type === 'استلام').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
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
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="فترة زمنية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الفترات</SelectItem>
            <SelectItem value="today">اليوم</SelectItem>
            <SelectItem value="week">هذا الأسبوع</SelectItem>
            <SelectItem value="month">هذا الشهر</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-right">كود العملية</TableHead>
              <TableHead className="text-right">نوع العملية</TableHead>
              <TableHead className="text-right">المخزن</TableHead>
              <TableHead className="text-right">اللجنة</TableHead>
              <TableHead className="text-right">كود الصنف</TableHead>
              <TableHead className="text-right">اسم الصنف</TableHead>
              <TableHead className="text-right">الكمية</TableHead>
              <TableHead className="text-right">مسؤول المخزن</TableHead>
              <TableHead className="text-right">التاريخ والوقت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.transactionId} className="hover:bg-gray-50">
                <TableCell className="font-mono text-sm">{transaction.transactionId}</TableCell>
                <TableCell>
                  {getTransactionBadge(transaction.type)}
                </TableCell>
                <TableCell>{transaction.storeroom}</TableCell>
                <TableCell>{transaction.team}</TableCell>
                <TableCell className="font-mono text-sm">{transaction.itemCode}</TableCell>
                <TableCell>{transaction.itemName}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    {getTransactionIcon(transaction.type)}
                    <span className="font-semibold">{transaction.quantity}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{transaction.manager}</TableCell>
                <TableCell className="text-sm text-gray-600">
                  {new Date(transaction.dateTime).toLocaleDateString('ar-SA')} {' '}
                  {new Date(transaction.dateTime).toLocaleTimeString('ar-SA', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredTransactions.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عمليات</h3>
            <p className="text-gray-500">لم يتم العثور على عمليات تطابق المعايير المحددة</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
