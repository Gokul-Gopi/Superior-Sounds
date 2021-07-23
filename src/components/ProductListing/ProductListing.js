import React, { useState, useEffect } from 'react'
import './ProductListing.css'
import ProductCard from './ProductCard'
import FilterProducts from './FilterProducts'
import { useProduct } from '../../Context/ProductContext'
import { sortByPrice, otherFilters } from '../../../src/array-manipulation'
import axios from 'axios'

const ProductListing = () => {

    const { state, dispatch } = useProduct()

    useEffect(() => {
        // dispatch({ type: 'SET_LOADING', payload: true })
        const fetchProducts = async () => {
            try {
                let { data } = await axios.get('/products');
                dispatch({ type: 'SET_PRODUCTS', payload: data })
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }
        }

        fetchProducts();

    }, [])

    let filteredProducts = otherFilters(state.otherFilters, state.allProducts)
    let sortedProducts = sortByPrice(state.sortByPrice, filteredProducts)


    return (
        <div className='product-listing'>
            <FilterProducts />

            <div className="allProducts-container">
                {sortedProducts.map(item => {
                    return <ProductCard key={item._id} id={item._id} name={item.name} ratings={item.rating} price={item.price} img={item.image} type={item.type} bestSeller={item.isBestSeller} inStock={item.inStock} />
                })}
            </div>

        </div>
    )
}

export default ProductListing
