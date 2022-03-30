import {takeLatest, put} from "redux-saga/effects";
import {message} from "antd";
import {guardInstance} from "../utils/axiosConfig";

const actionTypes = {
    RESET_INVENTARIS_STATE: 'RESET_INVENTARIS_STATE',
    SAVE_INVENTARIS: 'SAVE_INVENTARIS',
    INVENTARIS_SAVED: 'INVENTARIS_SAVED',
    UPDATE_INVENTARIS: 'UPDATE_INVENTARIS',
    INVENTARIS_UPDATED: 'INVENTARIS_UPDATED',
    LOAD_INVENTARIS: 'LOAD_INVENTARIS',
    INVENTARIS_LOADED: 'INVENTARIS_LOADED',
    DELETE_INVENTARIS: 'DELETE_INVENTARIS',
    INVENTARIS_BY_ID: 'INVENTARIS_BY_ID',
    INVENTARIS_BY_ID_LOADED: 'INVENTARIS_BY_ID_LOADED',
    LOAD_MASTER_KATEGORI: 'LOAD_MASTER_KATEGORI',
    MASTER_KATEGORI_LOADED: 'MASTER_KATEGORI_LOADED',
    TAMBAH_KATEGORI: 'TAMBAH_KATEGORI',
    KATEGORI_DITAMBAH: 'KATEGORI_DITAMBAH',
    DELETE_KATEGORI: 'DELETE_KATEGORI',
    UPDATE_KATEGORI: 'UPDATE_KATEGORI'
}

const initialState = {
    loading: false,
    status: false,
    inventaris: [],
    inventarisData: {},
    kategoriLists: []
}

export const reducer = function inventarisReducer(state = initialState, {type, payload}) {
    switch (type) {
        case actionTypes.LOAD_INVENTARIS: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.INVENTARIS_LOADED: {
            return {
                ...state,
                loading: false,
                inventaris: payload
            }
        }
        case actionTypes.UPDATE_INVENTARIS: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.INVENTARIS_UPDATED: {
            return {
                ...state,
                loading: false,
                status: payload
            }
        }
        case actionTypes.SAVE_INVENTARIS: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.INVENTARIS_SAVED: {
            return {
                ...state,
                loading: false,
                status: payload
            }
        }
        case actionTypes.INVENTARIS_BY_ID: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.INVENTARIS_BY_ID_LOADED: {
            return {
                ...state,
                inventarisData: payload,
                loading: false,
            }
        }
        case actionTypes.RESET_INVENTARIS_STATE: {
            return initialState
        }
        case actionTypes.LOAD_MASTER_KATEGORI: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.MASTER_KATEGORI_LOADED: {
            return {
                ...state,
                loading: false,
                kategoriLists: payload
            }
        }
        default: {
            return state
        }
    }
}

export const inventarisDispatch = {
    loadInventaris: (data) => ({
        type: actionTypes.LOAD_INVENTARIS,
        payload: data
    }),
    inventarisLoaded: (data) => ({
        type: actionTypes.INVENTARIS_LOADED,
        payload: data
    }),
    updateInventaris: (data) => ({
        type: actionTypes.UPDATE_INVENTARIS,
        payload: data
    }),
    inventarisUpdated: (data) => ({
        type: actionTypes.INVENTARIS_UPDATED,
        payload: data
    }),
    saveInventaris: (data) => ({
        type: actionTypes.SAVE_INVENTARIS,
        payload: data
    }),
    inventarisSaved: (data) => ({
        type: actionTypes.INVENTARIS_SAVED,
        payload: data
    }),
    deleteInventaris: (data) => ({
        type: actionTypes.DELETE_INVENTARIS,
        payload: data
    }),
    resetInventarisState: () => ({
        type: actionTypes.RESET_INVENTARIS_STATE
    }),
    inventarisById: (data) => ({
        type: actionTypes.INVENTARIS_BY_ID,
        payload: data
    }),
    inventarisByIdLoaded: (data) => ({
        type: actionTypes.INVENTARIS_BY_ID_LOADED,
        payload: data
    }),
    loadMasterKategori: (data) => ({
        type: actionTypes.LOAD_MASTER_KATEGORI,
        payload: data
    }),
    masterKategoriLoaded: (data) => ({
        type: actionTypes.MASTER_KATEGORI_LOADED,
        payload: data
    }),
    tambahKategori: (data) => ({
        type: actionTypes.TAMBAH_KATEGORI,
        payload: data
    }),
    kategoriDitambah: (data) => ({
        type: actionTypes.KATEGORI_DITAMBAH,
        payload: data
    }),
    deleteKAtegori: (data) => ({
        type: actionTypes.DELETE_KATEGORI,
        payload: data
    }),
    updateKategori: (data) => ({
        type: actionTypes.UPDATE_KATEGORI,
        payload: data
    })
}

