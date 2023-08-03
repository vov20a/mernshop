import { createSelector, createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'
import { ICategory } from '../../types/ICategory'
import { RootState } from "../../app/store"

// export interface ProductsResponse {
//     ids: string[],
//     entities: { id: string }
// };

const categoriesAdapter = createEntityAdapter({
    // sortComparer:()=>
})
const initialState = categoriesAdapter.getInitialState({})

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query<EntityState<unknown>, any>({
            query: () => ({
                url: '/categories',
                validateStatus: (response: any, result: any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: (responseData: ICategory[]) => {
                const loadedCategories = responseData.map(category => {
                    category.id = category._id
                    return category
                });
                return categoriesAdapter.setAll(initialState, loadedCategories)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Category', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Category' as const, id }))
                    ]
                } else return [{ type: 'Category', id: 'LIST' }]
            }
        }),
        addNewCategory: builder.mutation({
            query: initialNote => ({
                url: '/categories',
                method: 'POST',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: [
                { type: 'Category', id: "LIST" }
            ]
        }),
        updateCategory: builder.mutation({
            query: initialNote => ({
                url: '/categories',
                method: 'PATCH',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `/categories`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
    })
})

export const { useGetCategoriesQuery, useAddNewCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoriesApiSlice