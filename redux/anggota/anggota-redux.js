import {takeLatest, put} from "redux-saga/effects";
import axios from "axios";
import {message} from "antd";
import {guardInstance} from "../../utils/axiosConfig";

const actionTypes = {
    LOAD_PROVINSI: 'LOAD_PROVINSI',
    PROVINSI_LOADED: 'PROVINSI_LOADED',
    LOAD_KOTA: 'LOAD_KOTA',
    KOTA_LOADED: 'KOTA_LOADED',
    LOAD_KECAMATAN: 'LOAD_KECAMATAN',
    KECAMATAN_LOADED: 'KECAMATAN_LOADED',
    LOAD_KELURAHAN: 'LOAD_KELURAHAN',
    KELURAHAN_LOADED: 'KELURAHAN_LOADED',
    TAMBAH_ANGGOTA: 'TAMBAH_ANGGOTA',
    TAMBAH_ANGGOTA_SELESAI: 'TAMBAH_ANGGOTA_SELESAI',
    UPDATE_ANGGOTA: 'UPDATE_ANGGOTA',
    UPDATE_ANGGOTA_SELESAI: 'UPDATE_ANGGOTA_SELESAI',
    LOAD_ANGGOTA: 'LOAD_ANGGOTA',
    ANGGOTA_LOADED: 'ANGGOTA_LOADED',
    DELETE_ANGGOTA: 'DELETE_ANGGOTA',
    ANGGOTA_BY_ID: 'ANGGOTA_BY_ID',
    ANGGOTA_BY_ID_LOADED: 'ANGGOTA_BY_ID_LOADED',
    RESET_ANGGOTA_STATE: 'RESET_ANGGOTA_STATE',
    LOAD_SIMPANAN_WAJIB_ANGGOTA: 'LOAD_SIMPANAN_WAJIB_ANGGOTA',
    SIMPANAN_WAJIB_ANGGOTA_LOADED: 'SIMPANAN_WAJIB_ANGGOTA_LOADED',
    LOAD_PINJAMAN_ANGGOTA: 'LOAD_PINJAMAN_ANGGOTA',
    PINJAMAN_ANGGOTA_LOADED: 'PINJAMAN_ANGGOTA_LOADED'
}

const initialState = {
    provinsi: [],
    kota: [],
    kecamatan: [],
    kelurahan: [],
    anggota: [],
    dataAnggota: {
        rt_rw: '00/00',
        pinjaman: [],
        simpanan_wajib:[]
    },
    simpananWajib: [],
    pinjamanAnggota: [],
    loading: false,
    status: false,
}

export const reducer = function anggotaReducer(state = initialState, {type, payload}) {
    switch (type) {
        case actionTypes.PROVINSI_LOADED: {
            return {
                ...state,
                provinsi: payload
            }
        }
        case actionTypes.LOAD_SIMPANAN_WAJIB_ANGGOTA: {
            return {
                ...state,
                loading: true,
            }
        }
        case actionTypes.SIMPANAN_WAJIB_ANGGOTA_LOADED: {
            return {
                ...state,
                simpananWajib: payload,
                loading: false
            }
        }
        case actionTypes.LOAD_PINJAMAN_ANGGOTA: {
            return {
                ...state,
                loading: true,
            }
        }
        case actionTypes.PINJAMAN_ANGGOTA_LOADED: {
            return {
                ...state,
                loading: false,
                pinjamanAnggota: payload
            }
        }
        case actionTypes.KOTA_LOADED: {
            return {
                ...state,
                kota: payload
            }
        }
        case actionTypes.KECAMATAN_LOADED: {
            return {
                ...state,
                kecamatan: payload
            }
        }
        case actionTypes.KELURAHAN_LOADED: {
            return {
                ...state,
                kelurahan: payload
            }
        }
        case actionTypes.LOAD_ANGGOTA: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.ANGGOTA_LOADED: {
            return {
                ...state,
                anggota: payload,
                loading: false
            }
        }
        case actionTypes.RESET_ANGGOTA_STATE: {
            return initialState
        }
        case actionTypes.UPDATE_ANGGOTA: {
            return {
                ...state,
                loading: true,
            }
        }
        case actionTypes.UPDATE_ANGGOTA_SELESAI: {
            return {
                ...state,
                loading: false,
                status: payload
            }
        }
        case actionTypes.TAMBAH_ANGGOTA: {
            return {
                ...state,
                loading: true,
            }
        }
        case actionTypes.TAMBAH_ANGGOTA_SELESAI: {
            return {
                ...state,
                loading: false,
                status: payload
            }
        }
        case  actionTypes.ANGGOTA_BY_ID: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.ANGGOTA_BY_ID_LOADED: {
            return {
                ...state,
                dataAnggota: payload,
                loading: false
            }
        }
        default: {
            return state
        }
    }
}

