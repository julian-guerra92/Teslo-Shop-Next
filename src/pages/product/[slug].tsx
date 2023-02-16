
import { useState, useContext } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { ICartProduct, IProduct, ISize } from '../../interfaces';
import { dbProducts } from '../../database';
import { CartContext } from '../../context/cart/CartContext';

interface Props {
   product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

   const router = useRouter();

   const { addProductToCart } = useContext(CartContext);

   const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
      _id: product._id,
      image: product.images[0],
      price: product.price,
      size: undefined,
      slug: product.slug,
      title: product.title,
      gender: product.gender,
      quantity: 1,
   });

   const onSelectedSize = (size: ISize) => {
      setTempCartProduct(currentProduct => ({
         ...currentProduct,
         size
      }))
   }

   const onUpdateQuantity = (quantity: number) => {
      setTempCartProduct(currentProduct => ({
         ...currentProduct,
         quantity
      }))
   }

   const onAddProduct = () => {
      if (!tempCartProduct.size) return;
      addProductToCart(tempCartProduct);
      router.push('/cart');
   }

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
                     <ItemCounter
                        currentValue={tempCartProduct.quantity}
                        updateQuantity={onUpdateQuantity}
                        maxValue={product.inStock > 5 ? 5 : product.inStock}
                     />
                     <SizeSelector
                        // selectedSize={product.sizes[1]}
                        sizes={product.sizes}
                        selectedSize={tempCartProduct.size}
                        onSelectedSize={onSelectedSize}
                     />
                  </Box>

                  {/* Add to cart */}
                  {
                     (product.inStock > 0)
                        ? (
                           <Button
                              color='secondary'
                              className='circular-btn'
                              onClick={onAddProduct}
                           >
                              {
                                 tempCartProduct.size
                                    ? 'Add to Cart'
                                    : 'Select a Size'
                              }
                           </Button>
                        )
                        : (
                           <Chip label='No Product Available' color='warning' variant='outlined' />
                        )
                  }

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