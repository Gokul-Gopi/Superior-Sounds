
import axios from 'axios';
import { useAuth } from './Context/AuthContext';

// var token = 'whatt'
const { token } = JSON.parse(localStorage.getItem('userDetails'))


// const NetworkCalls = async (route, method) => {

//     const { authState } = useAuth()
//     const token = authState.currentUserToken
//     let response

//     if (method === 'GET') {
//         response = await axios.get(route)
//     }
//     if (method === 'POST') {
//         response = await axios.post(route, token)
//     }
//     return response
// }

// const addToWishlist = (products, productID, wishlist) => {
//     let itemToBeWishListed = products.find(item => item.id === productID);
//     let isWishListed = wishlist.some(item => item.id === itemToBeWishListed.id);
//     return isWishListed ? null : itemToBeWishListed;
// }

const addToCart = async (productID) => {
    try {
        const { data } = await axios({
            method: 'post',
            url: `/cart/${productID}`,
            data: { Authorization: token }
        })
        console.log(data);

    } catch (err) {
        console.log(`FE ${err.message}`)
    }

}


const addToWishlist = async (productID) => {
    try {
        const { data } = await axios({
            method: 'post',
            url: `/cart/${productID}`,
            data: { Authorization: token }
        })
        console.log(data);

    } catch (err) {
        console.log(`FE ${err.message}`)
    }

}

const removeFromWishlist = (wishlist, productID) => {
    let updatedList = wishlist.filter(item => item.id !== productID);
    return updatedList;
}

const removeFromCart = (cart, productID) => {
    let updatedList = cart.filter(item => item.id !== productID);
    return updatedList;
}

const sortByPrice = (type, products) => {
    if (type === 'lowToHigh') {
        return products.sort((a, b) => a.price - b.price)
    }
    else if (type === 'highToLow') {
        return products.sort((a, b) => b.price - a.price)
    }
    return products;
}

const otherFilters = (filters, products) => {

    let stocksFilter = filters.wholeStock ? products : products.filter(item => item.inStock);
    let sellersFilter = filters.bestSellers ? stocksFilter.filter(item => item.bestSeller) : stocksFilter;
    let deliveryFilter = filters.fastDelivery ? sellersFilter.filter(item => item.fastDelivery) : sellersFilter;
    return deliveryFilter
}



export { addToCart, addToWishlist, removeFromWishlist, removeFromCart, sortByPrice, otherFilters }