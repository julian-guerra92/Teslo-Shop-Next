import { ChangeEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
   Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader
} from "@mui/material";
import {
   AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined,
   LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined
} from "@mui/icons-material";
import { UiContext, AuthContext } from "../../context";


export const SideMenu = () => {

   const router = useRouter();

   const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

   const { isLoggedIn, user, logout } = useContext(AuthContext);

   const [searchTerm, setSearchTerm] = useState('');

   const navigateTo = (url: string) => {
      router.push(url);
      toggleSideMenu();
   }

   const onChageTerm = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = target;
      setSearchTerm(value);
   }

   const onSearchTerm = () => {
      if (searchTerm.trim().length === 0) return;
      navigateTo(`/search/${searchTerm}`);
   }

   return (
      <Drawer
         open={isMenuOpen}
         onClose={toggleSideMenu}
         anchor='right'
         sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      >
         <Box sx={{ width: 250, paddingTop: 5 }}>

            <List>

               <ListItem>
                  <Input
                     autoFocus
                     value={searchTerm}
                     onChange={onChageTerm}
                     onKeyUp={(event) => event.key === 'Enter' ? onSearchTerm() : null}
                     type='text'
                     placeholder="Search..."
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              onClick={onSearchTerm}
                           >
                              <SearchOutlined />
                           </IconButton>
                        </InputAdornment>
                     }
                  />
               </ListItem>

               {
                  isLoggedIn && (
                     <>
                        <ListItemButton>
                           <ListItemIcon>
                              <AccountCircleOutlined />
                           </ListItemIcon>
                           <ListItemText primary={'Perfil'} />
                        </ListItemButton>

                        <ListItemButton>
                           <ListItemIcon>
                              <ConfirmationNumberOutlined />
                           </ListItemIcon>
                           <ListItemText primary={'My Orders'} />
                        </ListItemButton>
                     </>
                  )
               }

               <ListItemButton
                  sx={{ display: { xs: '', sm: 'none' } }}
                  onClick={() => navigateTo('/category/men')}
               >
                  <ListItemIcon>
                     <MaleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Men'} />
               </ListItemButton>

               <ListItemButton
                  sx={{ display: { xs: '', sm: 'none' } }}
                  onClick={() => navigateTo('/category/women')}
               >
                  <ListItemIcon>
                     <FemaleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Women'} />
               </ListItemButton>

               <ListItemButton
                  sx={{ display: { xs: '', sm: 'none' } }}
                  onClick={() => navigateTo('/category/kids')}
               >
                  <ListItemIcon>
                     <EscalatorWarningOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Kids'} />
               </ListItemButton>

               {
                  (isLoggedIn)
                     ? (
                        <ListItemButton onClick={logout}>
                           <ListItemIcon>
                              <LoginOutlined />
                           </ListItemIcon>
                           <ListItemText primary={'Logout'} />
                        </ListItemButton>
                     ) : (
                        <ListItemButton onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
                           <ListItemIcon>
                              <VpnKeyOutlined />
                           </ListItemIcon>
                           <ListItemText primary={'Login'} />
                        </ListItemButton>
                     )
               }

               {/* Admin */}
               {
                  user?.role === 'admin' && (
                     <>
                        <Divider />
                        <ListSubheader>Admin Panel</ListSubheader>

                        <ListItemButton>
                           <ListItemIcon>
                              <CategoryOutlined />
                           </ListItemIcon>
                           <ListItemText primary={'Products'} />
                        </ListItemButton>
                        <ListItemButton>
                           <ListItemIcon>
                              <ConfirmationNumberOutlined />
                           </ListItemIcon>
                           <ListItemText primary={'Orders'} />
                        </ListItemButton>

                        <ListItemButton>
                           <ListItemIcon>
                              <AdminPanelSettings />
                           </ListItemIcon>
                           <ListItemText primary={'Users'} />
                        </ListItemButton>
                     </>
                  )
               }
            </List>
         </Box>
      </Drawer>
   )
}
