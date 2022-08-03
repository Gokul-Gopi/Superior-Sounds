import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { useProduct } from '../../Context/ProductContext'
import '../ProductDetails/ProductDetails.css'
import { networkCall, addToWishlist, addToCart } from "../../Utils/NetworkCalls";

const ProductDetails = () => {
    const { id } = useParams()
    const { dispatch } = useProduct()
    const { authState } = useAuth()
    const [product, setProduct] = useState({})

    useEffect(() => {
        dispatch({ type: 'SET_LOADING' })
        const fetchProduct = async () => {
            try {
                const { data } = await networkCall(`/products/${id}`, 'GET')
                setProduct(data)
            } catch (err) {
                console.log(`Error: ${err.message}`)
            }
        };
        fetchProduct()
        dispatch({ type: 'SET_LOADING' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <div className='product-page'>
            <div className='product-page_desc-img'>
                <div className='product-page-img'><img src={product.image} alt="Product" /></div>

                <div className='product-page-desc'>
                    <h2 className='name'>{product.name}</h2>
                    <span className='type'>{product.type}</span>
                    <p className='desc'>{product.description}</p>

                    <div className='product-page-badges'>
                        <span className='ratings'><i class="far fa-star"></i> {product.rating}</span>
                        {product.isBestSeller && <span className='bestseller'><i class="fas fa-award"></i> Bestseller </span>}
                        {product.fastDelivery && <span className='fastdelivery'><i class="fas fa-shipping-fast"></i> Express delivery </span>}
                    </div>

                    <span><i class="fas fa-check"></i> Cash on delivey available</span>
                    <span><i class="fas fa-check"></i> Bank Offers Available</span>

                    <div className='product-page_btns'>
                        <button className='add-to-cart-btn' onClick={(e) => addToCart(e, id, dispatch, authState.isLoggedIn)}><i class="fas fa-shopping-cart"></i>&nbsp; Add to cart</button>
                        <button className='wishlist-btn' onClick={(e) => addToWishlist(e, id, dispatch, authState.isLoggedIn)}><i class="fas fa-heart"></i>&nbsp; Add to wishlist</button>
                    </div>
                </div>

                <div className='product-page-icons'>
                    <div>
                        <i class="fas fa-medal"></i>
                        <span>Finest quality</span>
                    </div>
                    <div>
                        <i class="fas fa-undo-alt"></i>
                        <span>1 week return policy</span>
                    </div>
                    <div>
                        <i class="fas fa-shield-alt"></i>
                        <span>1 year warranty</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetails
