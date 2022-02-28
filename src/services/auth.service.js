import axios from "axios";

const API_URL = process.env.NODE_ENV === 'production' ? "api/auth":"http://localhost:3002/api/auth";
const register = (username, email, password) => {
    return axios.post(API_URL + 'signup',{
        username,
        email,
        password
    })
}

const login = async (username, password) => {

    let res = await axios.post(API_URL + 'signin',{username, password});
    res = await res.data;

    localStorage.setItem('user', JSON.stringify(res));
    return res;
}

const logout = () => { localStorage.removeItem('user')};

export default {
    register,
    login,
    logout
}