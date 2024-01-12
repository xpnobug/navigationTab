import instance from './axios'; // 根据实际文件路径修改

const blogList = async (type) => {
    try {
        const response = await instance.get('/navBlog/list', {
            params: { type }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
const getPostList = async (keyId) => {
    try {
        const response = await instance.get('/navBlog/getPostList', {
            params: { keyId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
const syncAdd = async (datas) => {
    try {
        const response = await instance.post('/navBlog/syncAdd',datas);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getBlogFlList = async (type) => {
    try {
        const response = await instance.get('/navBlogFenlei/getBlogFlList', {
            params: { type }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { blogList, getPostList, syncAdd, getBlogFlList };