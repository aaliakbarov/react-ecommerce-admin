export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    status: 'Active' | 'Discontinued';
};

export type CreateProduct = Omit<Product, 'id'>;
export type UpdateProduct = Partial<Omit<Product, 'id'>>;
