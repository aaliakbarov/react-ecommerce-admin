import { supabase } from './supabaseClient';

export const fetchProducts = async () => {
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

export const insertProduct = async (product) => {
    const { error } = await supabase.from('Products').insert([product]);
    if (error) {
        console.error('Insert error:', error.message);
        throw error;
    }
};

export const updateProduct = async ({ id, data }) => {
    const { error } = await supabase.from('Products').update(data).eq('id', id);
    if (error) throw error;
};

export const deleteProduct = async (id) => {
    const { error } = await supabase.from('Products').delete().eq('id', id);
    if (error) throw error;
};
