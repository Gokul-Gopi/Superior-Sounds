import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import { useProduct } from '../../Context/ProductContext'
import '../Login/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../Context/ModalContext'
import callToastify from '../../Utils/toast'
import { IoMdMail } from 'react-icons/io'
import { BsShieldLockFill } from 'react-icons/bs'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { RiCloseFill } from 'react-icons/ri'
import { FiMail } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'



const Login = () => {
    const { dispatch } = useProduct()
    const { loginHandler } = useAuth();
    const { modalState, modalDispatch } = useModal()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        eMail: '',
        password: ''
    })

    // const [errorMessage, seterrorMessage] = useState('')

    const loginUser = async (credentials) => {
        dispatch({ type: 'SET_LOADING' })
        const response = await loginHandler(credentials)

        if (response.status === 200) {
            modalDispatch({ type: 'LOGIN' })
            navigate('/')
            callToastify(`Successfully logged in!`)
        } else {
            callToastify(response.data.message, 'ERROR')
        }

        dispatch({ type: 'SET_LOADING' })
    }

    // const guestAccountLogin = async () => {
    //     setCredentials(preValue => ({ ...preValue, eMail: 'gg123@test.com', password: 'test1234' }))
    //     await loginUser()
    // }


    return (
        <div className='login' style={{ display: modalState.login ? 'block' : 'none' }} onClick={() => modalDispatch({ type: 'LOGIN' })}>

            <div className="login-container" onClick={(e) => e.stopPropagation()} >
                {/* <button className='close-modal-btn' > <RiCloseFill /></button> */}
                {/* <div><span style={{ color: 'red' }}>{errorMessage}</span></div> */}
                <div>
                    <div className='input-box'>
                        <FiMail className='icon' />
                        <input type="text" value={credentials.eMail} onChange={(e) => setCredentials(preValue => ({ ...preValue, eMail: e.target.value }))} placeholder='e-Mail' />
                    </div>

                    <div className='input-box'>
                        <RiLockPasswordLine className='icon' />
                        <input type="password" value={credentials.password} onChange={(e) => setCredentials(preValue => ({ ...preValue, password: e.target.value }))} placeholder='password' />
                    </div>

                    <div className='options'>
                        <button className='login-btn' onClick={() => loginUser(credentials)} >Login</button>
                        <button className='guest-credentials-btn' onClick={() => loginUser({ eMail: 'gg123@test.com', password: 'test1234' })}>Guest</button>
                    </div>
                </div>
                <div className='create-account-link'>
                    <span>Dont have an account? &nbsp; <strong onClick={() => {
                        modalDispatch({ type: 'LOGIN' })
                        modalDispatch({ type: 'SIGN_UP' })
                    }}
                    >Sign Up</strong></span>
                </div>
            </div>


        </div>
    )
}

export default Login
