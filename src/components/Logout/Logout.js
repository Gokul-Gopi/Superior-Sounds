import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import './Logout.css'
import { RiCloseFill } from 'react-icons/ri'
import { useModal } from '../../Context/ModalContext'
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../../Context/ProductContext'

const Logout = () => {
    const { authState, authDispatch } = useAuth()
    const { modalState, modalDispatch } = useModal()
    const navigate = useNavigate()//----------------navigate to home----

    const logoutHandler = () => {
        modalDispatch({ type: 'LOGOUT' })
        navigate('/')
        window.location.reload()
        localStorage.removeItem('userDetails')
        authDispatch({ type: 'RESET' })
    }


    return (
        <div className='logout' style={{ display: modalState.logout ? 'block' : 'none' }} onClick={() => modalDispatch({ type: 'LOGOUT' })}>
            <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
                <RiCloseFill className='close-btn' onClick={() => modalDispatch({ type: 'LOGOUT' })} />
                <div className='logout-warning'><span>Sure you wanna logout {authState.currentUserName}?</span></div>
                <div className='logout-btns'>
                    <button onClick={() => logoutHandler()}>Yes</button>
                    <button onClick={() => modalDispatch({ type: 'LOGOUT' })}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Logout
