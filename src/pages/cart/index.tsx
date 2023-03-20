
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';

const CartPage = () => {

   const { isLoaded, cart, summary } = useContext(CartContext);

   const router = useRouter();

   useEffect(() => {
      if (isLoaded && cart.length === 0) {
         router.replace('/cart/empty');
      }
   }, [isLoaded, cart, router])

   if (!isLoaded || cart.length === 0) {
      return (<></>);
   }

   return (
      <ShopLayout title={`Cart - ${summary.numberOfItems}`} pageDescription='Store shopping cart'>
         <Typography variant='h1' component='h1'>Cart</Typography>
         <Grid container sx={{ mt: 2 }} className='fadeIn'>
            <Grid item xs={12} sm={12} md={7}>
               <CartList editable={true} />
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
               <Card className='summary-card'>
                  <CardContent>
                     <Typography variant='h2'>Order</Typography>
                     <Divider sx={{ my: 1 }} />
                     <OrderSummary />
                     <Box sx={{ mt: 3 }}>
                        <Button
                           color='secondary'
                           className='circular-btn'
                           fullWidth
                           sx={{ fontSize: 18 }}
                           href='/checkout/address'
                        >
                           Checkout
                        </Button>
                     </Box>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>

      </ShopLayout>
   )
}

export default CartPage;