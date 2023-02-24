
import { useState, useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Chip, CircularProgress, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
};

const RegisterPage = () => {

   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

   const { registerUser } = useContext(AuthContext);

   const [showError, setShowError] = useState(false);

   const [errorMessage, setErrorMessage] = useState('');

   const [isLoading, setIsLoading] = useState(false);

   const router = useRouter();

   const queryParameter = router.query.p;

   const onRegisterForm = async ({ email, password, firstName, lastName }: FormData) => {
      setShowError(false);
      const { hasError, message } = await registerUser(firstName, lastName, email, password);
      if (hasError) {
         setShowError(true);
         setErrorMessage(message!);
         setTimeout(() => setShowError(false), 3000);
         return;
      }
      setIsLoading(true);
      const pageDestination = router.query.p?.toString() || '/';
      router.replace(pageDestination);
   }

   return (
      <AuthLayout title='Register'>
         <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Box sx={{ width: 400, padding: '10px 20px' }}>
               <Grid container spacing={2}>

                  <Grid item xs={12} display='flex' flexDirection='column'>
                     <Typography
                        variant='h1'
                        component='h1'
                        textAlign='center'
                     >
                        Create an Account
                     </Typography>
                     <Chip
                        label={errorMessage}
                        color='error'
                        icon={<ErrorOutline />}
                        className='fadeIn'
                        sx={{ display: showError ? 'flex' : 'none' }}
                     />
                  </Grid>

                  <Grid item xs={12}>
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

                  <Grid item xs={12}>
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
                           required: 'Password is required',
                           minLength: { value: 6, message: 'Password must be 6 characters or more' }
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
                                 <CircularProgress color='inherit' />
                              )
                              : 'Create'
                        }
                     </Button>
                  </Grid>

                  <Grid item xs={12} display='flex' justifyContent='center'>
                     <NextLink href={queryParameter ? `/auth/login?p=${queryParameter}` : `/auth/login`}
                        passHref
                        legacyBehavior
                     >
                        <Link underline='always'>
                           Already have an account? Log In!
                        </Link>
                     </NextLink>
                  </Grid>

               </Grid>
            </Box>
         </form>
      </AuthLayout >
   )
}

export default RegisterPage