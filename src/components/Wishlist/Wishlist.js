import React from 'react'
import { useProduct } from '../../Context/ProductContext'
import '../Wishlist/Wishlist.css'

const Wishlist = () => {

    const { state } = useProduct()

    return (
        state.wishlist.length ?
            <div>
                <h1>wishlist...</h1>
            </div> :

            <div className='empty-wishlist'>
                <i class="fas fa-heart"></i>
                <span>Start Wishlisting your favourites...</span>
            </div>
    )
}

export default Wishlist
