
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { PeopleOutline } from '@mui/icons-material';
import { Grid, MenuItem, Select, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { AdminLayout } from '../../components/layouts';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';

const UsersPage = () => {

   const { data, error } = useSWR<IUser[]>('/api/admin/users');

   const [users, setUsers] = useState<IUser[]>([]);

   useEffect(() => {
      if (data) {
         setUsers(data);
      }
   }, [data]);


   if (!data && !error) return <></>;

   if (error) {
      console.log(error);
      return <Typography>Error Loading Information</Typography>
   }

   const onRoleUpdated = async (userId: string, newRole: string) => {
      const previosUsers = users.map(user => ({ ...user }));
      const updateUsers = users.map(user => ({
         ...user,
         role: userId === user._id ? newRole : user.role
      }))
      setUsers(updateUsers);
      try {
         await tesloApi.put('/admin/users', { userId, role: newRole });
      } catch (error) {
         setUsers(previosUsers); //En caso de que se presente error en el posteo del cambio del rol del usuario
         console.log(error);
         alert('Failed to update user role!');
      }
   }

   const columns: GridColDef[] = [
      { field: 'email', headerName: 'Email', width: 300 },
      { field: 'fullName', headerName: 'Full Name', width: 300 },
      {
         field: 'role',
         headerName: 'Role',
         width: 300,
         renderCell: ({ row }: GridRenderCellParams) => {
            return (
               <Select
                  value={row.role}
                  label='Rol'
                  sx={{ width: '300px' }}
                  onChange={({ target }) => onRoleUpdated(row.id, target.value)}
               >
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='client'>Client</MenuItem>
                  <MenuItem value='super-user'>Super User</MenuItem>
                  <MenuItem value='SEO'>SEO</MenuItem>
               </Select>
            )
         }
      },
   ]

   const rows = users.map(user => ({
      id: user._id,
      email: user.email,
      fullName: user.firstName + ' ' + user.lastName,
      role: user.role
   }))

   return (
      <AdminLayout
         title={'Users'}
         subTitle={'User Maintenance'}
         icon={<PeopleOutline />}
      >
         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
               />
            </Grid>
         </Grid>
      </AdminLayout>
   )
}

export default UsersPage;