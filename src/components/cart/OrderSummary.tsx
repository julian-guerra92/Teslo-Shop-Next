
import { Grid, Typography } from '@mui/material';

export const OrderSummary = () => {
   return (
      <Grid container>

         <Grid item xs={6}>
            <Typography>Quantity of Products</Typography>
         </Grid>
         <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>2 items</Typography>
         </Grid>

         <Grid item xs={6}>
            <Typography>Subtotal</Typography>
         </Grid>
         <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>$155.36</Typography>
         </Grid>

         <Grid item xs={6}>
            <Typography>Purchase tax (15%)</Typography>
         </Grid>
         <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>$34.25</Typography>
         </Grid>

         <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography variant='subtitle1'>Total:</Typography>
         </Grid>
         <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
            <Typography variant='subtitle1'>$186.52</Typography>
         </Grid>

      </Grid>
   )
}
