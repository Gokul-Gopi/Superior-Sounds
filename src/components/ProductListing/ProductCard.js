import React, { useState } from 'react'
import './ProductCard.css'
import { useProduct } from '../../Context/ProductContext'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { addToCart } from "../../Utils/NetworkCalls";


const ProductCard = (props) => {

    const { state, dispatch } = useProduct();
    const { authState, authReducer } = useAuth()

    const [changesInButton, setChangesInButton] = useState({
        wishListBtn: false,
        addToCartBtn: false
    });

    // const addToCartHandler = (id) => {
    //     dispatch({ type: 'ADD_TO_CART', payload: id })
    //     setChangesInButton(preValue => ({ ...preValue, addToCartBtn: true }))
    // }

    const moveToWishlist = (id) => {
        dispatch({ type: 'MOVE_TO_WISHLIST', payload: id })
        setChangesInButton(preValue => ({ ...preValue, wishListBtn: true }))
    }

    const removeFromWishList = (id) => {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id })
        setChangesInButton(preValue => ({ ...preValue, wishListBtn: false }))
    }



    return (
        <div className={props.inStock ? 'product-card' : 'product-card out-of-stock-card'}>
            {props.bestSeller && <span className='best-seller-tag'>Best Seller</span>}
            <Link to={`/products/${props.id}`}>
                <div>
                    <img src={props.img} alt="ProductImage" />
                </div>
            </Link>
            <div className='productInfo'>
                <div>
                    <span className='productName'>{props.name}</span>
                    <span className='productType'>{props.type}</span>
                </div>

                <span className='productRating'><i class="far fa-star"></i>{props.ratings}</span>
                <span className='productPrice'>₹ {props.price}</span>
            </div>

            <div>
                {/* {changesInButton.addToCartBtn ?
                    <Link to='/cart'>
                        <button className='addToCartBtn' style={{ color: 'white', background: '#4B5563' }} >Go to cart</button>
                    </Link>
                    : <button className='addToCartBtn' onClick={() => addToCartHandler(props.id)}>Add to cart</button>
                } */}
                <button className='addToCartBtn' onClick={(e) => addToCart(e, props.id, dispatch)}>Add to cart</button>
            </div>

            <button className='wishlistBtn'>
                {changesInButton.wishListBtn ?
                    <i onClick={() => removeFromWishList(props.id)} class="fas fa-heart"></i>
                    : <i onClick={() => moveToWishlist(props.id)} class="far fa-heart"></i>
                }
            </button>
        </div>
    )
}

export default ProductCard
