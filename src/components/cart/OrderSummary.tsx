
import { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from '../../context/cart';
import { currency } from '../../utils';

export const OrderSummary = () => {

   const { summary } = useContext(CartContext);

   return (
      <Grid container>

         <Grid item xs={6}>
            <Typography>Quantity of Products</Typography>
         </Grid>
         <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{summary.numberOfItems} {summary.numberOfItems > 1 ? 'Items' : 'Item'}</Typography>
         </Grid>

         <Grid item xs={6}>
            <Typography>Subtotal</Typography>
         </Grid>
         <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.format(summary.subTotal)}</Typography>
         </Grid>

         <Grid item xs={6}>
            <Typography>Purchase tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
         </Grid>
         <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.format(summary.taxRate)}</Typography>
         </Grid>

         <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography variant='subtitle1'>Total:</Typography>
         </Grid>
         <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
            <Typography variant='subtitle1'>{currency.format(summary.total)}</Typography>
         </Grid>

      </Grid>
   )
}
