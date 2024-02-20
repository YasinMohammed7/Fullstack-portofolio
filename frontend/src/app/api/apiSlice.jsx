import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  tagTypes: ["Message", "User"],
  endpoints: (builder) => ({}),
});
