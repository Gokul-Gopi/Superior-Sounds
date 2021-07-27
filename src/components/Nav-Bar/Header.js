import React, { useEffect } from 'react'
import "./Header.css";
import { Link } from 'react-router-dom';
import { useProduct } from '../../Context/ProductContext'
import { useAuth } from '../../Context/AuthContext'
import { getUserCart } from "../../Utils/NetworkCalls";
import { useModal } from '../../Context/ModalContext';


const Header = () => {

    const { state, dispatch } = useProduct()
    const { authState } = useAuth();
    const { modalDispatch } = useModal()

    const changeUserLogo = () => {
        const userName = authState.currentUserName
        const firstLetter = userName.slice(0, 1)
        return firstLetter;
    }

    return (
        <nav className='navibar'>
            <Link to='/' className='link-to-home'>
                <div className='header_main'>
                    <div className='header_logo'>
                        <img src="https://image.flaticon.com/icons/png/512/142/142437.png" alt="logo" />
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
                <Link to='/cart'>
                    <button onClick={() => getUserCart(dispatch)}
                    >{state.cart.length !== 0 && <span className='cart-length'>{state.cart.length}</span>}
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </Link>

                <Link to='/wishlist'>
                    <button><i class="far fa-heart"></i></button>
                </Link>


                {authState.isLoggedIn
                    ? <button className='userLogoBtn' onClick={() => modalDispatch({ type: 'LOGOUT' })}>
                        {changeUserLogo()}
                        <span className='tooltiptext'>{authState.currentUserName}</span>
                    </button>
                    : <button onClick={() => modalDispatch({ type: 'LOGIN' })}>
                        <i class="far fa-user"></i>
                    </button>
                }


            </div>

        </nav>
    )
}

export default Header
