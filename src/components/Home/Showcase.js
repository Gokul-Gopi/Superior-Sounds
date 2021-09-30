import React, { useState } from 'react'
import './Showcase.css'
import { Link } from "react-router-dom";
import { useAuth } from '../../Context/AuthContext';
import { useModal } from '../../Context/ModalContext';
import { BiStoreAlt } from 'react-icons/bi'
import 'react-toastify/dist/ReactToastify.css';


const Showcase = () => {

    const { authState } = useAuth();
    const { modalDispatch } = useModal()


    return (
        <div className='showcase-products'>

            <div className='banner-btns'>
                <span className='banner-title'>Pick from the best brands</span>

                <Link to='/products'>
                    <button className='browse-btn'>
                        {/* <BiStoreAlt className='icon' /> */}
                        <span>Store</span>
                    </button>
                </Link>
            </div>

            <div className='bannerImg'>
                <img src="https://images.unsplash.com/photo-1588449668365-d15e397f6787?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="product" />
                <span>Accoustic</span>
            </div>

            <div className='bannerImg'>
                <img src="https://images.unsplash.com/photo-1592051148515-c5c06b3f919a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="product" />
                <span>Electric Guitar</span>
            </div>

            <div className='bannerImg'>
                <img src="https://images.unsplash.com/photo-1595340515387-61155fd65420?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="product" />
                <span>Bass</span>
            </div>
        </div>
    )
}

export default Showcase

