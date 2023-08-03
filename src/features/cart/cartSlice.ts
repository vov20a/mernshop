import {
    createSlice,
    createEntityAdapter,
    PayloadAction,
    EntityState,
    EntityId,
    Dictionary
} from '@reduxjs/toolkit';
import { IProduct } from '../../types/IProduct';
import { RootState } from '../../app/store';
import { getTotalPrice } from '../../utils/getTotalPrice';


const cartAdapter = createEntityAdapter<EntityState<IProduct>>({
    // sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const data = localStorage.getItem("cart");
const items: { ids: EntityId[], entities: Dictionary<IProduct>, totalPrice: number } = data ? JSON.parse(data) : [];


const initialState = cartAdapter.getInitialState({ ...items });

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<IProduct>) {
            const findItemId = state.ids.find((id) => id === action.payload.id as EntityId)
            // console.log(findItemId)

            if (findItemId) {
                const findItem = state.entities[findItemId] as unknown as IProduct;
                if (findItem.count) findItem.count++;

                cartAdapter.upsertOne(state, findItem as unknown as EntityState<IProduct>);
            }
            else {
                const product = action.payload as unknown as IProduct;
                if (!product.count) product.count = 1
                cartAdapter.addOne(state, product as unknown as EntityState<IProduct>);
            }

            state.totalPrice = getTotalPrice(state.ids, state.entities);

            const item = JSON.stringify({ ids: state.ids, entities: state.entities, totalPrice: state.totalPrice })
            localStorage.setItem('cart', item);
        },
        minusProduct(state, action: PayloadAction<IProduct>) {
            const findItemId = state.ids.find((id) => id === action.payload.id as EntityId)
            // console.log(findItemId)

            if (findItemId) {
                const findItem = state.entities[findItemId] as unknown as IProduct;
                if (findItem.count && findItem.count > 1) findItem.count--
                else if (findItem.count && findItem.count <= 1) {
                    cartAdapter.removeOne(state, findItemId);
                }
            }

            state.totalPrice = getTotalPrice(state.ids, state.entities);

            const item = JSON.stringify({ ids: state.ids, entities: state.entities, totalPrice: state.totalPrice })
            localStorage.setItem('cart', item);
        },
        removeProduct(state, action: PayloadAction<string>) {
            const id: string = action.payload;
            if (!state.entities[id]) {
                console.log('Delete could not complete');
                return;
            }
            cartAdapter.removeOne(state, id);

            state.totalPrice = getTotalPrice(state.ids, state.entities);

            const item = JSON.stringify({ ids: state.ids, entities: state.entities, totalPrice: state.totalPrice })
            localStorage.setItem('cart', item);
        },
        removeProductAll(state) {
            cartAdapter.removeAll(state);
            state.totalPrice = 0
            const item = JSON.stringify({ ids: state.ids, entities: state.entities, totalPrice: state.totalPrice })
            localStorage.setItem('cart', item);
        }
    },
})

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCart,
    // selectById: selectPostById,
    // selectIds: selectPostIds,
    // Pass in a selector that returns the posts slice of state
} = cartAdapter.getSelectors((state: RootState) => state.cart);

export const selectTotalPrice = ((state: RootState) => state.cart.totalPrice)

// export const { addProduct, removeProduct, removeProductAll, minusProduct } = cartSlice.actions;
export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;