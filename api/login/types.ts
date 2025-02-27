export interface CaptchaResponse {
    code: number; // 状态码
    msg: string;  // 消息
    data: {
        captchaId: string;  // 验证码 ID
        picPath: string;    // 验证码图片路径
        captchaLength: number; // 验证码长度
        openCaptcha: boolean; // 是否启用验证码
    };
}

export interface LoginFormData {
    username: string;
    password: string;
    captchaId: string;
    captcha: string;
}