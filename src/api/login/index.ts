import axios from '../axios';
const BASE_URL = '/qqLogin';


export function loginByQQ() {
  return axios.get(`${BASE_URL}/oauth`, {

  });
}

