import { TRANSACTIONS_URL } from "../constants"
import { apiSlice } from "./apiSlice"

export const transactionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${TRANSACTIONS_URL}`,
        method: "GET",
        params: {
          keyword,
          pageNumber,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getRecentTransactions: builder.query({
      query: () => ({
        url: `${TRANSACTIONS_URL}/recent`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getCategoryTransactions: builder.query({
      query: ({ id, page }) => ({
        url: `${TRANSACTIONS_URL}/${id}`,
        params: {
          page,
        },
      }),
      providesTags: ["Transaction"],
      keepUnusedDataFor: 5,
    }),
    createTransaction: builder.mutation({
      query: (data) => ({
        url: TRANSACTIONS_URL,
        method: "POST",
        body: data,
      }),
    }),
    createPaycheck: builder.mutation({
      query: (data) => ({
        url: `${TRANSACTIONS_URL}/paycheck`,
        method: "POST",
        body: data,
      }),
    }),
    getFavoritePaychecks: builder.query({
      query: () => ({
        url: `${TRANSACTIONS_URL}/paycheck/favorites`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetTransactionsQuery,
  useGetRecentTransactionsQuery,
  useGetCategoryTransactionsQuery,
  useCreateTransactionMutation,
  useCreatePaycheckMutation,
} = transactionsApiSlice
