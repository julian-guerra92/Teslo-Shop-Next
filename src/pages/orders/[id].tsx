
import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { countries } from '../../utils';
import { tesloApi } from '../../api';

export type OrderResponseBody = {
   id: string;
   status:
   | "COMPLETED"
   | "SAVED"
   | "APPROVED"
   | "VOIDED"
   | "PAYER_ACTION_REQUIRED";
}

interface Props {
   order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

   const { _id, isPaid, summaryOrder, shippingAdrress, orderItems } = order;
   const router = useRouter();
   const [isPaying, setIsPaying] = useState(false);

   const onOrderCompleted = async (details: OrderResponseBody) => {
      if (details.status !== 'COMPLETED') {
         return alert('There not have paypal pay');
      }
      setIsPaying(true);
      try {
         const { data } = await tesloApi.post(`/orders/pay`, {
            transactionId: details.id,
            orderId: order._id
         })
         router.reload();
      } catch (error) {
         setIsPaying(false);
         console.log(error);
         alert('Error!');
      }
   }

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
                        <Box
                           justifyContent='center'
                           className='fadeIn'
                           sx={{ display: isPaying ? 'flex' : 'none' }}
                        >
                           <CircularProgress />
                        </Box>
                        <Box flexDirection='column' sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }}>
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
                                    <PayPalButtons
                                       createOrder={(data, actions) => {
                                          return actions.order.create({
                                             purchase_units: [
                                                {
                                                   amount: {
                                                      value: `${order.summaryOrder.total}`, //*Tiene que ser String
                                                   },
                                                },
                                             ],
                                          });
                                       }}
                                       onApprove={(data, actions) => {
                                          return actions.order!.capture().then((details) => {
                                             onOrderCompleted(details);
                                             //const name = details.payer.name?.given_name;
                                             //alert(`Transaction completed by ${name}`);
                                          });
                                       }}
                                    />
                                 )
                           }
                        </Box>
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