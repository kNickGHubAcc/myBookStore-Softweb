import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { url } from "./api";

/*Δημιουργία ενός API με σκοπό την διευκόλυνση αποστολής requests στον server
προκειμένου να γίνεται ανάκτηση όλων των βιβλίων*/
export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({baseUrl: `${url}`}),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "products",
        })
    })
})


export const {useGetAllProductsQuery} = productsApi;