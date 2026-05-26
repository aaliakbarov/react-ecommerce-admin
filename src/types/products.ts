export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    status: 'active' | 'discontinued';
    created_at: string;
};

export type CreateProduct = Omit<Product, 'id' | 'created_at'>;
export type UpdateProduct = Partial<CreateProduct>;
