import axios from 'axios';

const BASE_URL = '/system/file';

export interface FileItem {
  id: string;
  name: string;
  size: number;
  url: string;
  extension: string;
  type?: string;
  storageId?: string;
  createUser?: string;
  createTime?: string;
  updateUser?: string;
  updateTime: string;
  createUserString?: string;
  updateUserString?: string;
}

export interface ListParam {
  name?: string;
  type?: string;
  sort?: Array<string>;
}

export function list(params: ListParam) {
  return axios.get<FileItem[]>(`${BASE_URL}/list`, {
    params,

  });
}

export interface FileItemUpdate {
  name: string;
}

export function update(req: FileItemUpdate, id: string) {
  return axios.put(`${BASE_URL}/${id}`, req);
}

export function del(ids: string | Array<string>) {
  return axios.delete(`${BASE_URL}/${ids}`);
}
