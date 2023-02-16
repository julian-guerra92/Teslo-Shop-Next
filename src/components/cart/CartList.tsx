
import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Button, CardActionArea, CardMedia, Grid, Link, Typography, Box } from '@mui/material';
import { ItemCounter } from '../ui';
import { CartContext } from '../../context/cart';
import { ICartProduct } from '../../interfaces';

interface Props {
   editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

   const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

   const onChangeQuantityProduct = (product: ICartProduct, newQuantityValue: number) => {
      product.quantity = newQuantityValue;
      updateCartQuantity(product);
   }

   const onRemoveProduct = (product: ICartProduct) => {
      removeCartProduct(product);
   }

   return (
      <>
         {
            cart.map(product => (
               <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>

                  <Grid item sm={3}>
                     {/* TODO: llevar a la página del producto */}
                     <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                        <Link>
                           <CardActionArea>
                              <CardMedia
                                 image={`/products/${product.image}`}
                                 component='img'
                                 sx={{ borderRadius: '5px' }}
                              />
                           </CardActionArea>
                        </Link>
                     </NextLink>
                  </Grid>

                  <Grid item sm={7}>
                     <Box display='flex' flexDirection='column'>
                        <Typography variant='body1'>{product.title}</Typography>
                        <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>
                        {
                           editable
                              ? (
                                 <ItemCounter
                                    currentValue={product.quantity}
                                    maxValue={5} //TODO: Arreglar esta función
                                    updateQuantity={(value) => onChangeQuantityProduct(product, value)}
                                 />
                              )
                              : <Typography variant='subtitle1'>{`Quantity: ${product.quantity}`}</Typography>
                        }
                     </Box>
                  </Grid>

                  <Grid item sm={2} display='flex' alignItems='center' flexDirection='column'>
                     <Typography variant='subtitle1'>${product.price}</Typography>
                     {
                        editable && (
                           <Button
                              variant='text'
                              color='warning'
                              onClick={() => onRemoveProduct(product)}
                           >
                              Remove
                           </Button>
                        )
                     }
                  </Grid>

               </Grid>
            ))
         }
      </>
   )
}
