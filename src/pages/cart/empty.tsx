
import NextLink from 'next/link';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const EmptyPage = () => {
   return (
      <ShopLayout title='Empty Cart' pageDescription='There are no items in the shopping cart'>
         <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
         >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box display='flex' flexDirection='column' alignItems='center'>
               <Typography marginLeft={1} fontWeight={500}>
                  There are no items in your shopping cart
               </Typography>
               <NextLink href='/' passHref legacyBehavior>
                  <Link typography='h4' color='secondary'>
                     Return
                  </Link>
               </NextLink>
            </Box>
         </Box>
      </ShopLayout>
   )
}

export default EmptyPage;