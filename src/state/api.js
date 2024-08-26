import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
} from "./types.ts";
const URL = "https://finance-app-backend-2na6.onrender.com/";
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    getKpis: build.query({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
    getTransactions: build.query({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
  api;
  
