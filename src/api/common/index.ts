import axios from '../axios';


const BASE_URL = '/common';


export function upload(data: FormData) {
  return axios.post(`${BASE_URL}/file`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

