import { inject } from 'vue';
import type { AxiosInstance } from 'axios';

export function useAxios(): AxiosInstance {
  const axios = inject<AxiosInstance>('axios');
  if (!axios) {
    throw new Error('Axios instance not provided');
  }
  return axios;
}