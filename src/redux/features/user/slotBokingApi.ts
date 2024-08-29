import { baseApi } from "../../api/baseApi";

const slotBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlotBookings: builder.mutation({
      query: (data) => {
        return {
          url: "/bookings",
          method: "POST",
          body: data,
        };
      },
    }),
    getSingleService: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "Get",
      }),
    }),
  }),
});

export const { useCreateSlotBookingsMutation, useGetSingleServiceQuery } =
  slotBookingApi;
