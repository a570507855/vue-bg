import ajax from './ajax';
export default async (route, data, uploadProgress = null) => {
    return ajax.post({
        url: route,
        data: data,
        onUploadProgress:uploadProgress
    })
};