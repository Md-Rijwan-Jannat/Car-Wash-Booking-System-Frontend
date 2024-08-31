import { TResponseRedux } from "../../../types";
import { TSlot } from "../../../types/slotManagement.type";
import { baseApi } from "../../api/baseApi";

const slotManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAvailabilitySlots: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: "/slots/availability",
          method: "GET",
          params,
        };
      },
      providesTags: ["slots"],
      transformResponse: (response: TResponseRedux<TSlot[]>) => {
        return {
          data: response.data?.result || [],
          meta: response.data?.meta || {},
        };
      },
    }),
    getAllServicesSlots: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: "/slots",
          method: "GET",
          params,
        };
      },
      providesTags: ["slots"],
      transformResponse: (response: TResponseRedux<TSlot[]>) => {
        return {
          data: response.data?.result || [],
          meta: response.data?.meta || {},
        };
      },
    }),
    getAllCarBookingSlotsWithService: builder.query({
      query: (id) => ({
        url: `/slots/${id}`,
        method: "GET",
      }),
    }),
    createSlots: builder.mutation({
      query: (data) => ({
        url: `/slots`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["slots"],
    }),
    updateSlotStatus: builder.mutation({
      query: (args) => ({
        url: `/slots/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["slots"],
    }),
  }),
});

export const {
  useGetAllCarBookingSlotsWithServiceQuery,
  useGetAllServicesSlotsQuery,
  useCreateSlotsMutation,
  useUpdateSlotStatusMutation,
} = slotManagementApi;
