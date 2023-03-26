
import NextLink from 'next/link';
import useSWR from 'swr';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { IProduct } from '../../../interfaces';

const columns: GridColDef[] = [
   {
      field: 'img',
      headerName: 'Images',
      align: 'center',
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
               <CardMedia
                  alt={`${row.title}`}
                  height='60'
                  component='img'
                  className='fadeIn'
                  image={row.img}
               />
            </a>
         )
      }
   },
   {
      field: 'title',
      headerName: 'Title',
      width: 350,
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <NextLink href={`/admin/products/${row.slug}`} passHref legacyBehavior>
               <Link underline='always'>
                  {row.title}
               </Link>
            </NextLink>
         )
      }
   },
   { field: 'gender', headerName: 'Gender' },
   { field: 'type', headerName: 'Type' },
   { field: 'inStock', headerName: 'Stock (Und)' },
   { field: 'price', headerName: 'Price ($)' },
   { field: 'sizes', headerName: 'Sizes', width: 150 }
]

const ProductsPage = () => {

   const { data, error } = useSWR<IProduct[]>('/api/admin/products');

   if (!data && !error) return <></>;

   if (error) {
      console.log(error);
      return <Typography>Error Loading Information</Typography>
   }

   const rows = data!.map(product => ({
      id: product._id,
      img: product.images[0],
      title: product.title,
      gender: product.gender,
      type: product.type,
      inStock: product.inStock,
      price: product.price,
      sizes: product.sizes.join(', '),
      slug: product.slug
   }))

   return (
      <AdminLayout
         title={`Products (${data?.length})`}
         subTitle={'Products Maintenance'}
         icon={<CategoryOutlined />}
      >
         <Box display='flex' justifyContent={'end'} sx={{ mb: 2 }}>
            <Button
               startIcon={<AddOutlined />}
               color='secondary'
               className='circular-btn'
               size='large'
               href='/admin/products/new'
            >
               Create Product
            </Button>
         </Box>
         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={15}
                  rowsPerPageOptions={[15]}
               />
            </Grid>
         </Grid>
      </AdminLayout>
   )
}

export default ProductsPage;