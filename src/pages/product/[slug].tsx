
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { IProduct } from '../../interfaces';
import { dbProducts } from '../../database';

interface Props {
   product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

   return (
      <ShopLayout title={product.title} pageDescription={product.description}>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
               <ProductSlideshow images={product.images} />
            </Grid>
            <Grid item xs={12} sm={5}>
               <Box display='flex' flexDirection='column'>

                  {/* Title */}
                  <Typography variant='h1' component='h1'>{product.title}</Typography>
                  <Typography variant='subtitle1' component='h2'>${product.price}</Typography>

                  {/* Quiantity */}
                  <Box sx={{ my: 2 }}>
                     <Typography variant='subtitle2'>Quantity</Typography>
                     <ItemCounter />
                     <SizeSelector
                        // selectedSize={product.sizes[1]}
                        sizes={product.sizes}
                     />
                  </Box>

                  {/* Add to cart */}
                  <Button color='secondary' className='circular-btn'>
                     Add to Cart
                  </Button>
                  {/* <Chip label='No Product Available' color='error' variant='outlined' /> */}

                  {/* Description */}
                  <Box sx={{ mt: 3 }}>
                     <Typography variant='subtitle2'>Description:</Typography>
                     <Typography variant='body2'>{product.description}</Typography>
                  </Box>

               </Box>
            </Grid>
         </Grid>
      </ShopLayout>
   )
}

//*Método para la creación de los paths de las distinas páginas de la App (tener en cuenta llaves en el nombre del archivo)
export const getStaticPaths: GetStaticPaths = async (ctx) => {
   const productSlugs = await dbProducts.getAllProductsSlugs();
   return {
      paths: productSlugs.map(({ slug }) => ({
         params: { slug }
      })),
      fallback: "blocking", //*Usado para generar el contenido aunque no se encuentre construido
   }
}

//*Método para crear el contenido estático que va a ir a las props de la página que va a ser renderizada
export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { slug = '' } = params as { slug: string };
   const product = await dbProducts.getProductBySlug(slug);
   if (!product) {
      return {
         redirect: {
            destination: '/',
            permanent: false
         }
      }
   }
   return {
      props: {
         product
      },
      revalidate: 86400, //*Revalida el contenido de la paǵina en este tiempo determinado
   }
}

/*
//* Ejemplo con getServerSideProps
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
   const { slug = '' } = params as { slug: string };
   const product = await dbProducts.getProductBySlug(slug);
   if (!product) {
      return {
         redirect: {
            destination: '/',
            permanent: false
         }
      }
   }
   return {
      props: {
         product
      }
   }
}
*/

export default ProductPage;