const calculatePriceAndSubtotal = (productsInCart) => {
    let totalPrice = 0
    productsInCart.map(({ product, quantity }) => {
        let price = product.price * quantity
        totalPrice += price
    })
    const tax = parseFloat((totalPrice * 0.01).toFixed(2))
    const subTotal = (totalPrice + tax + 100).toFixed(2)
    return { totalPrice, tax, subTotal }
}

export { calculatePriceAndSubtotal }