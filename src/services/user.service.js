import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.NODE_ENV === 'production' ? "api/":"http://localhost:3002/api/";

const getPublicContent = () => axios.get(API_URL + 'all');

const getStaffBoard = () => axios.get(API_URL + 'staff', {headers: authHeader()});

const getManagementBoard = () => axios.get(API_URL + 'management', {headers: authHeader()});

const getAdminBoard = () => axios.get(API_URL + 'admin', {headers: authHeader()});

export default {
    getPublicContent,
    getStaffBoard,
    getManagementBoard,
    getAdminBoard
}