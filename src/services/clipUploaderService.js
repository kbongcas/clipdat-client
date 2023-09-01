import axios from 'axios';
const baseURL = import.meta.env.VITE_UPLOAD_API

const uploadClip = async (token, file, name, desc, isPublic, onUploadProgress) => {

    const data = new FormData()
    console.log(file)
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
        .then(res => console.log(res))
        .catch(err => console.log(err))

}

export const clipUploaderService = {
    uploadClip,
}