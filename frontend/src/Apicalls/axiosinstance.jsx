import axios from 'axios';

const token = localStorage.getItem('token')
// console.log("token",token);
const axiosInstance = axios.create({
    headers:{
        authorization:`Bearer ${token}`,
    }
})
export default axiosInstance;