import {takeLatest, put} from "redux-saga/effects";
import axios from "axios";
import {message} from "antd";
import {guardInstance} from "../utils/axiosConfig";


const actionTypes = {
    LOAD_PENGELUARAN: 'LOAD_PENGELUARAN',
    PENGELUARAN_LOADED: 'PENGELUARAN_LOADED',
    SAVE_PENGELUARAN: 'SAVE_PENGELUARAN',
    PENGLEUARAN_SAVED: 'PENGLEUARAN_SAVED',
    UPDATE_PENGELUARAN: 'UPDATE_PENGELUARAN',
    PENGLEUARAN_UPDATED: 'PENGLEUARAN_UPDATED',
    RESET_PENGELUARAN_STATE: 'RESET_PENGELUARAN_STATE',
    PENGELUARAN_BY_ID: 'PENGELUARAN_BY_ID',
    PENGELUARAN_BY_ID_LOADED: 'PENGELUARAN_BY_ID_LOADED'
}

const initialState = {
    status: false,
    loading: false,
    pengeluaran: [],
    dataPengeluaran: {}
}

export const reducer = function pengeluaranReducer(state = initialState, {type, payload}) {
    switch (type) {
        case actionTypes.LOAD_PENGELUARAN: {
            console.log(payload)
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.PENGELUARAN_LOADED: {
            return {
                ...state,
                loading: false,
                pengeluaran: payload
            }
        }
        case actionTypes.UPDATE_PENGELUARAN: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.PENGLEUARAN_UPDATED: {
            return {
                ...state,
                loading: false,
                status: payload
            }
        }
        case actionTypes.SAVE_PENGELUARAN: {
            return {
                ...state,
                loading: true,
            }
        }
        case actionTypes.PENGLEUARAN_SAVED: {
            return {
                ...state,
                loading: false,
                status: payload
            }
        }
        case actionTypes.PENGELUARAN_BY_ID : {
            return {
                ...state,
                loading: true,

            }
        }
        case actionTypes.PENGELUARAN_BY_ID_LOADED: {
            return {
                ...state,
                dataPengeluaran: payload,
                loading: false,
            }
        }
        case actionTypes.RESET_PENGELUARAN_STATE: {
            return initialState

        }
        default: {
            return state
        }
    }
}

export const pengeluaranDispatch = {
    loadPengeluaran: (data) => ({
        type: actionTypes.LOAD_PENGELUARAN,
        payload: data
    }),
    pengeluaranLoaded: (data) => ({
        type: actionTypes.PENGELUARAN_LOADED,
        payload: data
    }),
    savePengluaran: (data) => ({
        type: actionTypes.SAVE_PENGELUARAN,
        payload: data
    }),
    pengeluaranSaved: (data) => ({
        type: actionTypes.PENGLEUARAN_SAVED,
        payload: data
    }),
    updatePengeluaran: (data) => ({
        type: actionTypes.UPDATE_PENGELUARAN,
        payload: data
    }),
    pengeluaranUpdated: (data) => ({
        type: actionTypes.PENGLEUARAN_UPDATED,
        payload: data
    }),
    resetPengeluaranState: () => ({
        type: actionTypes.RESET_PENGELUARAN_STATE
    }),
    pengeluaranById: (data) => ({
        type: actionTypes.PENGELUARAN_BY_ID,
        payload: data
    }),
    pengeluaranByIdLoaded: (data) => ({
        type: actionTypes.PENGELUARAN_BY_ID_LOADED,
        payload: data
    })
}

export function* saga() {
    const baseUrl = process.env.baseUrl

    yield takeLatest(actionTypes.LOAD_PENGELUARAN, function* ({payload}) {
        console.log(payload)
        try {
            const {data: response} = yield guardInstance(payload.token).get(`${baseUrl}/api/v1/pengeluaran/all`)
            console.log('tess, ',response)
            yield put(pengeluaranDispatch.pengeluaranLoaded(response.data))
        } catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })

    yield takeLatest(actionTypes.SAVE_PENGELUARAN, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).post(`${baseUrl}/api/v1/pengeluaran/add/new`, payload.data)
            console.log(response)
            if(response.status){
                yield put(pengeluaranDispatch.pengeluaranSaved(response.status))
                yield put(pengeluaranDispatch.resetPengeluaranState())
            }else {
                message.error(response.message)
            }
        } catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })

    yield takeLatest(actionTypes.UPDATE_PENGELUARAN, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).put(`${baseUrl}/api/v1/pengeluaran/update/${payload.id}`, payload.data)
            console.log(response)
            if(response.status){
                yield put(pengeluaranDispatch.pengeluaranUpdated(response.status))
                yield put(pengeluaranDispatch.resetPengeluaranState())
            }else {
                message.error(response.message)
            }

        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })

    yield takeLatest(actionTypes.PENGELUARAN_BY_ID, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).get(`${baseUrl}/api/v1/pengeluaran/single/${payload.id}`)
            console.log('tess, ',response)
            yield put(pengeluaranDispatch.pengeluaranByIdLoaded(response.data))
        } catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
}
