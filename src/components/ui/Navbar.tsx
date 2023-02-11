
import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {

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

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
               <NextLink href='/category/men' passHref legacyBehavior>
                  <Link>
                     <Button sx={{ fontSize: '16px' }}>Men</Button>
                  </Link>
               </NextLink>
               <NextLink href='/category/women' passHref legacyBehavior>
                  <Link>
                     <Button sx={{ fontSize: '16px' }}>Women</Button>
                  </Link>
               </NextLink>
               <NextLink href='/category/kids' passHref legacyBehavior>
                  <Link>
                     <Button sx={{ fontSize: '16px' }}>Kids</Button>
                  </Link>
               </NextLink>
            </Box>

            <Box flex={1} />

            <IconButton>
               <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref legacyBehavior>
               <Link>
                  <IconButton>
                     <Badge badgeContent={2} color='secondary'>
                        <ShoppingCartOutlined />
                     </Badge>
                  </IconButton>
               </Link>
            </NextLink>

            <Button sx={{ fontSize: '16px', ml: 1 }}>Menu</Button>

         </Toolbar>
      </AppBar>
   )
}
