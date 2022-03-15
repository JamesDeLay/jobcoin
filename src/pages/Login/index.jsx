import React, { useContext, useEffect } from 'react';
import Store from "../../context/store"
import {StyledLoginWrapper, StyledLoginForm} from './styles.js'

function Login() {
    const ctx = useContext(Store);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                let res = await fetch(`http://jobcoin.gemini.com/reflux-shorter/api/transactions`)
                let data = await res.json()
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }

        console.log('MOUNTED')
        console.log(ctx)
        fetchTest()
    }, [ctx])

    return (
        <StyledLoginWrapper>
            <StyledLoginForm>
                <h1>Login</h1>
                <input 
                    type="text"
                    placeholder='Enter your Jobcoin address...' 
                    onChange={(e) => ctx.setUserAddress(e.target.value)}
                />
                <button>Submit</button>
            </StyledLoginForm>
        </StyledLoginWrapper>
    )
}

export default Login;