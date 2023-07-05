import axios from 'axios';

export const getBedList = (params?: any) => {
  return axios.post('/admin/bed_list', params);
};
