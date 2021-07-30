import React from 'react'
import { removeItemFromWishlist } from "../../Utils/wishlist";
import { useProduct } from '../../Context/ProductContext'
import './WishlistCard.css'
import { addToCart } from '../../Utils/NetworkCalls';

const WishlistCard = (props) => {

    const { state, dispatch } = useProduct();
    return (
        <div>
            <div className='wishlist-card'>
                <div className='product-img'><img src={props.img} alt="product-img" /></div>
                <div className="product-info">
                    <div>{props.name}</div>
                    <div>Rs. {props.price}</div>
                </div>
                <div className='wishlist-card-btns'>
                    <button onClick={(e) => addToCart(e, props.id, dispatch)}>Move to cart</button>
                    <button onClick={(e) => removeItemFromWishlist(e, props.id, dispatch)}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default WishlistCard
