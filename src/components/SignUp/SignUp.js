import React, { useState } from 'react'
import '../SignUp/SignUp.css'
import { RiCloseFill } from 'react-icons/ri'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../Context/ModalContext'


const SignUp = () => {

    const navigate = useNavigate()
    const { modalState, modalDispatch } = useModal()

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

    const signUpHandler = async (event) => {
        event.preventDefault()
        console.log(validateForm());
        if (validateForm()) {
            try {
                const { data: { token, name } } = await axios.post('/user/signup', userDetails)
                localStorage.setItem('userDetails', JSON.stringify({ name, token }))
                window.location.reload();
            } catch (err) {
                console.log(`Error: ${err.message}`)
            }
        }
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
                        <label htmlFor="">First Name</label>
                        <input type="text" value={userDetails.firstName}
                            onChange={(e) => setuserDetails(preValue => ({ ...preValue, firstName: e.target.value }))} />

                    </div>
                    <div>
                        <label htmlFor="">Last Name</label>
                        <input type="text" placeholder='Optional' value={userDetails.lastName}
                            onChange={(e) => setuserDetails(preValue => ({ ...preValue, lastName: e.target.value }))} />
                    </div>
                    <div>
                        <label htmlFor="">e-Mail</label>
                        <input type="text" value={userDetails.eMail}
                            onChange={(e) => setuserDetails(preValue => ({ ...preValue, eMail: e.target.value }))} />
                        <span className='error'>{formErrors.eMail}</span>
                    </div>
                    <div className='pwd-container'>
                        <label for="password">Password
                         <button className='show-pwd' onMouseDown={(e) => {
                                e.preventDefault()
                                setShowPwd(preValue => !preValue)
                            }}
                                onMouseUp={() => setShowPwd(preValue => !preValue)}>
                                {showPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </button>
                        </label>
                        <input type={showPwd ? 'text' : "password"} value={userDetails.pwd} name='password'
                            onChange={(e) => setuserDetails(preValue => ({ ...preValue, pwd: e.target.value }))} />

                        <span className='error'>{formErrors.pwd}</span>
                    </div>
                    <div>
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" value={userDetails.confirmPwd}
                            onChange={(e) => setuserDetails(preValue => ({ ...preValue, confirmPwd: e.target.value }))} />
                        <span className='error'>{formErrors.confirmPwd}</span>
                    </div>
                    <div>
                        <button className='submit-btn' onClick={(e) => signUpHandler(e)}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
