
import { IProduct } from "./IProduct";
import { IUser } from "./IUserType";

export interface IProductInfo {
    product: IProduct;
    count: number;
}

export interface IOrder {
    _id?: string;
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    productsInfo: IProductInfo[];
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
    totalPrice: number;
}
export interface IOrderCreate {
    _id?: string;
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    user: string;
    productsInfo: IProductInfo[];
    totalPrice: number;
}
export type ISipmleProductsInfo = {
    value: string | undefined;
    title: string;
}
export type IProductInfoCount = {
    id: string | undefined;
    count: number | undefined;
}