
import { FC, useEffect, useRef, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../../components/layouts';
import { IProduct } from '../../../interfaces';
import { dbProducts } from '../../../database';
import { tesloApi } from '../../../api';
import { Product } from '../../../models';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface FormData {
   _id?: string;
   description: string;
   images: string[];
   inStock: number;
   price: number;
   sizes: string[];
   slug: string;
   tags: string[];
   title: string;
   type: string;
   gender: string;
}

interface Props {
   product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {

   const router = useRouter();
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [newTagValue, setNewTagValue] = useState('');
   const [isSaving, setIsSaving] = useState(false);

   const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
      defaultValues: product
   })

   useEffect(() => {
      const subscription = watch((value, { name, type }) => {
         if (name === 'title') {
            const newSlug = value.title?.trim()
               .replaceAll(' ', '_')
               .replaceAll("'", '')
               .toLocaleLowerCase() || '';
            setValue('slug', newSlug);
         }
      })
      return () => subscription.unsubscribe(); //Necesario para destruir el efecto, porque de lo contrario continuará aunque no estemos en la misma página
   }, [watch, setValue])


   const onChangeSizes = (size: string) => {
      const currentSizes = getValues('sizes');
      if (currentSizes.includes(size)) {
         return setValue('sizes', currentSizes.filter(s => s !== size), { shouldValidate: true });
      }
      setValue('sizes', [...currentSizes, size], { shouldValidate: true });
   }

   const onNewTag = () => {
      const newTag = newTagValue.trim().toLocaleLowerCase();
      setNewTagValue('');
      const currentTags = getValues('tags');
      if (currentTags.includes(newTag)) {
         return;
      }
      currentTags.push(newTag);
   }

   const onDeleteTag = (tag: string) => {
      const updatedTags = getValues('tags').filter(t => t !== tag);
      setValue('tags', updatedTags, { shouldValidate: true });
   }

   const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (!target.files || target.files.length === 0) {
         return;
      }
      try {
         for (const file of target.files) {
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await tesloApi.post<{ message: string }>('/admin/upload', formData);
            setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
         }
      } catch (error) {
         console.log({ error });
      }
   }

   const onDeleteImage = (image: string) => {
      setValue(
         'images',
         getValues('images').filter(img => img !== image),
         { shouldValidate: true }
      )
   }

   const onSubmit = async (formData: FormData) => {
      if (formData.images.length < 2) return alert('Two Image is Necesary');
      setIsSaving(true);
      try {
         const { data } = await tesloApi({
            url: '/admin/products',
            method: formData._id ? 'PUT' : 'POST',
            data: formData
         })
         console.log(data);
         if (!formData._id) {
            router.replace(`/admin/products/${formData.slug}`)
         } else {
            setIsSaving(false);
         }
      } catch (error) {
         console.log(error);
         setIsSaving(false);
      }
   }

   return (
      <AdminLayout
         title={'Product'}
         subTitle={`Editing: ${product.title}`}
         icon={<DriveFileRenameOutline />}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
               <Button
                  color="secondary"
                  className='circular-btn'
                  startIcon={<SaveOutlined />}
                  sx={{ width: '150px' }}
                  type="submit"
                  size='large'
                  disabled={isSaving}
               >
                  Save
               </Button>
            </Box>

            <Grid container spacing={2}>
               {/* Data */}
               <Grid item xs={12} sm={6}>

                  <TextField
                     label="Title"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register('title', {
                        required: 'This field is required!',
                        minLength: { value: 2, message: 'Title must be 2 characters or more!' }
                     })}
                     error={!!errors.title}
                     helperText={errors.title?.message}
                  />

                  <TextField
                     label="Description"
                     variant="filled"
                     fullWidth
                     multiline
                     rows={6}
                     sx={{ mb: 1 }}
                     {...register('description', {
                        required: 'This field is required!',
                        minLength: { value: 2, message: 'Description must be 3 characters or more!' }
                     })}
                     error={!!errors.description}
                     helperText={errors.description?.message}
                  />

                  <TextField
                     label="Stock"
                     type='number'
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register('inStock', {
                        required: 'This field is required!',
                        min: { value: 0, message: 'Min value is 0!' }
                     })}
                     error={!!errors.inStock}
                     helperText={errors.inStock?.message}
                  />

                  <TextField
                     label="Price"
                     type='number'
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register('price', {
                        required: 'This field is required!',
                        min: { value: 0, message: 'Min value is 0!' }
                     })}
                     error={!!errors.price}
                     helperText={errors.price?.message}
                  />

                  <Divider sx={{ my: 1 }} />

                  <FormControl sx={{ mb: 1 }}>
                     <FormLabel>Type</FormLabel>
                     <RadioGroup
                        row
                        value={getValues('type')}
                        onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}
                     >
                        {
                           validTypes.map(option => (
                              <FormControlLabel
                                 key={option}
                                 value={option}
                                 control={<Radio color='secondary' />}
                                 label={capitalize(option)}
                              />
                           ))
                        }
                     </RadioGroup>
                  </FormControl>

                  <FormControl sx={{ mb: 1 }}>
                     <FormLabel>Gender</FormLabel>
                     <RadioGroup
                        row
                        value={getValues('gender')}
                        onChange={({ target }) => setValue('gender', target.value, { shouldValidate: true })}
                     >
                        {
                           validGender.map(option => (
                              <FormControlLabel
                                 key={option}
                                 value={option}
                                 control={<Radio color='secondary' />}
                                 label={capitalize(option)}
                              />
                           ))
                        }
                     </RadioGroup>
                  </FormControl>

                  <FormGroup>
                     <FormLabel>Sizes</FormLabel>
                     {
                        validSizes.map(size => (
                           <FormControlLabel
                              key={size}
                              control={<Checkbox checked={getValues('sizes').includes(size)} />}
                              label={size}
                              onChange={() => onChangeSizes(size)}
                           />
                        ))
                     }
                  </FormGroup>

               </Grid>

               {/* Tags e imagenes */}
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Slug - URL"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register('slug', {
                        required: 'This field is required!',
                        validate: (value) => value.trim().includes(' ') ? 'This field cannot include blank spaces' : undefined
                     })}
                     error={!!errors.slug}
                     helperText={errors.slug?.message}
                  />

                  <TextField
                     label="Tags"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     value={newTagValue}
                     onChange={({ target }) => setNewTagValue(target.value)}
                     onKeyDown={({ code }) => code === 'Space' ? onNewTag() : undefined}
                     helperText="Press [Spacebar] to add"
                  />

                  <Box sx={{
                     display: 'flex',
                     flexWrap: 'wrap',
                     listStyle: 'none',
                     p: 0,
                     m: 0,
                  }}
                     component="ul">
                     {
                        getValues('tags').map((tag) => {

                           return (
                              <Chip
                                 key={tag}
                                 label={tag}
                                 onDelete={() => onDeleteTag(tag)}
                                 color="primary"
                                 size='small'
                                 sx={{ ml: 1, mt: 1 }}
                              />
                           );
                        })}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box display='flex' flexDirection="column">
                     <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
                     <Button
                        color="secondary"
                        fullWidth
                        startIcon={<UploadOutlined />}
                        className='circular-btn'
                        sx={{ mb: 3 }}
                        size='large'
                        onClick={() => fileInputRef.current?.click()}
                     >
                        Upload Image
                     </Button>
                     <input
                        ref={fileInputRef} // se utiliza el useRef para hacer referencia al botón que queremes realmente que haga la acción
                        type='file'
                        multiple
                        accept='image/png, image/gif, image/jpeg'
                        style={{ display: 'none' }}
                        onChange={onFileSelected}
                     />

                     <Chip
                        label="Two Image is Necesary"
                        color='error'
                        variant='outlined'
                        sx={{ display: getValues('images').length >= 2 ? 'none' : 'flex' }}
                     />

                     <Grid container spacing={2} marginTop='2px'>
                        {
                           getValues('images').map(img => (
                              <Grid item xs={4} sm={3} key={img}>
                                 <Card>
                                    <CardMedia
                                       component='img'
                                       className='fadeIn'
                                       image={img}
                                       alt={img}
                                    />
                                    <CardActions>
                                       <Button
                                          fullWidth
                                          color="error"
                                          sx={{ ":hover": { color: 'black' } }}
                                          onClick={() => onDeleteImage(img)}
                                       >
                                          Delete
                                       </Button>
                                    </CardActions>
                                 </Card>
                              </Grid>
                           ))
                        }
                     </Grid>

                  </Box>

               </Grid>

            </Grid>
         </form>
      </AdminLayout>
   )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   const { slug = '' } = query;
   let product: IProduct | null;
   if (slug === 'new') {
      const tempProduct = JSON.parse(JSON.stringify(new Product()));
      delete tempProduct._id;
      tempProduct.images = ['img1.jpg', 'img2.jpg'];
      product = tempProduct;
   } else {
      product = await dbProducts.getProductBySlug(slug.toString());
   }

   if (!product) {
      return {
         redirect: {
            destination: '/admin/products',
            permanent: false,
         }
      }
   }
   return {
      props: {
         product
      }
   }
}


export default ProductAdminPage