import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridValidRowModel
} from "@mui/x-data-grid"

export interface ItemDataTableProps {
  data: GridValidRowModel[]
  columns: GridColDef[]
}

const ItemDataTable: React.FC<ItemDataTableProps> = ({ data, columns }) => {
  return (
    <DataGrid
      disableColumnSelector
      disableRowSelectionOnClick
      getRowHeight={() => "auto"}
      pagination
      rows={data}
      columns={columns}
      getRowId={(row: any) => row.id}
      sx={{
        [`& .${gridClasses.cell}`]: {
          py: 1
        }
      }}
    />
  )
}

export default ItemDataTable
