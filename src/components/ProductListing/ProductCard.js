import React, { useState } from 'react'
import './ProductCard.css'
import { useProduct } from '../../Context/ProductContext'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { addToCart } from "../../Utils/NetworkCalls";
import { FaAward } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { addToWishlist } from '../../Utils/NetworkCalls'
import { removeItemFromWishlist } from '../../Utils/wishlist'

const ProductCard = (props) => {
    const { dispatch } = useProduct();
    const { authState } = useAuth()
    const navigate = useNavigate()

    // const [changesInButton, setChangesInButton] = useState({
    //     wishListBtn: false,
    //     addToCartBtn: false
    // });

    // const moveToWishlist = (id) => {
    //     dispatch({ type: 'MOVE_TO_WISHLIST', payload: id })
    //     // setChangesInButton(preValue => ({ ...preValue, wishListBtn: true }))
    // }

    // const removeFromWishList = (id) => {
    //     dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id })
    //     // setChangesInButton(preValue => ({ ...preValue, wishListBtn: false }))
    // }



    return (
        <div className={props.inStock ? 'product-card' : 'product-card out-of-stock-card'}>
            {props.bestSeller && <FaAward className='best-seller-tag' />}
            <Link to={`/products/${props.id}`}>
                <div>
                    <img src={props.img} alt="ProductImage" />
                </div>
            </Link>

            <div className='productInfo'>
                <div className='name-rating-info'>
                    <span className='name'>{props.name}</span>
                    <span className='rating'><AiFillStar /> {props.ratings}</span>
                </div>
                <div className='type-price-info'>
                    <span className='type'>{props.type}</span>
                    <span className='price'>Rs {props.price}</span>
                </div>
            </div>

            <div className='card-btns'>
                {props.inCart
                    ? <button className='goToCartBtn' onClick={() => { navigate('/cart') }}>Go to cart</button>
                    : <button className='addToCartBtn' onClick={(e) => addToCart(e, props.id, dispatch, authState.isLoggedIn)}>Add to cart</button>
                }
            </div>

            <button className='wishlistBtn'>
                {props.inWishlist
                    ? <i onClick={(e) => removeItemFromWishlist(e, props.id, dispatch)} class="fas fa-heart"></i>
                    : <i onClick={(e) => addToWishlist(e, props.id, dispatch, authState.isLoggedIn)} class="far fa-heart"></i>
                }
            </button>
        </div>
    )
}

export default ProductCard