export const anggotaDispatch = {
    loadProvinsi: () => ({
        type: actionTypes.LOAD_PROVINSI,
    }),
    provinsiLoaded: (data) => ({
        type: actionTypes.PROVINSI_LOADED,
        payload: data
    }),
    loadKelurahan: (id) => ({
        type: actionTypes.LOAD_KELURAHAN,
        payload: id
    }),
    kelurahanLoaded: (data) => ({
        type: actionTypes.KELURAHAN_LOADED,
        payload: data
    }),
    loadKota: (id) => ({
        type: actionTypes.LOAD_KOTA,
        payload: id
    }),
    kotaLoadaed: (data) => ({
        type: actionTypes.KOTA_LOADED,
        payload: data
    }),
    loadKecamatan: (id) => ({
        type: actionTypes.LOAD_KECAMATAN,
        payload: id
    }),
    kecamatanLoaded: (data) => ({
        type: actionTypes.KECAMATAN_LOADED,
        payload: data
    }),
    loadAnggota: (data) => ({
        type: actionTypes.LOAD_ANGGOTA,
        payload: data
    }),
    anggotaLoaded: (data) => ({
        type: actionTypes.ANGGOTA_LOADED,
        payload: data
    }),
    tambahAnggota: (data) => ({
        type: actionTypes.TAMBAH_ANGGOTA,
        payload: data
    }),
    tambahAnggotaSelesai: (data) => ({
        type: actionTypes.TAMBAH_ANGGOTA_SELESAI,
        payload: data
    }),
    updateAnggota: (data) => ({
        type: actionTypes.UPDATE_ANGGOTA,
        payload: data
    }),
    updateAnggotaSelesai: (data) => ({
        type: actionTypes.UPDATE_ANGGOTA_SELESAI,
        payload: data
    }),
    deleteAnggota: (data) => ({
        type: actionTypes.DELETE_ANGGOTA,
        payload: data
    }),
    anggotaById: (data) => ({
        type: actionTypes.ANGGOTA_BY_ID,
        payload: data
    }),
    anggotaByIdLoaded: (data) => ({
        type: actionTypes.ANGGOTA_BY_ID_LOADED,
        payload: data
    }),
    resetAnggotaState: () => ({
        type: actionTypes.RESET_ANGGOTA_STATE
    }),
    loadSimpananWajibAnggota: (data) => ({
        type: actionTypes.LOAD_SIMPANAN_WAJIB_ANGGOTA,
        payload: data
    }),
    simpananWajibAnggotaLoaded: (data)=> ({
        type: actionTypes.SIMPANAN_WAJIB_ANGGOTA_LOADED,
        payload: data
    }),
    loadPinjamanAnggota: (data) => ({
        type: actionTypes.LOAD_PINJAMAN_ANGGOTA,
        payload: data
    }),
    pinjamanAnggotaLoaded: (data) => ({
        type: actionTypes.PINJAMAN_ANGGOTA_LOADED,
        payload: data
    })
}

