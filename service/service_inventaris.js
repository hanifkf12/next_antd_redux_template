const {guardInstance} = require("../utils/axiosConfig");
const {message} = require("antd");
const baseUrl = process.env.baseUrl;

const saveData = async (data, token) => {
    try {
        const {data: response} = await guardInstance(token).post(`${baseUrl}/api/v1/inventaris/add/new`, data)
        console.log(response)
        return response.status
    } catch (e) {
        message.error(e.message);
        console.log(e.response);
    }
}

const getAllCategories = async (token) => {
    try {
        const {data: response} = await guardInstance(token).get(`${baseUrl}/api/v1/inventaris/category/all`)
        console.log(response)
        return response.data
    } catch (e) {
        message.error(e.message);
        console.log(e.response);
    }
}

const getAllInventaris = async (token) => {
    try {
        const {data: response} = await guardInstance(token).get(`${baseUrl}/api/v1/inventaris/all`)
        console.log(response)
        return response.data;
    } catch (e) {
        message.error(e.message);
        console.log(e.response);
    }
}

const deleteInventaris = async (data, token) => {
    try {
        const {data: response} = await guardInstance(token).delete(`${baseUrl}/api/v1/inventaris/delete/${data}`)
        if(response.status){
            message.success('Data Berhasil Dihapus')
        }
    } catch (e) {
        message.error(e.message);
        console.log(e.response);
    }
}

const updateInventaris = async (id, data, token) => {
    try {
        const {data: response} = await guardInstance(token).put(`${baseUrl}/api/v1/inventaris/update/${id}`, data)
    } catch (e) {
        message.error(e.message);
        console.log(e.response);
    }
}

module.exports = {
    saveData,
    getAllCategories,
    getAllInventaris,
    deleteInventaris,
    updateInventaris
}

