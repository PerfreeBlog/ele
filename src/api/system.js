import axios from "./axios.js";

export function menuListApi() {
    return axios.get('/api/menuList');
}
