import React, { useState } from 'react'
import SignUp from '../SignUp/SignUp'
import Banner from './Banner'
import Showcase from './Showcase'
import Login from '../Login/Login'

const Home = () => {

    const [signUpDisplay, setSignUpDisplay] = useState('none')
    const toggleSignUp = (value) => setSignUpDisplay(value)

    return (
        <>
            <Banner />
            <Showcase toggle={toggleSignUp} />
            <SignUp toggle={toggleSignUp} displayValue={signUpDisplay} />
        </>
    )
}

export default Home
