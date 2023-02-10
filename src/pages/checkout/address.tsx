
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const AddressPage = () => {
   return (
      <ShopLayout title='Address' pageDescription='Destination address confirmation'>
         <Typography variant='h1' component='h1'>Address</Typography>
         <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
               <TextField label='First Name' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
               <TextField label='Last Name' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
               <TextField label='Address' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
               <TextField label='Address 2 (Optional)' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
               <TextField label='Post Code' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
               <TextField label='City' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
               <FormControl fullWidth>
                  <Select
                     variant='filled'
                     label='Country'
                     value={1}
                  >
                     <MenuItem value={1}>Colombia</MenuItem>
                     <MenuItem value={2}>Perú</MenuItem>
                     <MenuItem value={3}>Venzuela</MenuItem>
                     <MenuItem value={4}>Ecuador</MenuItem>
                  </Select>
               </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
               <TextField label='Phone Number' variant='filled' fullWidth />
            </Grid>

         </Grid>
         <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
            <Button color='secondary' className='circular-btn' size='large' sx={{ fontSize: 20 }}>
               Review Order
            </Button>
         </Box>
      </ShopLayout>
   )
}

export default AddressPage;