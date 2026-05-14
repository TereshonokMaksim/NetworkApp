import { baseApi } from '../../api/base-api';
    
const friendsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    removeFriend: build.mutation<void, string>({
      query: (id) => ({ url: `friends/${id}`, method: 'DELETE' }),
      invalidatesTags: ['user'],
    }),
  }),
});