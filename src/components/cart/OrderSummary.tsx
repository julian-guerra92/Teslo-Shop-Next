
import { useContext, FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from '../../context/cart';
import { currency } from '../../utils';
import { IOrderSummary } from '../../interfaces';

interface Props {
   summaryOrder?: IOrderSummary;
}

export const OrderSummary: FC<Props> = ({ summaryOrder }) => {

   const { summary } = useContext(CartContext);

   const summaryToShow = summaryOrder ? summaryOrder : summary;

   return (
      <Grid container>

         <Grid item xs={6}>
            <Typography>Quantity of Products</Typography>
         </Grid>
         <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{summaryToShow.numberOfItems} {summaryToShow.numberOfItems > 1 ? 'Items' : 'Item'}</Typography>
         </Grid>

         <Grid item xs={6}>
            <Typography>Subtotal</Typography>
         </Grid>
         <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.format(summaryToShow.subTotal)}</Typography>
         </Grid>

         <Grid item xs={6}>
            <Typography>Purchase tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
         </Grid>
         <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.format(summaryToShow.taxRate)}</Typography>
         </Grid>

         <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography variant='subtitle1'>Total:</Typography>
         </Grid>
         <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
            <Typography variant='subtitle1'>{currency.format(summaryToShow.total)}</Typography>
         </Grid>

      </Grid>
   )
}
