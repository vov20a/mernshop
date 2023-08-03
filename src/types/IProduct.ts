import { ICategory } from "./ICategory";

export interface IProduct {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    category: ICategory;
    productImg?: string;
    rating: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    count?: number;
}
export interface ICartProduct extends IProduct {
    count: number;
}