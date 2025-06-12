import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFamilyManagement } from '@/hooks/useFamilyManagement';
import { FamilyTable } from '@/components/aids/FamilyTable';

const FamiliesManagement: React.FC = () => {
  const { user, userRole } = useAuth();
  const isAdmin = userRole === 'مدير المخزن';

  const {
    families,
    setFamilies,
    addNewRow,
    deleteRow
  } = useFamilyManagement();

  // Filter families by committee if not admin
  const visibleFamilies = React.useMemo(() => {
    if (isAdmin) return families;
    return families.filter(f => f.committee === user?.committee);
  }, [families, isAdmin, user]);

  const handleRowsChange = (rows: any[]) => {
    // Merge changes back to full families state respecting filter
    if (isAdmin) {
      setFamilies(rows);
    } else {
      // Map through original families and replace only rows that belong to committee
      const updated = families.map((fam) => {
        if (fam.committee !== user?.committee) return fam;
        const replacement = rows.find(r => r.familyCode === fam.familyCode);
        return replacement ?? fam;
      });
      setFamilies(updated);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={addNewRow} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 ml-2" /> صف جديد
        </Button>
      </div>
      <FamilyTable
        families={visibleFamilies}
        setFamilies={handleRowsChange}
        onDeleteRow={deleteRow}
      />
    </div>
  );
};

export default FamiliesManagement; 