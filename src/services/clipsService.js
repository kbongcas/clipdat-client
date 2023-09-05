import axios from 'axios';
const CLIPS_SERVICE_URL = "/clipsapi/users";
//const baseURL = import.meta.env.DEV === true ? CLIPS_SERVICE_URL : import.meta.env.VITE_CLIPS_API;
const baseURL = CLIPS_SERVICE_URL;

const getMyClips = async (token, page = 1, pageSize = 10) => {
    let query = `?page=${page}&pageSize=${pageSize}`
    return axios.get(baseURL + "/my/clips" + query,
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