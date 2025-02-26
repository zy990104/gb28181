'use client'
import { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 模拟简单的验证
        if (username === '' || password === '') {
            setErrorMessage('用户名或密码不能为空');
            return;
        }

        // 模拟登录成功（这里可以加入实际的登录逻辑）
        if (username === 'admin' && password === '123456') {
            alert('登录成功!');
            // 跳转或其他逻辑
        } else {
            setErrorMessage('用户名或密码错误');
        }
    };

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
