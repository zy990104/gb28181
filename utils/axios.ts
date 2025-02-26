import axios from 'axios';

// 创建一个 Axios 实例
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // 设置默认API URL
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 可以在这里添加 token 或其他请求头
        const token = localStorage.getItem('token'); // 例如从 localStorage 获取 token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data; // 直接返回 data 部分
    },
    (error) => {
        if (error.response) {
            // 服务器返回的错误
            console.error('Error response:', error.response);
        } else if (error.request) {
            // 请求没有收到回应
            console.error('Error request:', error.request);
        } else {
            // 其他错误
            console.error('Error message:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
