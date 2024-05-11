import { apiSlice } from './apiSlice';

const BASE_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}`,
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${BASE_URL}/logout`,
                method: 'POST'
            })
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/profile`,
                method: 'PUT',
                body: data
            })
        })
    })
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useUpdateMutation } = usersApiSlice;