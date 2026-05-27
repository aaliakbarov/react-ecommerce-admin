type OrderItem = {
    product_id: number;
    qnt: number;
};

export type Order = {
    id: string;
    customer_id: string;
    created_at: string;
    order_number: string;
    amount: number;
    items: OrderItem[];
    status: 'pending' | 'shipped' | 'cancelled';
};

export type RecentOrder = Omit<Order, 'order_number' | 'items'>;

export type CreateOrderForm = {
    customer_id: string;
    status: 'pending' | 'shipped' | 'cancelled';
    items: {
        product_id: string;
        qnt: number;
    }[];
};

export type CreateOrderPayload = Omit<
    Order,
    'id' | 'created_at' | 'order_number' | 'amount' | 'status'
>;

export type UpdateOrder = Partial<
    Omit<
        Order,
        | 'id'
        | 'created_at'
        | 'order_number'
        | 'amount'
        | 'items'
        | 'customer_id'
    >
>;
