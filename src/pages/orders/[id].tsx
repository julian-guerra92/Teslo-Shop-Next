
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { CartList, OrderSummary } from '../../components/cart';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { countries } from '../../utils';

interface Props {
   order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

   const { _id, isPaid, summaryOrder, shippingAdrress, orderItems } = order;

   return (
      <ShopLayout title='Summary of Order' pageDescription='Purchase order summary'>
         <Typography variant='h1' component='h1'>Order: {_id}</Typography>

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
                                 <h1>Pay</h1>
                              )
                        }
                     </Box>
                  </CardContent>

               </Card>

            </Grid>
         </Grid>

      </ShopLayout>
   )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
   const { id = '' } = query;
   const session: any = await getSession({ req });
   const order = await dbOrders.getOrderById(id.toString());
   if (!order) {
      return {
         redirect: {
            destination: '/orders/history',
            permanent: false
         }
      }
   }
   if (order.user !== session.user._id) {
      return {
         redirect: {
            destination: '/orders/history',
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