
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';
import { countries } from '../../utils';
import Cookies from 'js-cookie';

const SummaryPage = () => {

   const router = useRouter();

   const [isPosting, setIsPosting] = useState(false);

   const [errorMessage, setErrorMessage] = useState('');

   const { address, summary, createOrder } = useContext(CartContext);

   useEffect(() => {
      if (!Cookies.get('addressData')) {
         router.push('/checkout/address');
      }
   }, [router])


   const onCreateOrder = async () => {
      setIsPosting(true);
      const { hasError, message } = await createOrder();
      if (hasError) {
         setIsPosting(false);
         setErrorMessage(message);
         return;
      }
      router.replace(`/orders/${message}`);
   }

   return (
      <ShopLayout title='Purchase Summary' pageDescription='Purchase order summary'>
         <Typography variant='h1' component='h1'>Purchase Summary</Typography>
         <Grid container sx={{ mt: 2 }}>

            <Grid item xs={12} sm={12} md={7}>
               <CartList />
            </Grid>

            <Grid item xs={12} sm={12} md={5}>

               <Card className='summary-card'>

                  <CardContent>
                     <Typography variant='h2'>
                        Summary ({summary.numberOfItems} {summary.numberOfItems <= 1 ? 'Product' : 'Products'})
                     </Typography>

                     <Divider sx={{ my: 1 }} />

                     <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Delivery Address</Typography>
                        <NextLink href='/checkout/address' passHref legacyBehavior>
                           <Link underline='always'>
                              Edit
                           </Link>
                        </NextLink>
                     </Box>

                     <Typography>{address?.firstName} {address?.lastName}</Typography>
                     <Typography>{address?.address}{address?.address2 ? `, ${address.address2}` : ''}</Typography>
                     <Typography>{address?.city}</Typography>
                     <Typography>{countries.find(country => country.code === address?.country)?.name}</Typography>
                     <Typography>{address?.phone}</Typography>

                     <Divider sx={{ my: 1 }} />

                     <Box display='flex' justifyContent='end'>
                        <NextLink href='/cart' passHref legacyBehavior>
                           <Link underline='always'>
                              Edit
                           </Link>
                        </NextLink>
                     </Box>

                     <OrderSummary />

                     <Box sx={{ mt: 3 }} display='flex' flexDirection='column' >
                        <Button
                           color='secondary'
                           className='circular-btn'
                           fullWidth
                           sx={{ fontSize: 18 }}
                           onClick={onCreateOrder}
                           disabled={isPosting}
                        >
                           Confirm Purchase Order
                        </Button>
                        <Chip
                           color='error'
                           label={errorMessage}
                           sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                        />
                     </Box>
                  </CardContent>

               </Card>

            </Grid>
         </Grid>

      </ShopLayout>
   )
}

export default SummaryPage;