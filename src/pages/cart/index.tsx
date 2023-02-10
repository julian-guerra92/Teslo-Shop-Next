
import { ShopLayout } from '../../components/layouts';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';

const CartPage = () => {
   return (
      <ShopLayout title='Cart - 2' pageDescription='Store shopping cart'>
         <Typography variant='h1' component='h1'>Cart</Typography>
         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} sm={12} md={7}>
               <CartList editable={true} />
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
               <Card className='symmary-card'>
                  <CardContent>
                     <Typography variant='h2'>Order</Typography>
                     <Divider sx={{ my: 1 }} />
                     <OrderSummary />
                     <Box sx={{ mt: 3 }}>
                        <Button color='secondary' className='circular-btn' fullWidth sx={{ fontSize: 18 }}>
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