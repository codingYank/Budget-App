import { CATEGORIES_URL } from "../constants"
import { apiSlice } from "./apiSlice"

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: CATEGORIES_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useGetCategoriesQuery, useCreateCategoryMutation } =
  categoriesApiSlice
