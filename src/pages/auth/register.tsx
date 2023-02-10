
import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts';

const RegisterPage = () => {
   return (
      <AuthLayout title='Login'>
         <Box sx={{ width: 400, padding: '10px 20px' }}>
            <Grid container spacing={2}>

               <Grid item xs={12} display='flex' justifyContent='center'>
                  <Typography variant='h1' component='h1'>Create an Account</Typography>
               </Grid>

               <Grid item xs={12}>
                  <TextField label='First Name' variant='filled' fullWidth />
               </Grid>

               <Grid item xs={12}>
                  <TextField label='Last Name' variant='filled' fullWidth />
               </Grid>

               <Grid item xs={12}>
                  <TextField label='Email' variant='filled' fullWidth />
               </Grid>

               <Grid item xs={12}>
                  <TextField
                     label='Password'
                     type='password'
                     variant='filled'
                     fullWidth
                  />
               </Grid>

               <Grid item xs={12}>
                  <Button
                     color='secondary'
                     className='circular-btn'
                     size='large'
                     fullWidth
                     sx={{ fontSize: 17 }}
                  >
                     Create
                  </Button>
               </Grid>

               <Grid item xs={12} display='flex' justifyContent='center'>
                  <NextLink href='/auth/login' passHref legacyBehavior>
                     <Link underline='always'>
                        Already have an account? Log In!
                     </Link>
                  </NextLink>
               </Grid>

            </Grid>
         </Box>
      </AuthLayout >
   )
}

export default RegisterPage