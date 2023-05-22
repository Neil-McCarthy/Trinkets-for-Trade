import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const trinketsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = trinketsAdapter.getInitialState()

export const trinketsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTrinkets: builder.query({
            query: () => '/trinkets',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedTrinkets = responseData.map(trinket => {
                    trinket.id = trinket._id
                    console.log(trinket)
                    return trinket
                });
                return trinketsAdapter.setAll(initialState, loadedTrinkets)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    console.log(result)
                    return [
                        { type: 'Trinket', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Trinket', id }))
                    ]
                } else return [{ type: 'Trinket', id: 'LIST' }]
            }
        }),
        addNewTrinket: builder.mutation({
            query: initialTrinketData => ({
                url: '/trinkets',
                method: 'POST',
                body: {
                    ...initialTrinketData,
                }
            }),
            invalidatesTags: [
                { type: 'trinket', id: "LIST" }
            ]
        }),
        updateTrinket: builder.mutation({
            query: initialTrinketData => ({
                url: '/trinkets',
                method: 'PATCH',
                body: {
                    ...initialTrinketData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'trinket', id: arg.id }
            ]
        }),
        deleteTrinket: builder.mutation({
            query: ({ id }) => ({
                url: `/trinkets`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'trinket', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetTrinketsQuery,
    useAddNewTrinketMutation,
    useUpdateTrinketMutation,
    useDeleteTrinketMutation
} = trinketsApiSlice

// returns the query result object
export const selectTrinketsResult = trinketsApiSlice.endpoints.getTrinkets.select()

// creates memoized selector
const selectTrinketsData = createSelector(
    selectTrinketsResult,
    trinketsResult => trinketsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTrinkets,
    selectById: selectTrinketById,
    selectIds: selectTrinketIds
    // Pass in a selector that returns the trinkets slice of state
} = trinketsAdapter.getSelectors(state => selectTrinketsData(state) ?? initialState)