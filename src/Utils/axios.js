import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://it-server-1kry.onrender.com/api/',
})

export default axiosInstance