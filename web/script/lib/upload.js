import {
    upload
} from './ajax';
export default async (route, data, params = null, uploadProgress = null) => {
    return upload({
        method: 'post',
        url: route,
        data: data,
        params,
        onUploadProgress: uploadProgress
    })
};