import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c8bb4e2b-2692-428e-85fb-e1595485b124'
    }
})

export const userApi = {
    getUsers1(currentPage = 1, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    getUsers2(pageNumber, pageSize) {
        return instance.get(`users?page=${pageNumber}&count=${pageSize}`)
    },
    follow(id) {
        return instance.post(`follow/${id}`, {})
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`)
    }
}

export const authApi = {
    getAuth() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha= null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const profileApi = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile){
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    },
}

export const securityApi = {
    getCaptcha(){
        return instance.get('/security/get-captcha-url')
    }
}