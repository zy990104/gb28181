'use client';
import {useEffect, useState} from 'react';
import {getCaptcha, login} from "@/api/login/api";
import {CaptchaResponse, LoginFormData} from "@/api/login/types";
import {useRouter} from 'next/navigation';
import {setLoginToken} from "@/utils/cookies";


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchaId, setCaptchaId] = useState('');
    const [captchaImage, setCaptchaImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    // 获取验证码
    const handleGetCaptcha = async () => {
        const res: CaptchaResponse = await getCaptcha(); // 假设getCaptcha已经实现

        if (res.code === 0) {
            // 设置验证码图片和captchaId
            setCaptchaImage(res.data.picPath);
            setCaptchaId(res.data.captchaId);
        } else {
            setErrorMessage('验证码获取失败');
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 校验表单
        if (username === '' || password === '' || captcha === '') {
            setErrorMessage('用户名、密码或验证码不能为空');
            return;
        }

        try {
            const data: LoginFormData = {
                username: username,
                password: password,
                captcha: captcha,
                captchaId: captchaId,
            }
            const res = await login(data)
            // 模拟登录请求，传递账号、密码和验证码

            if (res.code === 0) {
                const expiresIn = 3600 * 2; // 假设 token 有效期为 1 小时
                setLoginToken(res.data.token, expiresIn); // 存储 token 和过期时间
                router.push('/home');  // 跳转到home页面
            } else {
                setErrorMessage('用户名、密码或验证码错误');
            }
        } catch (error) {
            setErrorMessage(`请求失败，请重试：${error}`);
        }
    };

    useEffect(() => {
        handleGetCaptcha().then();
    }, []);
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">登录</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">用户名</label>
                        <input
                            type="text"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="请输入用户名"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">密码</label>
                        <input
                            type="password"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="请输入密码"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* 验证码输入框和图片 */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">验证码</label>
                        <div className="flex items-center">

                            <input
                                type="text"
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="请输入验证码"
                                value={captcha}
                                onChange={(e) => setCaptcha(e.target.value)}
                            />
                            {captchaImage ? (
                                <img src={captchaImage} alt="验证码" className="w-24 h-8 mr-2"/>
                            ) : null}
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        登录
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        没有账号? <a href="#" className="text-blue-500 hover:underline">注册</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login