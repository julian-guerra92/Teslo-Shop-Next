
import { Box } from '@mui/system';
import { ShopLayout } from '../components/layouts/ShopLayout';
import { Typography } from '@mui/material';

const Custom404 = () => {
   return (
      <ShopLayout title='Page Not Found' pageDescription='There is nothing to show here'>
         <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
         >
            <Typography
               variant='h1'
               component='h1'
               fontSize={80}
               fontWeight={200}
            >
               404 |
            </Typography>
            <Typography marginLeft={1} fontWeight={500}>
               Product or Page Not Found
            </Typography>
         </Box>
      </ShopLayout>
   )
}

export default Custom404