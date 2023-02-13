
import { ChangeEvent, useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { UiContext } from '../../context';

export const Navbar = () => {

   const { asPath, push } = useRouter();

   const { toggleSideMenu } = useContext(UiContext);

   const [searchTerm, setSearchTerm] = useState('');

   const [isSearchVisible, setIsSearchVisible] = useState(false);

   const onChageTerm = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = target;
      setSearchTerm(value);
   }

   const onSearchTerm = () => {
      if (searchTerm.trim().length === 0) return;
      push(`/search/${searchTerm}`);
   }

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

            <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} className='fadeIn'>
               <NextLink href='/category/men' passHref legacyBehavior>
                  <Link>
                     <Button
                        color={asPath === '/category/men' ? 'primary' : 'info'}
                        sx={{ fontSize: '16px', ":hover": { color: 'black' } }}
                     >
                        Men
                     </Button>
                  </Link>
               </NextLink>
               <NextLink href='/category/women' passHref legacyBehavior>
                  <Link>
                     <Button
                        color={asPath === '/category/women' ? 'primary' : 'info'}
                        sx={{ fontSize: '16px', ml: 1, ":hover": { color: 'black' } }}
                     >
                        Women
                     </Button>
                  </Link>
               </NextLink>
               <NextLink href='/category/kids' passHref legacyBehavior>
                  <Link>
                     <Button
                        color={asPath === '/category/kids' ? 'primary' : 'info'}
                        sx={{ fontSize: '16px', ml: 1, ":hover": { color: 'black' } }}
                     >
                        Kids
                     </Button>
                  </Link>
               </NextLink>
            </Box>

            <Box flex={1} />

            {/* Pantallas grandes */}
            {
               isSearchVisible
                  ? (
                     <Input
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                        className='fadeIn'
                        autoFocus
                        value={searchTerm}
                        onChange={onChageTerm}
                        onKeyUp={(event) => event.key === 'Enter' ? onSearchTerm() : null}
                        type='text'
                        placeholder="Search..."
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                                 onClick={() => setIsSearchVisible(false)}
                              >
                                 <ClearOutlined />
                              </IconButton>
                           </InputAdornment>
                        }
                     />
                  )
                  : (
                     <IconButton
                        className='fadeIn'
                        onClick={() => setIsSearchVisible(true)}
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                     >
                        <SearchOutlined />
                     </IconButton>
                  )
            }

            {/* Pantallas pequeñas */}
            <IconButton
               sx={{ display: { xs: 'flex', sm: 'none' } }}
               onClick={toggleSideMenu}
            >
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
