import {takeLatest, put} from "redux-saga/effects";
import axios from "axios";

const actionTypes = {
    LOAD_PROVINSI: 'LOAD_PROVINSI',
    PROVINSI_LOADED: 'PROVINSI_LOADED',
    LOAD_KOTA: 'LOAD_KOTA',
    KOTA_LOADED: 'KOTA_LOADED',
    LOAD_KECAMATAN: 'LOAD_KECAMATAN',
    KECAMATAN_LOADED: 'KECAMATAN_LOADED',
    LOAD_KELURAHAN: 'LOAD_KELURAHAN',
    KELURAHAN_LOADED: 'KELURAHAN_LOADED'
}

const initialState = {
    provinsi: [],
    kota: [],
    kecamatan: [],
    kelurahan: []
}

export const reducer = function anggotaReducer(state = initialState, {type, payload}){
    switch (type){
        case actionTypes.PROVINSI_LOADED: {
            return{
                ...state,
                provinsi: payload
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
        default: {
            return state
        }
    }
}

export const anggotaDispatch = {
    loadProvinsi: ()=>({
        type: actionTypes.LOAD_PROVINSI,
    }),
    provinsiLoaded: (data)=> ({
        type: actionTypes.PROVINSI_LOADED,
        payload: data
    }),
    loadKelurahan: (id) =>({
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
    kotaLoadaed: (data)=>({
        type: actionTypes.KOTA_LOADED,
        payload: data
    }),
    loadKecamatan: (id)=>({
        type: actionTypes.LOAD_KECAMATAN,
        payload: id
    }),
    kecamatanLoaded: (data)=>({
        type: actionTypes.KECAMATAN_LOADED,
        payload: data
    })
}

export function* saga() {
    yield takeLatest(actionTypes.LOAD_PROVINSI, function* () {
        try {
            // const {data: response} = yield axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
            const {data: response} = yield axios.get(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`)
            console.log(response, ', TTTTT')
            yield put(anggotaDispatch.provinsiLoaded(response.provinsi))
        }catch (e) {
            console.log(e.response, 'ERRR, ')
        }
    })

    yield takeLatest(actionTypes.LOAD_KOTA, function* ({payload}){
        try {
            // const {data: response} = yield axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${payload}.json`)
            const {data: response} = yield axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${payload}`)
            console.log(response)
            yield put(anggotaDispatch.kotaLoadaed(response.kota_kabupaten))
        }catch (e) {
            console.log(e.response, 'ERRR, ')
        }
    })

    yield takeLatest(actionTypes.LOAD_KECAMATAN, function* ({payload}){
        try {
            // const {data: response} = yield axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/districts/${payload}.json`)
            const {data: response} = yield axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${payload}`)
            console.log(response)
            yield put(anggotaDispatch.kecamatanLoaded(response.kecamatan))
        }catch (e) {
            console.log(e.response, 'ERRR, ')
        }
    })
    yield takeLatest(actionTypes.LOAD_KELURAHAN, function* ({payload}){
        try {
            // const {data: response} = yield axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/villages/${payload}.json`)
            const {data: response} = yield axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${payload}`)
            console.log(response)
            yield put(anggotaDispatch.kelurahanLoaded(response.kelurahan))
        }catch (e) {
            console.log(e.response, 'ERRR, ')
        }
    })
}
