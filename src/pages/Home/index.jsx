import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../context/store';

function Home() {
    const ctx = useContext(store)
    const navigate = useNavigate()

    useEffect(() => {
        if (!ctx.userAddress) {
            console.log('No user address found...')
            navigate('/login')
        }
    }, [])

    return (
        <p>Home</p>
    )
}

export default Home;