import React from 'react'
import { useProduct } from '../../Context/ProductContext'
import '../Cart/Cart.css'
import { addToWishlist, modifyCartItemsQty, removeItemFromCart } from "../../Utils/NetworkCalls";
import { calculatePriceAndSubtotal } from '../../Utils/cart'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useAuth } from '../../Context/AuthContext'

const Cart = () => {
    const { state, dispatch } = useProduct()
    const { authState } = useAuth()
    const itemsInWishlist = state.wishlist.map(e => e._id)

    const priceDetails = calculatePriceAndSubtotal(state.cart)

    const moveToWishlist = (event, productID) => {
        addToWishlist(event, productID, dispatch, authState.isLoggedIn)
        if (!itemsInWishlist.includes(productID)) {
            removeItemFromCart(event, productID, dispatch)
        }
    }

    return (
        state.cart.length !== 0 ?
            <div className='cart'>
                <main className="products-cart-container">
                    <h3>Cart</h3>
                    <div className="products-cart-items">

                        {state.cart.map(({ product, quantity }) => {
                            return (<div className="items-in-cart" key={product._id}>

                                <div className='items-in-cart_product-details'>
                                    <div className="product-img">
                                        <img src={product.image} alt="product image" />
                                    </div>
                                    <div className="product-other-details">
                                        <h2>{product.name}</h2>
                                        <span>*Cash on delivery available</span>
                                        <div>
                                            <button className='remove-btn' onClick={(e) => removeItemFromCart(e, product._id, dispatch)}>Remove</button>
                                            <button className='wishlist-btn' onClick={(e) => moveToWishlist(e, product._id)}>Wishlist</button>
                                        </div>
                                    </div>
                                </div>

                                <div className='modify-quantity-btns'>
                                    <div>₹ {product.price * quantity}</div>
                                    <button onClick={(e) => modifyCartItemsQty(e, { action: 'increase' }, product._id, dispatch)}>+</button>
                                    <span>{quantity}</span>
                                    <button disabled={quantity === 1 && 'disabled'} onClick={(e) => modifyCartItemsQty(e, { action: 'decrease' }, product._id, dispatch)} >-</button>
                                </div>

                            </div>)
                        })}

                    </div>
                    <div className='placeorder-btn'><button>Place Order</button></div>
                </main>

                <aside className="subtotal-container">
                    <h3>Price Details</h3>
                    <div><span>Price</span><span>{priceDetails.totalPrice}</span></div>
                    <div><span>Tax</span><span>{priceDetails.tax}</span></div>
                    <div><span>Delivery charges</span><span>100</span></div>
                    <div><span>Subtotal</span><span>{priceDetails.subTotal}</span></div>
                </aside>

            </div> :
            <div className='empty-cart'>
                <AiOutlineShoppingCart className='icon' />
                <span>&nbsp;Your cart seems empty..</span>
            </div>


    )
}

export default Cart
