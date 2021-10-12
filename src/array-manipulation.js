

const removeFromWishlist = (wishlist, productID) => {
    let updatedList = wishlist.filter(item => item.id !== productID);
    return updatedList;
}

const removeFromCart = (cart, productID) => {
    let updatedList = cart.filter(item => item.id !== productID);
    return updatedList;
}

const sortByPrice = (type, products) => {
    console.log({ type })
    if (type === 'lowToHigh') {
        return products.sort((a, b) => a.price - b.price)
    }
    else if (type === 'highToLow') {
        return products.sort((a, b) => b.price - a.price)
    }
    return products;

}

const sortByPriceRange = (value, products) => {
    if (value !== 0) {
        return products.filter(item => +item.price > value)
    }
    return products
}

const otherFilters = (filters, products) => {
    let stocksFilter = filters.wholeStock ? products : products.filter(item => item.inStock);
    let sellersFilter = filters.bestSellers ? stocksFilter.filter(item => item.isBestSeller) : stocksFilter;
    let deliveryFilter = filters.fastDelivery ? sellersFilter.filter(item => item.fastDelivery) : sellersFilter;
    return deliveryFilter
}



export { removeFromWishlist, removeFromCart, sortByPrice, otherFilters, sortByPriceRange }