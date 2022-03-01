import {put, takeLatest} from "redux-saga/effects";
import {message} from "antd";
import {guardInstance} from "../utils/axiosConfig";

const actionTypes = {
    LOAD_PENDING_PINJAMAN: 'LOAD_PENDING_PINJAMAN',
    PENDING_PINJAMAN_LOADED: 'PENDING_PINJAMAN_LOADED',
    LOAD_PINJAMAN_BERJALAN: 'LOAD_PINJAMAN_BERJALAN',
    PINJAMAN_BERJALAN_LOADED: 'PINJAMAN_BERJALAN_LOADED',
    APPROVE_PINJAMAN: 'APPROVE_PINJAMAN',
    ADD_NEW_PINJAMAN: 'ADD_NEW_PINJAMAN',
    NEW_PINJAMAN_ADDED: 'NEW_PINJAMAN_ADDED',
    PINJAMAN_BY_ID: 'PINJAMAN_BY_ID',
    PINJAMAN_BY_ID_LOADED: 'PINJAMAN_BY_ID_LOADED'
}

const initialState = {
    loading: false,
    status: false,
    pinjamanBerjalan: [],
    pendingPinjaman: [],
    pinjamanData: {
        angsuran: []
    }
}

export const reducer = function (state = initialState, {type, payload}){
    switch (type){
        case actionTypes.LOAD_PINJAMAN_BERJALAN: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.PINJAMAN_BERJALAN_LOADED: {
            return {
                ...state,
                loading: false,
                pinjamanBerjalan: payload
            }
        }
        case actionTypes.LOAD_PENDING_PINJAMAN: {
            return {
                ...state,
                loading: true,
            }
        }
        case actionTypes.PENDING_PINJAMAN_LOADED: {
            return {
                ...state,
                loading: false,
                pendingPinjaman: payload
            }
        }
        case actionTypes.ADD_NEW_PINJAMAN: {
            return {
                ...state,
                loading: true,
            }
        }
        case actionTypes.NEW_PINJAMAN_ADDED: {
            return {
                ...state,
                loading: false,
                status: payload
            }
        }
        case actionTypes.APPROVE_PINJAMAN: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.PINJAMAN_BY_ID: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.PINJAMAN_BY_ID_LOADED: {
            return {
                ...state,
                loading: false,
                pinjamanData: payload
            }
        }
        default : {
            return state
        }
    }
}

export const pinjamanDispatch = {
    loadPinjamanBerjalan: (data) =>({
        type: actionTypes.LOAD_PINJAMAN_BERJALAN,
        payload: data
    }),
    pinjamanBerjalanLoaded: (data) => ({
        type: actionTypes.PINJAMAN_BERJALAN_LOADED,
        payload: data
    }),
    loadPendingPinjaman: (data) => ({
        type: actionTypes.LOAD_PENDING_PINJAMAN,
        payload: data
    }),
    pendingPinjamanLoaded: (data) => ({
        type: actionTypes.PENDING_PINJAMAN_LOADED,
        payload: data
    }),
    addNewPinjaman: (data) => ({
        type: actionTypes.ADD_NEW_PINJAMAN,
        payload: data
    }),
    newPinjamanAdded: (data) => ({
        type: actionTypes.NEW_PINJAMAN_ADDED,
        payload: data
    }),
    approvePinjaman: (data) => ({
        type: actionTypes.APPROVE_PINJAMAN,
        payload: data
    }),
    pinjamanById: (data) => ({
        type: actionTypes.PINJAMAN_BY_ID,
        payload: data
    }),
    pinjamanByIdLoaded: (data) => ({
        type: actionTypes.PINJAMAN_BY_ID_LOADED,
        payload: data
    })
}

export function* saga(){
    const baseUrl = process.env.baseUrl

    yield takeLatest(actionTypes.LOAD_PINJAMAN_BERJALAN, function* ({payload}) {
        try{
            const {data: response} = yield guardInstance(payload.token).get(`${baseUrl}/api/v1/pinjaman/all`)
            console.log(response)
            yield put(pinjamanDispatch.pinjamanBerjalanLoaded(response.data))
        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })

    yield takeLatest(actionTypes.LOAD_PENDING_PINJAMAN, function* ({payload}) {
        try{
            const {data: response} = yield guardInstance(payload.token).get(`${baseUrl}/api/v1/pinjaman/all/pending`)
            console.log(response, 'HAIII')
            yield put(pinjamanDispatch.pendingPinjamanLoaded(response.data))
        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })

    yield takeLatest(actionTypes.ADD_NEW_PINJAMAN, function* ({payload}){
        try {
            const {data: response} = yield guardInstance(payload.token).post(`${baseUrl}/api/v1/pinjaman/add/new`, payload.data)
            console.log(response)
            yield put(pinjamanDispatch.newPinjamanAdded(response.status))
        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })

    yield takeLatest(actionTypes.APPROVE_PINJAMAN, function* ({payload}){
        try {
            const {data: response} = yield guardInstance(payload.token).post(`${baseUrl}/api/v1/pinjaman/approve/${payload.id}`, payload.data)
            console.log(response)
            yield put(pinjamanDispatch.loadPendingPinjaman(payload))
        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })

    yield takeLatest(actionTypes.PINJAMAN_BY_ID, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).get(`${baseUrl}/api/v1/pinjaman/all/single/${payload.id}`)
            console.log(response)
            yield put(pinjamanDispatch.pinjamanByIdLoaded(response.data))
        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
}
