
import { useState, useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Chip, CircularProgress, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { AuthContext } from '../../context';

type FormData = {
   email: string,
   password: string,
};

const LoginPage = () => {

   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

   const { loginUser } = useContext(AuthContext);

   const [showError, setShowError] = useState(false);

   const [isLoading, setIsLoading] = useState(false);

   const router = useRouter();

   const onLoginUser = async ({ email, password }: FormData) => {
      setShowError(false);
      const isValidLogin = await loginUser(email, password);
      if(!isValidLogin) {
         setShowError(true);
         setTimeout(() => setShowError(false), 3000);
         return;
      }
      setIsLoading(true);
      router.replace('/');
   }

   return (
      <AuthLayout title='Login'>
         <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{ width: 400, padding: '10px 20px' }}>
               <Grid container spacing={2}>

                  <Grid item xs={12} display='flex' flexDirection='column'>
                     <Typography
                        variant='h1'
                        component='h1'
                        textAlign='center'
                     >
                        Log In to TesloShop
                     </Typography>
                     <Chip
                        label='Password or Email Invalid'
                        color='error'
                        icon={<ErrorOutline />}
                        className='fadeIn'
                        sx={{ display: showError ? 'flex' : 'none' }}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        type='email'
                        label='Email'
                        variant='filled'
                        fullWidth
                        {...register('email', {
                           required: 'Email is required',
                           validate: validations.isEmail
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        type='password'
                        label='Password'
                        variant='filled'
                        fullWidth
                        {...register('password', {
                           required: 'Password is required'
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <Button
                        type='submit'
                        color='secondary'
                        className='circular-btn'
                        size='large'
                        fullWidth
                        sx={{ fontSize: 17 }}
                        disabled={isLoading || showError ? true : false}
                     >
                        {
                           isLoading
                              ? (
                                 <CircularProgress color='inherit'/>
                              )
                              : 'Log In'
                        }
                     </Button>
                  </Grid>

                  <Grid item xs={12} display='flex' justifyContent='center'>
                     <NextLink href='/auth/register' passHref legacyBehavior>
                        <Link underline='always'>
                           New to TesloShop? Create an Account!
                        </Link>
                     </NextLink>
                  </Grid>

               </Grid>
            </Box>
         </form>
      </AuthLayout >
   )
}

export default LoginPage