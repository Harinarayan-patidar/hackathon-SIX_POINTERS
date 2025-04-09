const BASE_URL = "http://localhost:4000/api/v1"

export const Categories ={
    CATEGORIES_API : BASE_URL + "/course/showAllCategory",
    
}

export const Authentication ={
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    SEND_OTP_API: BASE_URL + "/auth/sendOTP",
    CHANGEPASSWORD_API: BASE_URL + "/auth/changePassword",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",
    
}