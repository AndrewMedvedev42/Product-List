import productsReducer from "./products"
import {combineReducers} from "redux"

const rootReducers = combineReducers({
   products:productsReducer
})

export default rootReducers