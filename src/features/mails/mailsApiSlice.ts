import { createSelector, createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'
import { IOrder } from '../../types/IOrder'
import { RootState } from "../../app/store"

// export interface ProductsResponse {
//     ids: string[],
//     entities: { id: string }
// };

const mailsAdapter = createEntityAdapter({
    // sortComparer:()=>
})
const initialState = mailsAdapter.getInitialState({})

export const mailsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addOrderMail: builder.mutation({
            query: (initialMailData) => {
                return {
                    url: '/mails',
                    method: 'POST',
                    body: {
                        ...initialMailData,
                    }
                }
            },
            // invalidatesTags: [
            //     { type: 'Mail', id: "LIST" }
            // ]
        }),
        checkEmail: builder.mutation({
            query: (params) => {
                return {
                    url: '/mails/restore',
                    method: 'POST',
                    body: { ...params }
                }
            },
            // invalidatesTags: [
            //     { type: 'Mail', id: "LIST" }
            // ]
        }),
        createPassword: builder.mutation({
            query: (params) => {
                return {
                    url: '/mails/create',
                    method: 'POST',
                    body: { ...params }
                }
            },
            // invalidatesTags: [
            //     { type: 'Mail', id: "LIST" }
            // ]
        }),
    })

})

export const { useAddOrderMailMutation, useCheckEmailMutation, useCreatePasswordMutation } = mailsApiSlice