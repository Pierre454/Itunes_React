import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URI
const headers = {}

const axiosInstance = axios.create({
    baseURL,
    headers,
})

axiosInstance.interceptors.request.use(
    (config) => {
        headers['token'] = localStorage.getItem('token')
        return { ...config, headers }
    },
    (e) => Promise.reject(e)
)

axiosInstance.interceptors.response.use(
    (r) => r,
    (e) => Promise.reject(e)
)

export default axiosInstance
