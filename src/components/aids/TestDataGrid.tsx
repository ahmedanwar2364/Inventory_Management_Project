import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactDataGrid = require('react-data-grid');

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'name', name: 'Name' }
];
const rows = [
  { id: 1, name: 'Test' }
];

export default function TestDataGrid() {
  return <ReactDataGrid columns={columns} rowGetter={i => rows[i]} rowsCount={rows.length} minHeight={150} />;
} 