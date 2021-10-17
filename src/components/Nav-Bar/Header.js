import React, { useState, useRef } from 'react'
import "./Header.css";
import { Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../../Context/ProductContext'
import { useAuth } from '../../Context/AuthContext'
import { getUserCart, getUserWishlist } from "../../Utils/NetworkCalls";
import { useModal } from '../../Context/ModalContext';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiHeart } from 'react-icons/bi'
import { BiStoreAlt } from 'react-icons/bi'
import { BiUserCircle } from 'react-icons/bi'
import { BsMusicNote } from 'react-icons/bs'
import { BiMenu } from 'react-icons/bi'


const Header = () => {
    const { state, dispatch } = useProduct();
    const { authState } = useAuth();
    const { modalDispatch } = useModal();
    const navigate = useNavigate()
    const [searchSuggestion, setSearchSuggestion] = useState({
        suggestionBox: false,
        list: []
    })
    const inputRef = useRef('')

    const searchProducts = (searchInput) => {
        if (searchInput.length !== 0) {
            const searchResults = state.allProducts.filter(product => {
                return product.name.toLowerCase().includes(searchInput.toLowerCase())
            })
            setSearchSuggestion({ suggestionBox: true, list: searchResults })

        } else {
            setSearchSuggestion({ suggestionBox: false, list: [] })
        }
    }

    const navigateToProduct = (id) => {
        navigate(`/products/${id}`)
        setSearchSuggestion({ suggestionBox: false, list: [] })
        inputRef.current.value = ''
    }

    return (
        <nav className='navigation-bar'>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <div className='header_main'>
                    <div className='header_logo'>
                        <BsMusicNote className='icon' />
                    </div>

                    <div className="header_headings">
                        <h1 className='primary-heading'>SUPERIOR</h1>
                        <h1 className='secondary-heading'>SOUNDS</h1>
                    </div>

                </div>
            </Link>


            <div className='header_search'>
                <input type="search" placeholder='Search products' onChange={(e) => searchProducts(e.target.value)} ref={inputRef} />

                {searchSuggestion.suggestionBox
                    ? <div className="search-suggestions">
                        {searchSuggestion.list.map(item => {
                            return (
                                <span className='item' onClick={() => navigateToProduct(item._id)}>{item.name}</span>
                            )
                        })}
                    </div>
                    : null
                }
            </div>

            <input type="checkbox" id="nav-toggle" className='nav-toggle' />
            <label htmlFor="nav-toggle">
                <BiMenu className='hamburger-menu-icon' />
            </label>

            <div className='header_options'>
                <Link to='/products' className='nav-link'>
                    <BiStoreAlt className='navbar-icon' />
                    <span className='link-name'>Store</span>
                </Link>

                <Link to='/cart' className='nav-link'>
                    <AiOutlineShoppingCart className='navbar-icon' onClick={() => getUserCart(dispatch)} />
                    <span className='link-name'>Cart</span>
                </Link>

                <Link to='/wishlist' className='nav-link'>
                    <BiHeart className='navbar-icon' onClick={() => getUserWishlist(dispatch)} />
                    <span className='link-name'>Wishlist</span>
                </Link>


                {authState.isLoggedIn
                    ? <div className='nav-link'>
                        <BiUserCircle className='navbar-icon' onClick={() => modalDispatch({ type: 'LOGOUT' })} />
                        <span className='link-name'>User</span>
                    </div>

                    : <div className='nav-link'>
                        <BiUserCircle className='navbar-icon' onClick={() => modalDispatch({ type: 'LOGIN' })} />
                        <span className='link-name'>Log in</span>
                    </div>
                }

            </div>

        </nav>
    )
}

export default Header
