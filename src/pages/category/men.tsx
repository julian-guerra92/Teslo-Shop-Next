
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';

const MenCategoryPage = () => {

	const { products, isLoading } = useProducts('/products?gender=men');

	return (
		<ShopLayout title={'Teslo-Shop - Men'} pageDescription={'Category Men Teslo products'}>
			<Typography variant='h1' component='h1'>Men</Typography>
			<Typography variant='h2' sx={{ mb: 1 }}>All Products for Men</Typography>
			{
				isLoading
					? <FullScreenLoading />
					: <ProductList products={products} />
			}
		</ShopLayout>
	)
}

export default MenCategoryPage;