export function* saga() {
    const baseUrl = process.env.baseUrl
    yield takeLatest(actionTypes.LOAD_INVENTARIS, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).get(`${baseUrl}/api/v1/inventaris/all`)
            console.log(response)
            yield put(inventarisDispatch.inventarisLoaded(response.data))
        } catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
    yield takeLatest(actionTypes.INVENTARIS_BY_ID, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).get(`${baseUrl}/api/v1/inventaris/single/${payload.id}`)
            console.log(response)
            yield put(inventarisDispatch.inventarisByIdLoaded(response.data))
        } catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
    yield takeLatest(actionTypes.SAVE_INVENTARIS, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).post(`${baseUrl}/api/v1/inventaris/add/new`, payload.data)
            console.log(response)
            if (response.status) {
                message.success('Data Berhasil Di Simpan')
                yield put(inventarisDispatch.inventarisSaved(response.status))
                yield put(inventarisDispatch.resetInventarisState())
            } else {
                message.error(response.message)
            }

        } catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
    yield takeLatest(actionTypes.DELETE_INVENTARIS, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).delete(`${baseUrl}/api/v1/inventaris/delete/${payload.id}`)
            if (response.status) {
                message.success('Data Berhasil Dihapus')
            }
            yield put(inventarisDispatch.loadInventaris(payload))
        } catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
    yield takeLatest(actionTypes.UPDATE_INVENTARIS, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).put(`${baseUrl}/api/v1/inventaris/update/${payload.id}`, payload.data)
            if (response.status) {
                message.success('Data Berhasil Di Update')
                yield put(inventarisDispatch.inventarisUpdated(response.status))
                yield put(inventarisDispatch.resetInventarisState())
            } else {
                message.error(response.message)
            }

        } catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })

    yield takeLatest(actionTypes.LOAD_MASTER_KATEGORI, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).get(`${baseUrl}/api/v1/inventaris/category/all`)
            console.log(response)
            yield put(inventarisDispatch.masterKategoriLoaded(response.data))
        } catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })

    yield takeLatest(actionTypes.TAMBAH_KATEGORI, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).post(`${baseUrl}/api/v1/inventaris/category/add`, payload.data)
            console.log(response)
            yield put(inventarisDispatch.loadMasterKategori(payload))
        } catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })

    yield takeLatest(actionTypes.DELETE_KATEGORI, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).delete(`${baseUrl}/api/v1/inventaris/category/delete/${payload.id}`)
            console.log(response)
            yield put(inventarisDispatch.loadMasterKategori(payload))

        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })

    yield takeLatest(actionTypes.UPDATE_KATEGORI, function* ({payload}) {
        try {
            const {data: response} = yield guardInstance(payload.token).put(`${baseUrl}/api/v1/inventaris/category/update/${payload.id}`, payload.data)
            console.log(response)
            yield put(inventarisDispatch.loadMasterKategori(payload))

        }catch (e) {
            message.error(e.message);
            console.log(e.response);
        }
    })
}
