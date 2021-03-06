import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async login (username, password) {
        return await axios.post(`token/`, {
            username,
            password
        });
    },

    async refreshToken (token) {
        return await axios.post('token/refresh/', {
            refresh: token
        });
    }
}