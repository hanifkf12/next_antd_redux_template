import {takeLatest, put} from "redux-saga/effects";
import axios from "axios";
const actionTypes = {
    TES: 'TES',
    TES_LOADED: 'TES_LOADED'
}

const initialStateTes = {
    tes: 'INI TEST',
    data: []
}

export const reducer =function testReducer(state = initialStateTes, {type, payload}){
    switch (type){
        case actionTypes.TES : {
            return{
                ...state,
                tes: 'HALLO TEST'
            }
        }
        case actionTypes.TES_LOADED:{
            return {
                ...state,
                data: payload
            }
        }
        default: {
            return state
        }
    }
}

export const testDispatch = {
    tesDong: ()=>(
        {type: actionTypes.TES}
    ),
    tesLoaded: (data) => (
        {type: actionTypes.TES_LOADED, payload: data}
    ),

}

export function* saga(){
    yield takeLatest(actionTypes.TES, function* (){
        try {
            const {data: response} = yield axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=23256e2f55aec19420181dbb09b3d7ba`)
            console.log('DATA COVID, ',response)
            yield put (testDispatch.tesLoaded(response.results))
            console.log('SAGA TEST')
        }catch (e) {
            console.log(e.response)
        }

    })
}
