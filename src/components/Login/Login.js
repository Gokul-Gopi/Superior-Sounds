import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import { useProduct } from '../../Context/ProductContext'
import '../Login/Login.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../Context/ModalContext'


const Login = () => {

    const { authDispatch } = useAuth();
    const { modalState, modalDispatch } = useModal()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        eMail: '',
        password: ''
    })

    const [errorMessage, seterrorMessage] = useState('')

    const loginHandler = async (event) => {
        event.preventDefault();

        try {
            let { data } = await axios.post('/user/login', credentials);
            if (data.success) {
                const user = data.user;
                authDispatch({ type: "SET_USER", payload: user.name });
                authDispatch({ type: "SET_USER_TOKEN", payload: user.token });
                localStorage.setItem('userDetails', JSON.stringify({
                    name: user.name,
                    token: user.token,
                }))
                modalDispatch({ type: 'LOGIN' })
                navigate('/')
            }
            else {
                seterrorMessage(data.message)
                setCredentials((preValue) => ({
                    eMail: '',
                    password: ''
                }))
            }
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }

    }

    return (
        <div className='login' style={{ display: modalState.login ? 'block' : 'none' }} onClick={() => modalDispatch({ type: 'LOGIN' })}>

            <div className="login-container" onClick={(e) => e.stopPropagation()} >
                <div><span style={{ color: 'red' }}>{errorMessage}</span></div>
                <form onSubmit={(e) => loginHandler(e)}>
                    <div>
                        <label htmlFor="name">E-mail</label>
                        <input type="text" value={credentials.eMail} onChange={(e) => setCredentials(preValue => ({ ...preValue, eMail: e.target.value }))} />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" value={credentials.password} onChange={(e) => setCredentials(preValue => ({ ...preValue, password: e.target.value }))} />
                    </div>

                    <div>
                        <button>Login</button>
                    </div>
                </form>
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
