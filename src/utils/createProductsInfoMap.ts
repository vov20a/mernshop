import { IProductInfo, ISipmleProductsInfo } from "../types/IOrder";
import { IProduct } from "../types/IProduct";

export const createProductsInfoMap = (products: IProduct[], simpleProducts: ISipmleProductsInfo[]): Map<string, IProductInfo> => {
    let arrObj = new Map() as Map<string, IProductInfo>;

    for (let i = 0; i < products.length; ++i) {
        for (let j = 0; j < simpleProducts.length; ++j) {
            const key: string = products[i]._id as string
            if (key === simpleProducts[j].value) {
                const value = { product: products[i], count: 1 }
                arrObj.set(key, value)
                break;
            }
            else {
                // if (j === simpleProducts.length - 1) {
                const key: string = products[i]._id as string
                const value = { product: products[i], count: 0 }
                arrObj.set(key, value)
                // }
                // else continue
            }
        }
    }

    return arrObj
}