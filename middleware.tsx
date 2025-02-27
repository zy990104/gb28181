// pages/_middleware.ts
import {NextResponse} from 'next/server';
import cookies from 'next-cookies';

export function middleware(req) {
    // 获取当前页面的 URL
    const baseUrl = req.nextUrl.origin;

    // 排除访问登录页的情况，不进行重定向
    if (req.nextUrl.pathname === '/login') {
        return NextResponse.next();
    }
    console.log('中间件')
    const {token, expiresAt} = cookies({req});
    console.log(token)
    console.log(expiresAt)
    //
    // // 如果没有 token 或 token 已过期，重定向到登录页面
    // if (!token || !expiresAt) {
    //     return NextResponse.redirect(new URL('/login', baseUrl));  // 使用 baseUrl 来拼接
    // }
    //
    // // 如果 token 已过期，跳转到登录页面
    // const expiryDate = new Date(expiresAt);
    // if (expiryDate < new Date()) {
    //     return NextResponse.redirect(new URL('/login', baseUrl));  // 使用 baseUrl 来拼接
    // }
    //
    // // 如果有 token 且未过期，继续处理请求
    // return NextResponse.next();
}
