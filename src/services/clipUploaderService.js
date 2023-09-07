import axios from 'axios';
const UPLOAD_SERVICE_URL = "/uploadapi/users";
//const baseURL = import.meta.env.DEV === true ? UPLOAD_SERVICE_URL : import.meta.env.VITE_CLIPS_API;
const baseURL = UPLOAD_SERVICE_URL;

const uploadClip = async (token, file, name, desc, isPublic, onUploadProgress) => {

    const data = new FormData()
    data.append('file', file)
    data.append('name', name)
    data.append('description', desc)
    data.append('public', isPublic)

    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        onUploadProgress: onUploadProgress,
    }

    return await axios.post(baseURL + "/my/clips", data, config)
}

export const clipUploaderService = {
    uploadClip,
}