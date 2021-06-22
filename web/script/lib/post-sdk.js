import ajax from './ajax';
export default async (route, data, uploadProgress = null) => {
    return ajax({
        method: 'post',
        url: route,
        data: data,
        onUploadProgress:uploadProgress
    })
};