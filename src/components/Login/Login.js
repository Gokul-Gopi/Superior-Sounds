import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import { useProduct } from '../../Context/ProductContext'
import '../Login/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../Context/ModalContext'
import callToastify from '../../Utils/toast'



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

    const loginUser = async () => {
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


    return (
        <div className='login' style={{ display: modalState.login ? 'block' : 'none' }} onClick={() => modalDispatch({ type: 'LOGIN' })}>

            <div className="login-container" onClick={(e) => e.stopPropagation()} >
                {/* <div><span style={{ color: 'red' }}>{errorMessage}</span></div> */}
                <div>
                    <div>
                        <label htmlFor="name">E-mail</label>
                        <input type="text" value={credentials.eMail} onChange={(e) => setCredentials(preValue => ({ ...preValue, eMail: e.target.value }))} />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" value={credentials.password} onChange={(e) => setCredentials(preValue => ({ ...preValue, password: e.target.value }))} />
                    </div>

                    <div>
                        <button onClick={() => loginUser()} > Login</button>
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
