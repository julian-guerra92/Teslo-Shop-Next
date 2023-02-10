
import NextLink from 'next/link';
import { ShopLayout } from '../../components/layouts';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';

const SummaryPage = () => {
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