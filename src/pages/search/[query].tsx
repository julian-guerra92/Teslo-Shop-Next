
import { GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
   products: IProduct[];
   foundProducts: boolean;
   query: string;
}

export default function SearchPage({ products, foundProducts, query }: Props) {
   return (
      <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Find the best Teslo products here'}>
         <Typography variant='h1' component='h1'>Search Products</Typography>
         {
            foundProducts
               ? <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'> Search Term: {query}</Typography>
               : (
                  <Box display='flex'>
                     <Typography variant='h2' sx={{ mb: 1 }}> Not found any product</Typography>
                     <Typography
                        variant='h2'
                        sx={{ ml: 1 }}
                        color='secondary'
                        textTransform='capitalize'
                     >
                        {query}
                     </Typography>
                  </Box>
               )
         }

         <ProductList products={products} />
      </ShopLayout>
   )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
//* Generación de contenido del lado del servidor basado en la petición del cliente
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
   const { query = '' } = params as { query: string };
   if (query.length === 0) {
      return {
         redirect: {
            destination: '/',
            permanent: true
         }
      }
   }
   let products = await dbProducts.getProductByTerm(query); //*Puede que la búsqueda no genere resultados
   const foundProducts = products.length > 0;
   if (!foundProducts) {
      products = await dbProducts.getAllProducts();
   }
   return {
      props: {
         products,
         foundProducts,
         query
      }
   }
}
