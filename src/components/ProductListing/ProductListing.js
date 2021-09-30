import React, { useState, useEffect } from 'react'
import './ProductListing.css'
import ProductCard from './ProductCard'
import FilterProducts from './FilterProducts'
import { useProduct } from '../../Context/ProductContext'
import { sortByPrice, otherFilters } from '../../../src/array-manipulation'
import { networkCall } from "../../Utils/NetworkCalls";

const ProductListing = () => {

    const { state, dispatch } = useProduct()
    const itemsInCart = state.cart.map(e => e?._id)
    const itemsInWishlist = state.wishlist.map(e => e?._id)

    useEffect(() => {
        dispatch({ type: 'SET_LOADING' })
        window.scrollTo(0, 0)
        const fetchProducts = async () => {
            try {
                const { data } = await networkCall('/products', 'GET');
                dispatch({ type: 'SET_PRODUCTS', payload: data })
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }
        }
        fetchProducts();
        dispatch({ type: 'SET_LOADING' })

    }, [])

    const filteredProducts = otherFilters(state.otherFilters, state.allProducts)
    const sortedProducts = sortByPrice(state.sortByPrice, filteredProducts)


    return (
        <div className='product-listing'>
            <FilterProducts />

            <div className="allProducts-container">
                {sortedProducts.map(item => {
                    return <ProductCard key={item._id} id={item._id} name={item.name} ratings={item.rating} price={item.price} img={item.image} type={item.type} bestSeller={item.isBestSeller} inStock={item.inStock} inCart={itemsInCart.includes(item._id)} inWishlist={itemsInWishlist.includes(item._id)} />
                })}
            </div>

        </div>
    )
}

export default ProductListing
