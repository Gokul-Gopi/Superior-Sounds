import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import './Logout.css'
import { RiCloseFill } from 'react-icons/ri'
import { BiCheck } from 'react-icons/bi'
import { useModal } from '../../Context/ModalContext'
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../../Context/ProductContext'

const Logout = () => {
    const { dispatch } = useProduct();
    const { authState } = useAuth();
    const { modalState, modalDispatch } = useModal();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch({ type: 'SET_LOADING' });
        modalDispatch({ type: 'LOGOUT' })
        localStorage.removeItem('userDetails');
        navigate('/');
        window.location.reload();
    }


    return (
        <div className='logout' style={{ display: modalState.logout ? 'block' : 'none' }} onClick={() => modalDispatch({ type: 'LOGOUT' })}>
            <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
                <RiCloseFill className='close-btn' onClick={() => modalDispatch({ type: 'LOGOUT' })} />
                <div className='logout-warning'><span>Sure you wanna logout {authState.currentUserName}?</span></div>
                <div className='logout-btns'>
                    <button onClick={() => logoutHandler()}><BiCheck className='icon' />Yep</button>
                    <button onClick={() => modalDispatch({ type: 'LOGOUT' })}><RiCloseFill className='icon' />Nope</button>
                </div>
            </div>
        </div>
    )
}

export default Logout
