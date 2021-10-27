import React from 'react'
import { useProduct } from '../../Context/ProductContext'
import '../Wishlist/Wishlist.css'
import WishlistCard from "./WishlistCard";
import { BiHeart } from 'react-icons/bi'

const Wishlist = () => {

    const { state } = useProduct()

    return (
        <div className='wishlist'>

            {state.wishlist.length === 0 ?
                <>
                    <div className='empty-wishlist'>
                        <BiHeart className='icon' />
                        <span>&nbsp;Start wishlisting</span>
                    </div>
                </> :
                <>
                    <h4>My Wishlist <BiHeart className='heart-icon' /></h4>

                    <div className='wishlist-container'>
                        {state.wishlist.map(({ product, _id }) => {
                            return <WishlistCard key={product._id} img={product.image} price={product.price} name={product.name} id={_id} />
                        })}
                    </div>
                </>
            }


        </div>
    )
}

export default Wishlist
