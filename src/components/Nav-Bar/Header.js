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
    const [toggleHamburgerMenu, setHamburgerMenu] = useState(null)

    const checkbox = document.querySelector('.nav-toggle')
  
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

            <input type="checkbox" id="nav-toggle" className='nav-toggle' onClick={() => setHamburgerMenu(preState => !preState)} checked={toggleHamburgerMenu} />
            <label htmlFor="nav-toggle">
                <BiMenu className='hamburger-menu-icon' />
            </label>

            <div className='header_options'>
                <Link to='/products' className='nav-link'>
                    <button className='nav-btn' onClick={() => setHamburgerMenu(false)}>
                        <BiStoreAlt className='navbar-icon' />
                        <span className='link-name'>Store</span>
                    </button>
                </Link>

                <Link to='/cart' className='nav-link'>
                    <button className='nav-btn' onClick={() => { getUserCart(dispatch); setHamburgerMenu(false); }} >
                        <AiOutlineShoppingCart className='navbar-icon' />
                        <span className='link-name'>Cart</span>
                    </button>
                </Link>

                <Link to='/wishlist' className='nav-link'>
                    <button className='nav-btn' onClick={() => { getUserWishlist(dispatch); setHamburgerMenu(false) }}>
                        <BiHeart className='navbar-icon' />
                        <span className='link-name'>Wishlist</span>
                    </button>
                </Link>


                {authState.isLoggedIn
                    ? <div className='nav-link'>
                        <button className='nav-btn' onClick={() => { modalDispatch({ type: 'LOGOUT' }); setHamburgerMenu(false) }} >
                            <BiUserCircle className='navbar-icon' />
                            <span className='link-name'>User</span>
                        </button>
                    </div>

                    : <div className='nav-link'>
                        <button className='nav-btn' onClick={() => { modalDispatch({ type: 'LOGIN' }); setHamburgerMenu(false) }}>
                            <BiUserCircle className='navbar-icon' />
                            <span className='link-name'>Log in</span>
                        </button>
                    </div>
                }

            </div>

        </nav>
    )
}

export default Header
