import React, { useState } from 'react'
import '../SignUp/SignUp.css'
import { RiCloseFill } from 'react-icons/ri'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { FiMail } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../Context/ModalContext'
import { useProduct } from '../../Context/ProductContext'
import { useAuth } from '../../Context/AuthContext'
import callToastify from '../../Utils/toast'


const SignUp = () => {
    const navigate = useNavigate();
    const { dispatch } = useProduct();
    const { authState, signUpHandler } = useAuth()
    const { modalState, modalDispatch } = useModal();

    const [userDetails, setuserDetails] = useState({
        firstName: '',
        lastName: '',
        eMail: '',
        pwd: '',
        confirmPwd: '',
    })

    const [formErrors, setformErrors] = useState({
        eMail: '',
        pwd: '',
        confirmPwd: ''
    })

    const [showPwd, setShowPwd] = useState(false)

    const validateForm = () => {
        let validator = true
        setShowPwd(false)
        const { eMail, pwd, confirmPwd } = userDetails

        const eMailValidator = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        const pwdValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        if (!eMailValidator.test(eMail)) {
            setformErrors(preValue => ({ ...preValue, eMail: 'Invalid e-Mail' }))
            validator = false
        }
        else {
            setformErrors(preValue => ({ ...preValue, eMail: '' }))
        }

        if (!pwdValidator.test(pwd)) {
            setformErrors(preValue => ({ ...preValue, pwd: 'Minimum 8 characters long and must contain a number' }))
            validator = false
        }
        else {
            setformErrors(preValue => ({ ...preValue, pwd: '' }))
        }


        if (pwd !== confirmPwd) {
            setformErrors(preValue => ({ ...preValue, confirmPwd: 'Passwords does not match' }))
            validator = false
        }
        else {
            setformErrors(preValue => ({ ...preValue, confirmPwd: '' }))
        }

        return validator
    }

    const signUpUser = async (event,) => {
        dispatch({ type: 'SET_LOADING' })
        event.preventDefault()

        if (validateForm()) {
            const response = await signUpHandler(userDetails)
            if (response.status === 201) {
                modalDispatch({ type: 'SIGN_UP' })
                callToastify(`Welcome ${response.data.name}`)
                navigate('/')
            } else {
                callToastify('Something went wrong! Try again later', 'error')
            }
        }
        dispatch({ type: 'SET_LOADING' })
    }


    return (
        <div className='signup' style={{ display: modalState.signUp ? 'block' : 'none' }} onClick={() => modalDispatch({ type: 'SIGN_UP' })}>
            <div className='signup-container' onClick={(e) => e.stopPropagation()}>

                <div className='signup_side-image'>
                    <div>
                        <h1>SUPERIOR</h1>
                        <h2>SOUNDS</h2>
                    </div>
                </div>
                <form className='signup-form'>
                    <RiCloseFill className='close-form-icon' onClick={() => modalDispatch({ type: 'SIGN_UP' })} />

                    <div>
                        <div className='input-box'>
                            <BiUserCircle className='icon' />
                            <input type="text" placeholder='Firstname' value={userDetails.firstName}
                                onChange={(e) => setuserDetails(preValue => ({ ...preValue, firstName: e.target.value }))} />

                        </div>
                    </div>

                    <div>
                        <div className='input-box'>
                            <BiUserCircle className='icon' />
                            <input type="text" placeholder='Lastname' value={userDetails.lastName}
                                onChange={(e) => setuserDetails(preValue => ({ ...preValue, lastName: e.target.value }))} />
                        </div>
                    </div>

                    <div>
                        <div className='input-box'>
                            <FiMail className='icon' />
                            <input type="text" placeholder='e-Mail' value={userDetails.eMail}
                                onChange={(e) => setuserDetails(preValue => ({ ...preValue, eMail: e.target.value }))} />
                        </div>
                        <span className='error'>{formErrors.eMail}</span>
                    </div>

                    <div>
                        <div className='input-box'>
                            {/* <label for="password">Password
                            <button className='show-pwd' onMouseDown={(e) => {
                                e.preventDefault()
                                setShowPwd(preValue => !preValue)
                            }}
                                onMouseUp={() => setShowPwd(preValue => !preValue)}>
                                {showPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </button>
                        </label> */}
                            <RiLockPasswordLine className='icon' />
                            <input type={showPwd ? 'text' : "password"} value={userDetails.pwd} name='password' placeholder='Password'
                                onChange={(e) => setuserDetails(preValue => ({ ...preValue, pwd: e.target.value }))} />

                        </div>
                        <span className='error'>{formErrors.pwd}</span>
                    </div>

                    <div>
                        <div className='input-box'>
                            <RiLockPasswordLine className='icon' />
                            <input type="password" placeholder='Confirm Password' value={userDetails.confirmPwd}
                                onChange={(e) => setuserDetails(preValue => ({ ...preValue, confirmPwd: e.target.value }))} />
                        </div>
                        <span className='error'>{formErrors.confirmPwd}</span>
                    </div>
                    <div>
                        <button className='submit-btn' onClick={(e) => signUpUser(e)}>Sign Up</button>
                    </div>
                    <div className='footer'>Already have an account? <strong onClick={() => {
                        modalDispatch({ type: 'LOGIN' })
                        modalDispatch({ type: 'SIGN_UP' })
                    }}>Login</strong> </div>

                </form>

            </div>
        </div>
    )
}

export default SignUp
