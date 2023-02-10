
import { FC } from 'react';
import NextLink from 'next/link';
import { Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { Box } from '@mui/system';
import { ItemCounter } from '../ui';

const productsInCart = [
   initialData.products[0],
   initialData.products[1],
   initialData.products[2],
   initialData.products[3],
]

interface Props {
   editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
   return (
      <>
         {
            productsInCart.map(product => (
               <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>

                  <Grid item sm={3}>
                     {/* TODO: llevar a la página del producto */}
                     <NextLink href='/product/slug' passHref legacyBehavior>
                        <Link>
                           <CardActionArea>
                              <CardMedia
                                 image={`/products/${product.images[0]}`}
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
                        <Typography variant='body1'>Talla: <strong>M</strong></Typography>
                        {
                           editable
                              ? <ItemCounter />
                              : <Typography variant='subtitle1'>Quantity: 3</Typography>
                        }
                     </Box>
                  </Grid>

                  <Grid item sm={2} display='flex' alignItems='center' flexDirection='column'>
                     <Typography variant='subtitle1'>${product.price}</Typography>
                     {
                        editable && (
                           <Button variant='text' color='warning'>
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
