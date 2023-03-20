
import { GetServerSideProps, NextPage } from 'next';
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import { ConfirmationNumberOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../../components/layouts';
import { CartList, OrderSummary } from '../../../components/cart';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { countries } from '../../../utils';

interface Props {
   order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

   const { _id, isPaid, summaryOrder, shippingAdrress, orderItems } = order;

   return (
      <AdminLayout
         title='Summary of Order'
         subTitle={`Order: ${_id}`}
         icon={<ConfirmationNumberOutlined />}
      >

         {
            isPaid
               ? (
                  <Chip
                     sx={{ my: 2 }}
                     label='Order Already Paid'
                     variant='outlined'
                     color='success'
                     icon={<CreditScoreOutlined />}
                  />
               ) :
               (
                  <Chip
                     sx={{ my: 2 }}
                     label='Pending Payment Order'
                     variant='outlined'
                     color='error'
                     icon={<CreditCardOffOutlined />}
                  />
               )
         }

         <Grid container sx={{ mt: 2 }} className='fadeIn'>

            <Grid item xs={12} sm={12} md={7}>
               <CartList products={orderItems} />
            </Grid>

            <Grid item xs={12} sm={12} md={5}>

               <Card className='summary-card'>

                  <CardContent>
                     <Typography variant='h2'>
                        Summary ({summaryOrder.numberOfItems} {summaryOrder.numberOfItems > 1 ? 'Products' : 'Product'})
                     </Typography>

                     <Divider sx={{ my: 1 }} />

                     <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Delivery Address</Typography>
                     </Box>

                     <Typography>{shippingAdrress.firstName} {shippingAdrress.lastName}</Typography>
                     <Typography>{shippingAdrress.address}{shippingAdrress.address2 ? `, ${shippingAdrress.address2}` : ''}</Typography>
                     <Typography>{shippingAdrress.city}, {shippingAdrress.zip}</Typography>
                     <Typography>{countries.find(country => country.code === shippingAdrress.country)?.name}</Typography>
                     <Typography>{shippingAdrress.phone}</Typography>

                     <Divider sx={{ my: 1 }} />

                     <OrderSummary summaryOrder={summaryOrder} />

                     <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                        <Box flexDirection='column' sx={{ display: 'flex', flex: 1 }}>
                           {
                              isPaid
                                 ? (
                                    <Chip
                                       sx={{ my: 2 }}
                                       label='Order Already Paid'
                                       variant='outlined'
                                       color='success'
                                       icon={<CreditScoreOutlined />}
                                    />
                                 ) : (
                                    <Chip
                                       sx={{ my: 2 }}
                                       label='Pending Payment Order'
                                       variant='outlined'
                                       color='error'
                                       icon={<CreditCardOffOutlined />}
                                    />
                                 )
                           }
                        </Box>
                     </Box>
                  </CardContent>

               </Card>

            </Grid>
         </Grid>

      </AdminLayout>
   )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
   const { id = '' } = query;
   const order = await dbOrders.getOrderById(id.toString());
   if (!order) {
      return {
         redirect: {
            destination: '/admin/orders',
            permanent: false
         }
      }
   }
   return {
      props: {
         order
      }
   }
}

export default OrderPage;