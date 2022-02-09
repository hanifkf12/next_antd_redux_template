import {all} from "redux-saga/effects";
import {combineReducers} from "redux";


import * as tes from './tes/testRedux'
import * as anggota from './anggota/anggota-redux'
export const rootReducer = combineReducers({
    tes: tes.reducer,
    anggota: anggota.reducer
})

export function* rootSaga(){
    yield all([
        tes.saga(),
        anggota.saga()
    ])
}
