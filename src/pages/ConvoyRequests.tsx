import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, Plus, FileText, Clock, CheckCircle, XCircle, Users, Package, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useConvoyManagement } from '@/hooks/useConvoyManagement';
import { ConvoyRequirementsForm } from '@/components/convoy/ConvoyRequirementsForm';
import { ConvoyDetailsView } from '@/components/convoy/ConvoyDetailsView';
import { AdminRequirementsView } from '@/components/convoy/AdminRequirementsView';

const ConvoyRequests = () => {
  const { user, userRole } = useAuth();
  const { convoys, requirements, addRequirement, approveRequirement, rejectRequirement } = useConvoyManagement();
  const [selectedConvoy, setSelectedConvoy] = useState<string | null>(null);

  const isAdmin = userRole === 'مدير المخزن';
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planning':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Calendar className="w-3 h-3 ml-1" />قيد التخطيط</Badge>;
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><Clock className="w-3 h-3 ml-1" />نشط</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800"><CheckCircle className="w-3 h-3 ml-1" />مكتمل</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 ml-1" />ملغي</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getConvoyRequirements = (convoyId: string) => {
    return requirements.filter(req => req.convoyId === convoyId);
  };

  const selectedConvoyData = selectedConvoy ? convoys.find(c => c.id === selectedConvoy) : null;
  const selectedConvoyRequirements = selectedConvoy ? getConvoyRequirements(selectedConvoy) : [];

  const pendingRequestsCount = requirements.filter(req => req.status === 'pending').length;
  const activeConvoysCount = convoys.filter(convoy => convoy.status === 'active').length;
  const totalConvoysCount = convoys.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة القوافل والمساعدات</h1>
            <p className="text-gray-600 mt-1">
              مرحباً {user?.name} - {isAdmin ? 'مدير المخزن' : `لجنة ${user?.committee}`}
            </p>
          </div>
          {isAdmin && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 ml-2" />
              قافلة جديدة
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">إجمالي القوافل</CardTitle>
              <Truck className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConvoysCount}</div>
              <p className="text-xs text-gray-500 mt-1">قافلة مسجلة</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">قوافل نشطة</CardTitle>
              <Clock className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeConvoysCount}</div>
              <p className="text-xs text-gray-500 mt-1">في الطريق</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">طلبات معلقة</CardTitle>
              <FileText className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequestsCount}</div>
              <p className="text-xs text-gray-500 mt-1">تحتاج مراجعة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">العائلات المسجلة</CardTitle>
              <Users className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-gray-500 mt-1">عائلة مستفيدة</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="convoys" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border rounded-lg p-1">
            <TabsTrigger value="convoys">القوافل</TabsTrigger>
            <TabsTrigger value="requirements">الاحتياجات</TabsTrigger>
            {isAdmin && <TabsTrigger value="approvals">الموافقات</TabsTrigger>}
          </TabsList>

          <TabsContent value="convoys" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Convoys List */}
              <Card>
                <CardHeader>
                  <CardTitle>قائمة القوافل</CardTitle>
                  <CardDescription>جميع القوافل المسجلة في النظام</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {convoys.map((convoy) => (
                      <div
                        key={convoy.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedConvoy === convoy.id ? 'border-blue-500 bg-blue-50' : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedConvoy(convoy.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{convoy.name}</h3>
                          {getStatusBadge(convoy.status)}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><span className="font-medium">التاريخ:</span> {convoy.date}</p>
                          <p><span className="font-medium">الموقع:</span> {convoy.location}</p>
                          <p><span className="font-medium">الاحتياجات:</span> {getConvoyRequirements(convoy.id).length} طلب</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Selected Convoy Details */}
              <div>
                {selectedConvoyData ? (
                  <ConvoyDetailsView
                    convoy={selectedConvoyData}
                    requirements={selectedConvoyRequirements}
                  />
                ) : (
                  <Card className="h-full flex items-center justify-center">
                    <CardContent>
                      <div className="text-center text-gray-500">
                        اختر قافلة لعرض التفاصيل
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="mt-6">
            <div className="space-y-6">
              {!isAdmin && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">إرسال طلب احتياجات</h3>
                  {convoys.filter(c => c.status === 'planning' || c.status === 'active').map((convoy) => (
                    <div key={convoy.id} className="mb-6">
                      <ConvoyRequirementsForm
                        convoyId={convoy.id}
                        convoyName={convoy.name}
                        onSubmit={addRequirement}
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* All Requirements Table */}
              <Card>
                <CardHeader>
                  <CardTitle>جميع الطلبات</CardTitle>
                  <CardDescription>
                    {isAdmin ? 'جميع طلبات الاحتياجات من اللجان' : 'طلباتك المرسلة'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminRequirementsView
                    requirements={isAdmin ? requirements : requirements.filter(req => req.requestedBy === user?.name)}
                    onApprove={approveRequirement}
                    onReject={rejectRequirement}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {isAdmin && (
            <TabsContent value="approvals" className="mt-6">
              <AdminRequirementsView
                requirements={requirements}
                onApprove={approveRequirement}
                onReject={rejectRequirement}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default ConvoyRequests;
