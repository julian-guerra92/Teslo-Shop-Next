
import { Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';

export default function HomePage() {

  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best Teslo products here'}>
      <Typography variant='h1' component='h1'>Home</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All Products</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}
