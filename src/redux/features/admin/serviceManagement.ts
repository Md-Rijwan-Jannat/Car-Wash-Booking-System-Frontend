import { TResponseRedux, TService } from "../../../types";
import { baseApi } from "../../api/baseApi";

const serviceManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: "/services",
          method: "GET",
          params, // Attach the URL parameters
        };
      },
      transformResponse: (response: TResponseRedux<TService[]>) => {
        return {
          data: response.data?.result || [],
          meta: response.data?.meta || {},
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllServicesQuery } = serviceManagementApi;
