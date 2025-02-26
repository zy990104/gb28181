import axios from '@/utils/axios';  // 引入之前封装好的 axios 实例

// 获取验证码接口
export const getCaptcha = async () => {
    try {
        return await axios.post('/api/base/captcha');
    } catch (error) {
        throw new Error('获取验证码失败');
    }
};
