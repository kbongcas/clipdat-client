import axios from 'axios';
const baseURL = import.meta.env.VITE_CLIPS_API

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