import axios from '@/utils/axios';
import {AxiosResponse} from "axios";
import {CaptchaResponse, LoginFormData} from "@/api/login/types";  // 引入之前封装好的 axios 实例

// // 获取验证码接口
// export const getCaptcha = async () => {
//     try {
//         return await axios.post('/base/captcha');
//     } catch (error) {
//         throw new Error('获取验证码失败');
//     }
// };
// 修改 getCaptcha 函数的返回类型
export const getCaptcha = async (): Promise<CaptchaResponse> => {
    const response: AxiosResponse<CaptchaResponse> = await axios.post('/api/base/captcha');
    return response.data;
};
// 修改 getCaptcha 函数的返回类型
export const login = async (data:LoginFormData) => {
    const response = await axios.post('/api/base/login', data);
    return response.data;
};
