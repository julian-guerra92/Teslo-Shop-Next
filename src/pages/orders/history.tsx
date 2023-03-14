
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces/order';

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
            <NextLink href={`/orders/${params.row.orderId}`} passHref legacyBehavior>
               <Link underline='always'>
                  View Order
               </Link>
            </NextLink>
         )
      }
   },
]

interface Props {
   orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

   const rows = orders.map((order, index) => ({
      id: index + 1,
      paid: order.isPaid,
      fullname: order.shippingAdrress.firstName + ' ' + order.shippingAdrress.lastName,
      orderId: order._id
   }))

   return (
      <ShopLayout title='Order History' pageDescription='Customer order history'>
         <Typography variant='h1' component='h1'>Order History</Typography>
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
      </ShopLayout>
   )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   const { user }: any = await getSession({ req });
   const orders = await dbOrders.getORdersByUser(user._id);
   return {
      props: {
         orders
      }
   }
}

export default HistoryPage;