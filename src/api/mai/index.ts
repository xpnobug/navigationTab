import axios from '../axios';
import {DataRecord} from "@/api/system/storage";
const BASE_URL = '/mai';

export interface ListParam {
    ttType?: number;
    picType?: number;
    pageNum?: number;
    pageSize?: number;
}

export interface PageRes<T> {
    records: { id?: number | undefined; name?: string | undefined; code?: string | undefined; type?: number | undefined; accessKey?: string | undefined; secretKey?: string | undefined; endpoint?: string | undefined; bucketName?: string | undefined; domain?: string | undefined; description?: string | undefined; isDefault?: boolean | undefined; sort?: number | undefined; status?: number | undefined; createUser?: string | undefined; createTime?: string | undefined; updateUser?: string | undefined; updateTime?: string | undefined; createUserString?: string | undefined; updateUserString?: string | undefined; }[];
    total: number;
    list: T;
}

export function getMaiInfo(maiPage: ListParam) {
    return axios.post(`${BASE_URL}/getMaiInfo`, maiPage);
}


export function getImgList(params: ListParam) {
    return axios.get<PageRes<ListParam[]>>(`/imgMai/getImgList`, {
        params,
    });
}
