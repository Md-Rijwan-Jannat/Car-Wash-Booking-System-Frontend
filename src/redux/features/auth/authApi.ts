import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getMe: builder.query({
      query: (email) => ({
        url: `/auth/${email}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (id) => ({
        url: `/auth/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetMeQuery,
  useUpdateUserMutation,
} = authApi;
