import axios from "axios";
const guardInstance = (token) =>{
    const instance = axios.create({
        baseURL: process.env.baseUrl,
    })
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return instance
}

module.exports = {
    guardInstance
}
