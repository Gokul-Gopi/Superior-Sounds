import {
    addToCart, addToWishlist, removeFromWishlist, removeFromCart,
} from '../array-manipulation'

const initialState = {
    allProducts: [],
    availableProducts: [],
    cart: [],
    wishlist: [],
    sortByPrice: null,
    otherFilters: {
        wholeStock: false,
        bestSellers: false,
        fastDelivery: false
    },
    loading: false
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS': return { ...state, allProducts: action.payload, availableProducts: action.payload.filter(item => item.inStock) }

        case 'SET_CART': return { ...state, cart: action.payload }

        case 'SET_WISHLIST': return { ...state, wishlist: action.payload }

        case 'REMOVE_FROM_WISHLIST': let updatedWishlist = removeFromWishlist(state.wishlist, action.payload)
            return { ...state, wishlist: updatedWishlist }


        case 'REMOVE_FROM_CART': let updatedCart = removeFromCart(state.cart, action.payload)
            return { ...state, cart: updatedCart }

        case 'MODIFY_CART_QTY': return {
            ...state, cart: state.cart.map(item => {
                if (action.payload === 'inc') {
                    return { ...item, qty: item.qty + 1 }
                }
                else if (action.payload === 'dec' && item.qty > 0) {
                    return { ...item, qty: item.qty - 1 }
                }
                else {
                    return { ...item }
                }

            })
        }

        case "SORT_BY_PRICE": return { ...state, sortByPrice: action.payload }

        case 'OTHER_FILTERS': return {
            ...state, otherFilters: {
                ...state.otherFilters, [action.payload]: !state.otherFilters[action.payload]
            }
        }

        case "CLEAR_FILTERS": return {
            ...state, sortByPrice: null, otherFilters: { wholeStock: false, bestSellers: false, fastDelivery: false }
        }

        case 'SET_LOADING': return { ...state, loading: action.payload }

        default: return { ...state };

    }
}

export { reducer, initialState }