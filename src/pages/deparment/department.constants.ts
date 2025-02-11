/*
 * Modelos & Columnas del Data Table
 */
import type { QTableProps } from 'quasar'

// Columnas del Data Table
export const columns: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'center',
    sortable: true,
    classes: 'trunc-text max-col-width',
  },
  {
    name: 'createdAt',
    label: 'Created At',
    field: 'createdAt',
    align: 'center',
    classes: 'trunc-text max-col-width',
    sortable: true,
  },
  {
    name: 'updatedAt',
    label: 'Updated At',
    field: 'updatedAt',
    align: 'center',
    classes: 'trunc-text max-col-width',
    sortable: true,
  },
  {
    name: 'key',
    label: 'Key',
    field: 'key',
    align: 'center',
    classes: 'trunc-text max-col-width',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'center',
    classes: 'trunc-text max-col-width',
    sortable: true,
  },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'center',
    classes: 'trunc-text max-col-width',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center',
    classes: 'trunc-text max-col-width',
  },
]
