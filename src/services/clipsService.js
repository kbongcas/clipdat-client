import axios from 'axios';
const CLIPS_SERVICE_URL = "/clipsapi/users";

const getMyClips = async (token) => {
    return axios.get(CLIPS_SERVICE_URL + "/my/clips",
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