import { networkCall } from './NetworkCalls'


const removeItemFromWishlist = async (event, productID, dispatch) => {
    dispatch({ type: 'SET_LOADING' })
    event.preventDefault()
    const { data } = await networkCall(`/wishlist/${productID}`, 'DELETE')
    dispatch({ type: 'SET_WISHLIST', payload: data.userWishlist })
    dispatch({ type: 'SET_LOADING' })
}

export { removeItemFromWishlist }