import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import { useProduct } from '../../Context/ProductContext'
import '../Login/Login.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


// gokulg9090@gmail.com


const Login = () => {

    const { authState, authDispatch } = useAuth();
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        eMail: '',
        password: ''
    })

    const [errorMessage, seterrorMessage] = useState('')

    const loginHandler = async (event) => {
        event.preventDefault();
        try {
            // dispatch({ type: 'SET_LOADING', payload: true })
            let { data } = await axios.post('/user/login', credentials);
            if (data.success) {
                const user = data.user
                authDispatch({ type: "SET_USER", payload: user.name })
                localStorage.setItem('userDetails', JSON.stringify({
                    name: user.name,
                    token: user.token,
                }))
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
        // dispatch({ type: 'SET_LOADING', payload: false })

    }

    return (
        <div className='login'>

            <div><span style={{ color: 'red' }}>{errorMessage}</span></div>
            <div className="login-container">
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
            </div>

            <div className='create-account-link'>
                <span>Dont have an account? &nbsp; <strong>Sign Up</strong></span>
            </div>
        </div>
    )
}

export default Login
