import axios from 'axios';
const CLIP_UPLOADER_SERVICE_URL = "/aapi/users";

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

    return await axios.post(CLIP_UPLOADER_SERVICE_URL + "/my/clips", data, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))

}

export const clipUploaderService = {
    uploadClip,
}