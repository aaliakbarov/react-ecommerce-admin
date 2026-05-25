import type { CreateProduct, Product, UpdateProduct } from '@/types/products';
import { supabase } from './supabaseClient';

export const fetchProducts = async (): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('Products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase Error:', error.message);
        throw error;
    }

    return data;
};

export const insertProduct = async (product: CreateProduct) => {
    const { error } = await supabase.from('Products').insert([product]);
    if (error) {
        console.error('Insert error:', error.message);
        throw error;
    }
};

export const updateProduct = async ({
    id,
    data,
}: {
    id: Product['id'];
    data: UpdateProduct;
}) => {
    const { error } = await supabase.from('Products').update(data).eq('id', id);
    if (error) throw error;
};

export const deleteProduct = async (id: Product['id']) => {
    const { error } = await supabase.from('Products').delete().eq('id', id);
    if (error) throw error;
};
