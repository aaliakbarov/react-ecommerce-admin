import { supabase } from './supabaseClient';

export const fetchOrders = async () => {
    const { data, error } = await supabase
        .from('Orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

export async function CreateOrder(formData, customers, products) {
    const customer = customers.find((c) => c.id === formData.customer_id);
    if (!customer) throw new Error('Invalid customer');

    const enrichedItems = formData.items.map((item) => {
        const product = products.find(
            (p) => String(p.id) === String(item.product_id)
        );
        return {
            product_id: Number(item.product_id),
            qnt: Number(item.qnt),
            unit_price: product?.price || 0,
        };
    });

    const totalAmount = enrichedItems.reduce(
        (sum, item) => sum + item.qnt * item.unit_price,
        0
    );

    const newOrder = {
        customer_id: customer.id,
        order_number: `#ORD${Date.now()}`,
        status: 'pending',
        amount: totalAmount,
        items: enrichedItems.map(({ product_id, qnt }) => ({
            product_id,
            qnt,
        })),
        created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('Orders').insert([newOrder]);
    if (error) throw error;
}

export const updateOrder = async (id, updates) => {
    const { error } = await supabase
        .from('Orders')
        .update(updates)
        .eq('id', id);

    if (error) throw error;
};

export const deleteOrder = async (id) => {
    const { error } = await supabase.from('Orders').delete().eq('id', id);

    if (error) throw error;
};
