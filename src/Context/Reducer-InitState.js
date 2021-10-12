import {
    removeFromWishlist
} from '../array-manipulation'

const initialState = {
    allProducts: [],
    availableProducts: [],
    cart: [],
    wishlist: [],
    sortByPrice: '',
    otherFilters: {
        wholeStock: false,
        bestSellers: false,
        fastDelivery: false,
    },
    sortByPriceRange: '',
    loading: false
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS': return { ...state, allProducts: action.payload, availableProducts: action.payload.filter(item => item.inStock) }

        case 'SET_CART': return { ...state, cart: action.payload }

        case 'SET_WISHLIST': return { ...state, wishlist: action.payload }

        case 'REMOVE_FROM_WISHLIST': let updatedWishlist = removeFromWishlist(state.wishlist, action.payload)
            return { ...state, wishlist: updatedWishlist }

        case "SORT_BY_PRICE": return { ...state, sortByPrice: action.payload }

        case 'OTHER_FILTERS': return {
            ...state, otherFilters: {
                ...state.otherFilters, [action.payload]: !state.otherFilters[action.payload]
            }
        }

        case 'SORT_BY_PRICE_RANGE': return { ...state, sortByPriceRange: action.payload }

        case "CLEAR_FILTERS": return {
            ...state, sortByPrice: '', otherFilters: { wholeStock: false, bestSellers: false, fastDelivery: false }, sortByPriceRange: 0
        }

        case 'SET_LOADING': return { ...state, loading: !state.loading }

        default: return { ...state };

    }
}

export { reducer, initialState }