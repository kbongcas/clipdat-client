import axios from 'axios';
const CLIPS_SERVICE_URL = "/clipsapi/users";
const baseURL = import.meta.env.DEV ? CLIPS_SERVICE_URL : import.meta.env.VITE_CLIPS_API;

const getMyClips = async (token) => {
    return axios.get(baseURL + "/my/clips",
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    )
}

export const clipsService = {
    getMyClips,
}