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
    }),
    getRecentTransactions: builder.query({
      query: () => ({
        url: `${TRANSACTIONS_URL}/recent`,
        method: "GET",
      }),
    }),
  }),
})

export const { useGetTransactionsQuery, useGetRecentTransactionsQuery } =
  transactionsApiSlice
