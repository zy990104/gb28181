// 设置 token 和过期时间到 cookies
export const setLoginToken = (token: string, expiresIn: number) => {
    const expiresAt = new Date(new Date().getTime() + expiresIn * 1000); // expiresIn 是秒
    document.cookie = `token=${token}; path=/; expires=${expiresAt.toUTCString()}; Secure; HttpOnly`;
    document.cookie = `expiresAt=${expiresAt.toUTCString()}; path=/; expires=${expiresAt.toUTCString()}; Secure; HttpOnly`;
};
