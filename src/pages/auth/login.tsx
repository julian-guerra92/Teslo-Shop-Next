
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { getSession, signIn, getProviders } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Chip, CircularProgress, Grid, Link, TextField, Typography, Divider } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';

type FormData = {
   email: string,
   password: string,
};

const LoginPage = () => {

   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

   const [showError, setShowError] = useState(false);

   const [isLoading, setIsLoading] = useState(false);

   const [providers, setProviders] = useState<any>({});

   const router = useRouter();

   const queryParamater = router.query.p;

   const hasError = router.query.error;

   useEffect(() => {
      if (hasError) {
         setShowError(true);
         setTimeout(() => setShowError(false), 4000);
      }
   }, [router])

   useEffect(() => {
      getProviders().then(prov => {
         setProviders(prov);
      })
   }, [])



   const onLoginUser = async ({ email, password }: FormData) => {
      //*Método mediante el NextAuth
      setShowError(false);
      await signIn('credentials', { email, password });
      setIsLoading(true);
      //*Método peronalizado
      // const isValidLogin = await loginUser(email, password);
      // if (!isValidLogin) {
      //    setShowError(true);
      //    setTimeout(() => setShowError(false), 3000);
      //    return;
      // }
      // setIsLoading(true);
      // const pageDestination = router.query.p?.toString() || '/';
      // router.replace(pageDestination);
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
                                 <CircularProgress color='inherit' />
                              )
                              : 'Log In'
                        }
                     </Button>
                  </Grid>

                  <Grid item xs={12} display='flex' justifyContent='center'>
                     <NextLink href={queryParamater ? `/auth/register?p=${queryParamater}` : `/auth/register`}
                        passHref
                        legacyBehavior
                     >
                        <Link underline='always'>
                           New to TesloShop? Create an Account!
                        </Link>
                     </NextLink>
                  </Grid>

                  <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center'>
                     <Divider sx={{ width: '100%', mb: 2 }} />
                     {
                        Object.values(providers).map((provider: any) => {
                           if (provider.id === 'credentials') return (<div key='credentials'></div>)
                           return (
                              <Button
                                 key={provider.id}
                                 variant='outlined'
                                 fullWidth
                                 color='primary'
                                 sx={{ mb: 1 }}
                                 size='large'
                                 onClick={() => signIn(provider.id)}
                              >
                                 {provider.name}
                              </Button>
                           )
                        })
                     }
                  </Grid>

               </Grid>
            </Box>
         </form>
      </AuthLayout >
   )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
   const session = await getServerSession(req, res, authOptions);
   const { p = '/' } = query;
   if (session) {
      return {
         redirect: {
            destination: p.toString(),
            permanent: false
         }
      }
   }
   return {
      props: {}
   }
}

export default LoginPage