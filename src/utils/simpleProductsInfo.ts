import { IProductInfo, ISipmleProductsInfo } from "../types/IOrder"


export const simpleProductsInfo = (productsInfo: IProductInfo[]): ISipmleProductsInfo[] => {
    const arr: ISipmleProductsInfo[] = [] as ISipmleProductsInfo[];
    for (let i = 0; i < productsInfo.length; ++i) {
        arr.push({ value: productsInfo[i]?.product?._id, title: productsInfo[i].product.title })
    }
    return arr;
}