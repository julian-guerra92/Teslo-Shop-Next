
import NextLink from 'next/link';
import { ShopLayout } from '../../components/layouts';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { CartList, OrderSummary } from '../../components/cart';

const OrderPage = () => {
   return (
      <ShopLayout title='Summary of order ABC123' pageDescription='Purchase order summary'>
         <Typography variant='h1' component='h1'>Order: ABC123</Typography>

         {/* <Chip
            sx={{ my: 2 }}
            label='Pending Payment Order'
            variant='outlined'
            color='error'
            icon={<CreditCardOffOutlined />}
         /> */}

         <Chip
            sx={{ my: 2 }}
            label='Order Already Paid'
            variant='outlined'
            color='success'
            icon={<CreditScoreOutlined />}
         />

         <Grid container sx={{ mt: 2 }}>

            <Grid item xs={12} sm={12} md={7}>
               <CartList />
            </Grid>

            <Grid item xs={12} sm={12} md={5}>

               <Card className='symmary-card'>

                  <CardContent>
                     <Typography variant='h2'>Summary (3 Products)</Typography>

                     <Divider sx={{ my: 1 }} />

                     <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Delivery Address</Typography>
                        <NextLink href='/checkout/address' passHref legacyBehavior>
                           <Link underline='always'>
                              Edit
                           </Link>
                        </NextLink>
                     </Box>

                     <Typography>Julián Andrés Rodríguez Guerra</Typography>
                     <Typography>Carrera 31 # 28-41</Typography>
                     <Typography>Santa Rosa de Osos - Antioquia</Typography>
                     <Typography>Colombia</Typography>
                     <Typography>+57 3217668210</Typography>

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
                        {/* Todo */}
                        <h1>Pay</h1>
                        <Chip
                           sx={{ my: 2 }}
                           label='Order Already Paid'
                           variant='outlined'
                           color='success'
                           icon={<CreditScoreOutlined />}
                        />
                     </Box>
                  </CardContent>



               </Card>

            </Grid>
         </Grid>

      </ShopLayout>
   )
}

export default OrderPage;