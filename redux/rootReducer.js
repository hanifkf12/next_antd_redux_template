import {all} from "redux-saga/effects";
import {combineReducers} from "redux";


import * as tes from './tes/testRedux'
export const rootReducer = combineReducers({
    tes: tes.reducer,
})

export function* rootSaga(){
    yield all([
        tes.saga(),
    ])
}
