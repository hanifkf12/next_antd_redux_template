import {all} from "redux-saga/effects";
import {combineReducers} from "redux";


import * as tes from './tes/testRedux'
import * as anggota from './anggota/anggota-redux'
import * as inventaris from './inventaris_redux'
import * as pengeluaran from './pengeluaran_redux';
import * as pinjaman from './pinjaman_redux';
export const rootReducer = combineReducers({
    tes: tes.reducer,
    anggota: anggota.reducer,
    inventaris: inventaris.reducer,
    pengeluaran: pengeluaran.reducer,
    pinjaman: pinjaman.reducer
})

export function* rootSaga(){
    yield all([
        tes.saga(),
        anggota.saga(),
        inventaris.saga(),
        pengeluaran.saga(),
        pinjaman.saga()
    ])
}
