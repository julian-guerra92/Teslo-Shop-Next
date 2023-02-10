
import { Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts/ShopLayout';
import { ProductList } from '../components/products';
import { initialData } from '../database/products';

export default function Home() {
  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best Teslo products here'}>

      <Typography variant='h1' component='h1'>Home</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All Products</Typography>

      <ProductList products={initialData.products as any}/>

    </ShopLayout>
  )
}
