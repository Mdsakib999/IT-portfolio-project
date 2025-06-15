import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://it-server-ten.vercel.app/api',
})

export default axiosInstance