export function* saga() {
    const baseUrl = process.env.baseUrl
    yield takeLatest(actionTypes.LOAD_PROVINSI, function* () {
        try {
            // const {data: response} = yield axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
            const {data: response} = yield axios.get(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`)
            console.log(response, ', TTTTT')
            yield put(anggotaDispatch.provinsiLoaded(response.provinsi))
        } catch (e) {
            console.log(e.response, 'ERRR, ')
        }
    })

    yield takeLatest(actionTypes.LOAD_KOTA, function* ({payload}) {
        try {
            // const {data: response} = yield axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${payload}.json`)
            const {data: response} = yield axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${payload}`)
            console.log(response)
            yield put(anggotaDispatch.kotaLoadaed(response.kota_kabupaten))
        } catch (e) {
            console.log(e.response, 'ERRR, ')
        }
    })

    yield takeLatest(actionTypes.LOAD_KECAMATAN, function* ({payload}) {
        try {
            // const {data: response} = yield axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/districts/${payload}.json`)
            const {data: response} = yield axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${payload}`)
            console.log(response)
            yield put(anggotaDispatch.kecamatanLoaded(response.kecamatan))
        } catch (e) {
            console.log(e.response, 'ERRR, ')
        }
    })
    yield takeLatest(actionTypes.LOAD_KELURAHAN, function* ({payload}) {
        try {
            // const {data: response} = yield axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/villages/${payload}.json`)
            const {data: response} = yield axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${payload}`)
            console.log(response)
            yield put(anggotaDispatch.kelurahanLoaded(response.kelurahan))
        } catch (e) {
            console.log(e.response, 'ERRR, ')
        }
    })

    yield takeLatest(actionTypes.TAMBAH_ANGGOTA, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).post(`${process.env.baseUrl}/api/v1/anggota/add/new`, payload.data)
            console.log(response)
            if (response.status){
                message.success('Data Berhasil Ditambahkan')
                const dataSimpananPokok = {
                    user_id: response.data.id,
                    jumlah: 1000000,
                    status: "active"
                }
                const {data: response2} = yield guardInstance(payload.token).post(`${process.env.baseUrl}/api/v1/simpanan/simpanan-pokok/add`, dataSimpananPokok)
                console.log(response2)
                yield put(anggotaDispatch.tambahAnggotaSelesai(response.status))
                yield put(anggotaDispatch.resetAnggotaState())
            }else {
                message.error(response.message)
            }
        } catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
    yield takeLatest(actionTypes.LOAD_ANGGOTA, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).get(`${process.env.baseUrl}/api/v1/anggota/all`)
            console.log(response)
            yield put(anggotaDispatch.anggotaLoaded(response.data))
        }catch (e) {
            message.error(e.message);
            console.log(e.message);
        }
    })
    yield takeLatest(actionTypes.UPDATE_ANGGOTA, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).put(`${baseUrl}/api/v1/anggota/update/${payload.id}`, payload.data)
            console.log(response)
            if (response.status){
                message.success('Data Berhasil Diubah')
                yield put(anggotaDispatch.updateAnggotaSelesai(response.status))
                yield put(anggotaDispatch.resetAnggotaState())
            }else {
                message.error(response.message)
            }

        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
    yield takeLatest(actionTypes.DELETE_ANGGOTA, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).delete(`${process.env.baseUrl}/api/v1/anggota/delete/${payload.id}`)
            yield put(anggotaDispatch.loadAnggota({token: payload.token}))
            if (response.status){
                message.success('Data Berhasil Dihapus')
            }
        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
    yield takeLatest(actionTypes.ANGGOTA_BY_ID, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).get(`${baseUrl}/api/v1/anggota/single/${payload.id}`)
            console.log(response)
            yield put(anggotaDispatch.anggotaByIdLoaded(response.data))

        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
    yield takeLatest(actionTypes.LOAD_SIMPANAN_WAJIB_ANGGOTA, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).get(`${baseUrl}/api/v1/simpanan/simpanan-wajib/user/${payload.id}`)
            console.log(response)
            yield put(anggotaDispatch.simpananWajibAnggotaLoaded(response.data))
        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
    yield takeLatest(actionTypes.LOAD_PINJAMAN_ANGGOTA, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).get(`${baseUrl}/api/v1/pinjaman/user/${payload.id}`)
            console.log(response)
            yield put(anggotaDispatch.pinjamanAnggotaLoaded(response.data))
        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
}
