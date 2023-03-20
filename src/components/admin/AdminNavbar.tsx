
import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import { UiContext } from '../../context';


export const AdminNavbar = () => {

   const { toggleSideMenu } = useContext(UiContext);

   return (
      <AppBar>
         <Toolbar>

            <NextLink href='/' passHref legacyBehavior>
               <Link display='flex' alignItems='center'>
                  <Typography variant='h5' fontWeight='600'>Teslo |</Typography>
                  <Typography variant='h5' fontWeight='600' sx={{ ml: 0.5 }}>Shop</Typography>
               </Link>
            </NextLink>

            <Box flex={1} />

            <Button
               sx={{ fontSize: '16px', ml: 1 }}
               onClick={toggleSideMenu}
            >
               Menu
            </Button>

         </Toolbar>
      </AppBar>
   )
}
