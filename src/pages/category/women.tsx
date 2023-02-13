
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';

const WomenCategoryPage = () => {

	const { products, isLoading } = useProducts('/products?gender=women');

	return (
		<ShopLayout title={'Teslo-Shop - Women'} pageDescription={'Category Women Teslo products'}>
			<Typography variant='h1' component='h1'>Women</Typography>
			<Typography variant='h2' sx={{ mb: 1 }}>All Products for Women</Typography>
			{
				isLoading
					? <FullScreenLoading />
					: <ProductList products={products} />
			}
		</ShopLayout>
	)
}

export default WomenCategoryPage;