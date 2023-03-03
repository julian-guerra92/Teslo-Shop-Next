
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';
import { countries } from '../../utils';
import Cookies from 'js-cookie';

const SummaryPage = () => {

   const router = useRouter();

   const { address, summary } = useContext(CartContext);

   useEffect(() => {
      if (!Cookies.get('addressData')) {
         router.push('/checkout/address');
      }
   }, [router])


   return (
      <ShopLayout title='Purchase Summary' pageDescription='Purchase order summary'>
         <Typography variant='h1' component='h1'>Purchase Summary</Typography>
         <Grid container sx={{ mt: 2 }}>

            <Grid item xs={12} sm={12} md={7}>
               <CartList />
            </Grid>

            <Grid item xs={12} sm={12} md={5}>

               <Card className='symmary-card'>

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

                     <Box sx={{ mt: 3 }}>
                        <Button color='secondary' className='circular-btn' fullWidth sx={{ fontSize: 18 }}>
                           Confirm Purchase Order
                        </Button>
                     </Box>
                  </CardContent>

               </Card>

            </Grid>
         </Grid>

      </ShopLayout>
   )
}

export default SummaryPage;