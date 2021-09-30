import React from 'react'
import "./Header.css";
import { Link } from 'react-router-dom';
import { useProduct } from '../../Context/ProductContext'
import { useAuth } from '../../Context/AuthContext'
import { getUserCart, getUserWishlist } from "../../Utils/NetworkCalls";
import { useModal } from '../../Context/ModalContext';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiHeart } from 'react-icons/bi'
import { BiStoreAlt } from 'react-icons/bi'
import { BiUserCircle } from 'react-icons/bi'
import { BsMusicNote } from 'react-icons/bs'


const Header = () => {
    const customLinkStyling = { display: 'flex', flexDirection: 'column', textDecoration: 'none', alignItems: 'center', width: '5rem' }
    const { dispatch } = useProduct();
    const { authState } = useAuth();
    const { modalDispatch } = useModal();


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
                <input type="search" placeholder='Search products' />
            </div>

            <div className='header_options'>

                <Link to='/products' style={customLinkStyling}>
                    <BiStoreAlt className='navbar-icon' />
                    <span className='link-name'>Store</span>
                </Link>

                <Link to='/cart' style={customLinkStyling}>
                    <AiOutlineShoppingCart className='navbar-icon' onClick={() => getUserCart(dispatch)} />
                    <span className='link-name'>Cart</span>
                </Link>

                <Link to='/wishlist' style={customLinkStyling}>
                    <BiHeart className='navbar-icon' onClick={() => getUserWishlist(dispatch)} />
                    <span className='link-name'>Wishlist</span>
                </Link>


                {authState.isLoggedIn
                    ? <div style={customLinkStyling}>
                        <BiUserCircle className='navbar-icon' onClick={() => modalDispatch({ type: 'LOGOUT' })} />
                        <span className='link-name'>User</span>
                    </div>

                    : <div style={customLinkStyling}>
                        <BiUserCircle className='navbar-icon' onClick={() => modalDispatch({ type: 'LOGIN' })} />
                        <span className='link-name'>Log in</span>
                    </div>
                }

            </div>

        </nav>
    )
}

export default Header
