import axios from "axios";

const networkCall = async (route, method, data) => {
    switch (method) {
        case 'GET':
            try {
                return await axios({
                    method: 'get',
                    url: route,
                })
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }

            break;

        case 'POST':
            try {
                return await axios({
                    method: 'post',
                    url: route,
                })
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }

            break;

        case 'PUT':
            try {
                return await axios({
                    method: 'put',
                    url: route,
                    data: data
                })
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }

            break;

        case 'DELETE':
            try {
                return await axios({
                    method: 'delete',
                    url: route,
                })
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }

            break;

        default:
            break;
    }
}

const defaultHeaderForToken = (token) => {
    if (token) {
        return axios.defaults.headers.common["Authorization"] = token
    }
}

const getUserCart = async (dispatch) => {

    try {
        const { data } = await networkCall('/cart', 'GET')
        dispatch({ type: 'SET_CART', payload: data.userCart })
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

const addToCart = async (event, productID, dispatch) => {
    event.preventDefault()
    try {
        const { data } = await networkCall(`/cart/${productID}`, 'POST')
        if (data.success) {
            dispatch({ type: 'SET_CART', payload: data.response })
        } else {
            console.log(data.message)
        }
    } catch (err) {
        console.log(`Error: ${err.message}`)
    }
}

const modifyCartItemsQty = async (event, type, productID, dispatch) => {
    event.preventDefault()
    const { data } = await networkCall(`/cart/${productID}`, 'PUT', type)
    dispatch({ type: 'SET_CART', payload: data.userCart })
}

const removeItemFromCart = async (event, productID, dispatch) => {
    event.preventDefault()
    const { data } = await networkCall(`/cart/${productID}`, 'DELETE')
    dispatch({ type: 'SET_CART', payload: data.userCart })
}

const addToWishlist = async (event, productID, dispatch) => {
    event.preventDefault()
    const { data } = await networkCall(`/wishlist/${productID}`, 'POST')
    console.log(data)
    if (data.success) {
        dispatch({ type: 'SET_WISHLIST', payload: data.response })
    } else {
        console.log(data.message)
    }
}


export { networkCall, defaultHeaderForToken, getUserCart, addToCart, addToWishlist, modifyCartItemsQty, removeItemFromCart }