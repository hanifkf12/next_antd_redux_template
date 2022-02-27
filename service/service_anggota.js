const {guardInstance} = require('../utils/axiosConfig');
const {message} = require('antd');
const baseUrl = process.env.baseUrl;

const tambahAnggota = async (data, token) => {
    try {
        const {data: response} = await guardInstance(token).post(`${baseUrl}/api/v1/anggota/add/new`, data)
        console.log(response)
        if (response.status){
            message.success('Data berhasil Ditambahkan')
        }
        return response.status
    }catch (e) {
        message.error(e.message);
        console.log(e.response);
    }
}

const updateAnggota = async (id, data, token) => {
    try {
        const {data: response} = await guardInstance(token).put(`${baseUrl}/api/v1/anggota/update/${id}`, data)
        if(response.status){
            message.success('Data berhasil Diubah')
        }
        return response.status

    }catch (e) {
        message.error(e.message);
        console.log(e.response);
    }
}

const getAllAnggota = async (token) => {
    try {
        const {data: response} = await guardInstance(token).get(`${baseUrl}/api/v1/anggota/all`)
        return response.data
    }catch (e) {
        message.error(e.message);
        console.log(e.response);
    }
}

const deleteAnggota = async (id, token) => {
    try {
        const {data: response} = await guardInstance(token).delete(`${baseUrl}/api/v1/anggota/delete/${id}`)
        if(response.status){
            message.success('Data Berhasil Dihapus')
        }
    }catch (e) {
        message.error(e.message);
        console.log(e.response);
    }
}

const detailAnggota = async (id, token) => {
    try {
        const {data: response} = await guardInstance(token).get(`${baseUrl}/api/v1/anggota/single/${id}`)
        return response.data

    }catch (e) {
        message.error(e.message);
        console.log(e.response);
    }

}

module.exports = {
    tambahAnggota,
    updateAnggota,
    getAllAnggota,
    detailAnggota,
    deleteAnggota
}

