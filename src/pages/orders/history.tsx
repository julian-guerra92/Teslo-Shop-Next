
import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 100 },
   { field: 'fullname', headerName: 'Full Name', width: 300 },
   {
      field: 'paid',
      headerName: 'Paid',
      description: 'Displays information about the payment status of the order',
      width: 200,
      renderCell: (params) => {
         return (
            params.value
               ? <Chip color='success' label='Paid' variant='outlined' />
               : <Chip color='error' label='Pending Payment' variant='outlined' />
         )
      }
   },
   {
      field: 'order',
      headerName: 'View Order Detail',
      width: 200,
      sortable: false,
      renderCell: (params) => {
         return (
            <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
               <Link underline='always'>
                  View Order
               </Link>
            </NextLink>
         )
      }
   },
]

const rows = [
   { id: 1, paid: true, fullname: 'Julián Rodríguez' },
   { id: 2, paid: false, fullname: 'Margarita Arboleda' },
   { id: 3, paid: true, fullname: 'Miguel Rodríguez' },
   { id: 4, paid: false, fullname: 'Jhon Rodríguez' },
   { id: 5, paid: true, fullname: 'Sara Rodríguez' }
]

const HistoryPage = () => {
   return (
      <ShopLayout title='Order History' pageDescription='Customer order history'>

         <Typography variant='h1' component='h1'>Order History</Typography>

         <Grid container>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
               />
            </Grid>
         </Grid>

      </ShopLayout>
   )
}

export default HistoryPage;