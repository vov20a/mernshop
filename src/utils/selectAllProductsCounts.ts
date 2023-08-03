import { IProductInfo } from "../types/IOrder";
import { IProduct } from "../types/IProduct";


// type ObjectKey<Obj> = keyof Obj;
// type PaymentKeys = ObjectKey<ArrObj>;




export const selectAllProductsCounts = (products: IProduct[], orderProductsInfo: IProductInfo[]): Map<string, IProductInfo> => {
    let arrObj = new Map() as Map<string, IProductInfo>;

    // let key: PaymentKeys = 'key';
    for (let i = 0; i < products.length; ++i) {
        for (let j = 0; j < orderProductsInfo.length; ++j) {
            const key: string = products[i]._id as string
            if (key === orderProductsInfo[j].product._id) {
                const value = { product: products[i], count: orderProductsInfo[j].count }
                arrObj.set(key, value)
                break;
            }
            else {
                // if (j === orderProductsInfo.length - 1) {
                const key: string = products[i]._id as string
                const value = { product: products[i], count: 0 }
                arrObj.set(key, value)
                // }
                // else continue
            }
        }
    }

    // console.log(arrObj)
    return arrObj;
}