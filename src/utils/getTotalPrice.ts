import { Dictionary, EntityId } from "@reduxjs/toolkit";
import { IProduct } from "../types/IProduct";

export const getTotalPrice = (ids: EntityId[], entities: Dictionary<IProduct>) => {
    const totalPrice = ids.reduce((sum: number, id: EntityId) => {
        const product = entities[id] as unknown as IProduct;
        if (product.count) {
            sum = product.price * product.count + sum;
        }
        return sum;
    }, 0);
    return totalPrice;
}