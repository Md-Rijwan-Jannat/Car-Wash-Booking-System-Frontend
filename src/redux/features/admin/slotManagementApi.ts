import { TResponseRedux } from "../../../types";
import { TSlot } from "../../../types/slotManagement.type";
import { baseApi } from "../../api/baseApi";

const slotManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
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
          params, // Attach the URL parameters
        };
      },
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
  }),
});

export const { useGetAllCarBookingSlotsWithServiceQuery } = slotManagementApi;
