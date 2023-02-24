
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, Grid, MenuItem, NoSsr, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { ShopLayout } from '../../components/layouts';
import { countries } from '../../utils';
import { CartContext } from '../../context';

type FormData = {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zip: string;
   city: string;
   country: string;
   phone: string;
}

const getAddressFromCookies = (): FormData => {
   const cookieAddressData = Cookies.get('addressData') ? JSON.parse(Cookies.get('addressData')!) : {};
   return cookieAddressData;
}

const AddressPage = () => {

   const router = useRouter();

   const { updateAddress, address } = useContext(CartContext);

   const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
      defaultValues: getAddressFromCookies()
   });

   const onSubmitAddress = (addressData: FormData) => {
      updateAddress(addressData);
      router.push('/checkout/summary');
   }

   return (
      <ShopLayout title='Address' pageDescription='Destination address confirmation'>
         <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
            <Typography variant='h1' component='h1'>Address</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
               <Grid item xs={12} sm={6}>
                  <TextField
                     label='First Name'
                     variant='filled'
                     fullWidth
                     {...register('firstName', {
                        required: 'First Name is required',
                        minLength: { value: 3, message: 'First name must be 3 characters or more' }
                     })}
                     error={!!errors.firstName}
                     helperText={errors.firstName?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Last Name'
                     variant='filled'
                     fullWidth
                     {...register('lastName', {
                        required: 'Last Name is required',
                        minLength: { value: 3, message: 'Last name must be 3 characters or more' }
                     })}
                     error={!!errors.lastName}
                     helperText={errors.lastName?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Address'
                     variant='filled'
                     fullWidth
                     {...register('address', {
                        required: 'Address is required',
                        minLength: { value: 3, message: 'Address must be 3 characters or more' }
                     })}
                     error={!!errors.address}
                     helperText={errors.address?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Address 2 (Optional)'
                     variant='filled'
                     fullWidth
                     {...register('address2')}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Post Code'
                     variant='filled'
                     fullWidth
                     {...register('zip', {
                        required: 'Post code is required',
                        minLength: { value: 4, message: 'Post code must be 4 characters or more' }
                     })}
                     error={!!errors.zip}
                     helperText={errors.zip?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='City'
                     variant='filled'
                     fullWidth
                     {...register('city', {
                        required: 'City is required',
                        minLength: { value: 3, message: 'City must be 3 characters or more' }
                     })}
                     error={!!errors.city}
                     helperText={errors.city?.message}
                  />
               </Grid>


               <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                     <NoSsr>
                        <TextField
                           key={getAddressFromCookies().country || "COL"}
                           select
                           variant='filled'
                           label='Country'
                           defaultValue={getAddressFromCookies().country || "COL"}
                           {...register('country', {
                              required: 'Country is required',
                              minLength: { value: 3, message: 'Country must be 3 characters or more' }
                           })}
                           error={!!errors.country}
                           helperText={errors.country?.message}
                        >
                           {
                              countries.map(country => (
                                 <MenuItem
                                    key={country.code}
                                    value={country.code}
                                 >
                                    {country.name}
                                 </MenuItem>
                              ))
                           }
                        </TextField>
                     </NoSsr>
                  </FormControl>
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Phone Number'
                     variant='filled'
                     fullWidth
                     {...register('phone', {
                        required: 'Phone number is required',
                        minLength: { value: 10, message: 'Phone number must be 10 characters or more' }
                     })}
                     error={!!errors.phone}
                     helperText={errors.phone?.message}
                  />
               </Grid>

            </Grid>
            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
               <Button
                  type='submit'
                  color='secondary'
                  className='circular-btn'
                  size='large'
                  sx={{ fontSize: 20 }}
               >
                  Review Order
               </Button>
            </Box>
         </form>
      </ShopLayout>
   )
}

//*Posible opción de implementación, pero se trabajó finalmente mediante middleware
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//    const { token = '' } = req.cookies;
//    let isValidToken = false;
//    try {
//       await jwt.isValidToken(token);
//       isValidToken = true;
//    } catch (error) {
//       isValidToken = false;
//    }
//    if (!isValidToken) {
//       return {
//          redirect: {
//             destination: '/auth/login?p=/checkout/address',
//             permanent: false,
//          }
//       }
//    }
//    return {
//       props: {

//       }
//    }
// }

export default AddressPage;