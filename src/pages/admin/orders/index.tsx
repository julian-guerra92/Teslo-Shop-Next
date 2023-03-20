
import useSWR from 'swr';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { IOrder, IUser } from '../../../interfaces';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'Order ID', width: 250 },
   { field: 'email', headerName: 'Email', width: 250 },
   { field: 'fullName', headerName: 'Full Name', width: 250 },
   { field: 'total', headerName: 'Total Value', width: 150 },
   {
      field: 'isPaid',
      headerName: 'Paid',
      align: 'center',
      renderCell: ({ row }: GridRenderCellParams) => {
         return row.isPaid
            ? (<Chip variant='outlined' label='Paid' color='success' />)
            : (<Chip variant='outlined' label='Pending' color='error' />)
      }
   },
   { field: 'noProducts', headerName: 'No. Products', align: 'center', width: 120 },
   {
      field: 'check',
      headerName: 'View Order',
      width: 120,
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <a href={`/admin/orders/${row.id}`} target='_blank' rel="noreferrer" >
               View Order
            </a>
         )
      }
   },
   { field: 'createdAt', headerName: 'Created at', width: 220 },
]

const OrdersPage = () => {

   const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

   if (!data && !error) return <></>;

   if (error) {
      console.log(error);
      return <Typography>Error Loading Information</Typography>
   }

   const rows = data!.map(order => ({
      id: order._id,
      email: (order.user as IUser).email,
      fullName: (order.user as IUser).firstName + ' ' + (order.user as IUser).lastName,
      total: order.summaryOrder.total,
      isPaid: order.isPaid,
      noProducts: order.summaryOrder.numberOfItems,
      createdAt: order.createdAt
   }))

   return (
      <AdminLayout
         title={'Orders'}
         subTitle={'Orders Maintenance'}
         icon={<ConfirmationNumberOutlined />}
      >
         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
               />
            </Grid>
         </Grid>
      </AdminLayout>
   )
}

export default OrdersPage;