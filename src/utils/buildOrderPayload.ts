import type { CreateOrderForm, CreateOrderPayload } from '@/types/orders';
import type { Customer } from '@/types/customers';
import type { Product } from '@/types/products';

// Building payload for order creation

export default function buildOrderPayload(
    formData: CreateOrderForm,
    customers: Customer[],
    products: Product[],
): CreateOrderPayload {
    const customer = customers.find((c) => c.id === formData.customer_id);
    if (!customer) throw new Error('Invalid customer');

    const enrichedItems = formData.items.map((item) => {
        const product = products.find(
            (p) => String(p.id) === String(item.product_id),
        );
        return {
            product_id: Number(item.product_id),
            qnt: Number(item.qnt),
            unit_price: product?.price || 0,
        };
    });

    const totalAmount = enrichedItems.reduce(
        (sum, item) => sum + item.qnt * item.unit_price,
        0,
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
    return newOrder;
}
