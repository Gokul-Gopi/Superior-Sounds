import React, { useEffect } from 'react'
import './ProductListing.css'
import ProductCard from './ProductCard'
import FilterProducts from './FilterProducts'
import { useProduct } from '../../Context/ProductContext'
import { sortByPrice, otherFilters, sortByPriceRange } from '../../../src/array-manipulation'
import { networkCall } from "../../Utils/NetworkCalls";
import Loader from '../Loader/Loader'

const ProductListing = () => {

    const { state, dispatch } = useProduct()
    const itemsInCart = state.cart.map(e => e?._id)
    const itemsInWishlist = state.wishlist.map(e => e?._id)

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchProducts = async () => {
            try {
                const response = await networkCall('/products', 'GET');
                dispatch({ type: 'SET_PRODUCTS', payload: response?.data })
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }
        }
        fetchProducts();
    }, [])

    const filteredProducts = otherFilters(state.otherFilters, state.allProducts)
    const sortedProducts = sortByPrice(state.sortByPrice, filteredProducts)
    const sortedByPriceRange = sortByPriceRange(state.sortByPriceRange, sortedProducts)

		if(state.allProducts.length < 1){
			return <Loader/>
		}

    return (
        <div className='product-listing'>
            <FilterProducts />

            <div className="allProducts-container">
                {sortedByPriceRange.map(item => {
                    return <ProductCard key={item._id} id={item._id} name={item.name} ratings={item.rating} price={item.price} img={item.image} type={item.type} bestSeller={item.isBestSeller} inStock={item.inStock} inCart={itemsInCart.includes(item._id)} inWishlist={itemsInWishlist.includes(item._id)} />
                })}
            </div>

        </div>
    )
}

export default ProductListing
