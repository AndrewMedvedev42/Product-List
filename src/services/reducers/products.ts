
const StoreState = {products:[]}

const productsReducer = (state=StoreState, action:any) => {
    switch (action.type){
        case "GET_PRODUCTS":
            return state.products = action.payload.products
        default: // need this for default case
            return state 
        
}}

export default productsReducer