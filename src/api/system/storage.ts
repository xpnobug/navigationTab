import axios from '../axios'; // 根据实际文件路径修改

const BASE_URL = '/navBucket/storage';

export interface DataRecord {
  id?: number;
  name?: string;
  code?: string;
  type?: number;
  accessKey?: string;
  secretKey?: string;
  endpoint?: string;
  bucketName?: string;
  domain?: string;
  description?: string;
  isDefault?: boolean;
  sort?: number;
  status?: number;
  createUser?: string;
  createTime?: string;
  updateUser?: string;
  updateTime?: string;
  createUserString?: string;
  updateUserString?: string;
}

export interface ListParam {
  name?: string;
  status?: string;
  page?: number;
  size?: number;
  sort?: Array<string>;
}

export interface PageRes<T> {
  records: { id?: number | undefined; name?: string | undefined; code?: string | undefined; type?: number | undefined; accessKey?: string | undefined; secretKey?: string | undefined; endpoint?: string | undefined; bucketName?: string | undefined; domain?: string | undefined; description?: string | undefined; isDefault?: boolean | undefined; sort?: number | undefined; status?: number | undefined; createUser?: string | undefined; createTime?: string | undefined; updateUser?: string | undefined; updateTime?: string | undefined; createUserString?: string | undefined; updateUserString?: string | undefined; }[];
  total: number;
  list: T;
}

export function list(params: ListParam) {
  return axios.get<PageRes<DataRecord[]>>(`${BASE_URL}`, {
    params,

  });
}

export function get(id: number) {
  return axios.get<DataRecord>(`${BASE_URL}/${id}`);
}

export function add(req: DataRecord) {
  return axios.post(BASE_URL, req);
}

export function update(req: DataRecord, id: number) {
  return axios.put(`${BASE_URL}/${id}`, req);
}

export function del(ids: number | Array<number>) {
  return axios.delete(`${BASE_URL}/${ids}`);
}
