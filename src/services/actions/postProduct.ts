import axios from "axios"

export const loadProducts = () => async (dispatch:any) => {
    try {
        const productsList = await axios.get("http://localhost:8000/products")        
        dispatch({
            type:"GET_PRODUCTS",
            payload:{
                products: productsList.data,
            }
        })  
    } catch (error) {
        console.log(`ERROR ${error}`);
    }
}