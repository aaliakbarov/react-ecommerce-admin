import AddProductDialog from '@/features/products/AddProductDialog';
import { ProductList } from '@/features/products/ProductList';

export default function Products() {
    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-semibold'>Products</h1>
                <AddProductDialog />
            </div>
            <ProductList />
        </div>
    );
}
