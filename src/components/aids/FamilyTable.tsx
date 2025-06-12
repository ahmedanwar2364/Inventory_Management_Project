import React from 'react';
import DataGrid, { textEditor, RenderEditCellProps, PasteEvent } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Family } from '@/types/family';

const committeeOptions = [
  'عيني',
  'إطعام',
  'إعلامي',
  'مجددون',
  'نسائي',
];
const areaOptions = [
  'المنطقة الشمالية',
  'المنطقة الجنوبية',
  'المنطقة الشرقية',
  'المنطقة الغربية',
  'المنطقة الوسطى',
];
const statusOptions = [
  'نشطة',
  'معلقة',
  'مكتملة',
];

function SelectEditor<T extends string>({ row, column, onRowChange, onClose, options }: RenderEditCellProps<Family> & { options: T[] }) {
  return (
    <select
      autoFocus
      className="w-full h-full px-2 py-1 border rounded"
      value={row[column.key as keyof Family] as string}
      onChange={e => onRowChange({ ...row, [column.key]: e.target.value }, true)}
      onBlur={() => onClose(true)}
    >
      <option value=""></option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

interface FamilyTableProps {
  families: Family[];
  setFamilies: (families: Family[]) => void;
  onDeleteRow: (index: number) => void;
}

export const FamilyTable: React.FC<FamilyTableProps> = ({ families, setFamilies, onDeleteRow }) => {
  const handleRowsChange = (rows: Family[]) => {
    setFamilies(rows);
  };

  // DataGrid onPaste handler – called for each cell in a clipboard block
  const handlePaste = React.useCallback((args: PasteEvent<Family>) => {
    const { targetRow, targetColumnKey, sourceRow, sourceColumnKey } = args;
    return {
      ...targetRow,
      [targetColumnKey]: sourceRow[sourceColumnKey as keyof Family] as never
    } as Family;
  }, []);

  const columns = React.useMemo(() => [
    {
      key: 'familyCode',
      name: 'كود العائلة',
      renderEditCell: textEditor
    },
    {
      key: 'name',
      name: 'اسم العائلة',
      renderEditCell: textEditor
    },
    {
      key: 'area',
      name: 'المنطقة',
      renderEditCell: (props: RenderEditCellProps<Family>) => <SelectEditor {...props} options={areaOptions} />
    },
    {
      key: 'guide',
      name: 'المرشد',
      renderEditCell: textEditor
    },
    {
      key: 'nationalId',
      name: 'رقم الهوية',
      renderEditCell: textEditor
    },
    {
      key: 'phone',
      name: 'الجوال',
      renderEditCell: textEditor
    },
    {
      key: 'familySize',
      name: 'عدد الأفراد',
      renderEditCell: textEditor
    },
    {
      key: 'aidType',
      name: 'نوع المساعدة',
      renderEditCell: textEditor
    },
    {
      key: 'committee',
      name: 'اللجنة',
      renderEditCell: (props: RenderEditCellProps<Family>) => <SelectEditor {...props} options={committeeOptions} />
    },
    {
      key: 'status',
      name: 'الحالة',
      renderEditCell: (props: RenderEditCellProps<Family>) => <SelectEditor {...props} options={statusOptions} />
    },
    {
      key: 'delete',
      name: 'حذف',
      width: 60,
      renderCell: ({ rowIdx }: { rowIdx: number }) => (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
          onClick={() => onDeleteRow(rowIdx)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
      )
    }
  ], [onDeleteRow]);

  return (
    <div dir="rtl" style={{ background: 'white', borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
      <DataGrid
        columns={columns}
        rows={families}
        onRowsChange={handleRowsChange}
        onPaste={handlePaste}
        className="rdg-light"
        style={{ minHeight: 400 }}
        direction="rtl"
      />
    </div>
  );
};
