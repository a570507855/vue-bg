import ajax from './ajax';
export default async (route, data, params, uploadProgress = null) => {
    return ajax({
        method: 'post',
        url: route,
        data: data,
        params,
        onUploadProgress: uploadProgress
    })
};