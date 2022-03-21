import React, { useContext } from 'react';
import Store from "../../context/store"
import { useAlert } from 'react-alert'
import ApiService from '../../api';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const StyledLoginWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    position: relative;
`;

const Overlay = styled.div`
width: 100%;
height: 100%;
background: #003b6d;
clip-path: polygon(0 0, 0% 100%, 100% 100%);
z-index: 1;
`

const StyledLoginForm = styled.form`
    width: 35%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 3rem;
    background-color: #fff;
    border: 1px solid #dadada;
    border-radius: 5px;
    min-height: 225px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2;
    label {
        font-family: sans-serif;
        font-size: 18px;
        margin-bottom: 1rem;
    }
    button {
        margin-top: 1rem;
    }
    input {
        width: 300px;
    }
`;

// Login

function Login() {
    // State & Misc.
    const ctx = useContext(Store);
    const alert = useAlert();
    const navigate = useNavigate();

    // Methods
    const handleLogin = (e) => {
        e.preventDefault();
        if (!ctx.userAddress.length) {
            alert.error('Jobcoin address required');
        } else {
            fetchAddress()
        }
    }

    const fetchAddress = async () => {
        try {
            let addressInfo = await ApiService.fetchAddressInfo(ctx.userAddress);
            ctx.setUserInfo(addressInfo);
            navigate('/')
        } catch (error) {
            console.error(error)
            alert.error('Unable to fetch address info...');
        }
    }
    
    // Lifecycles
    return (
        <StyledLoginWrapper>
            <StyledLoginForm>
                <label htmlFor='address'>Login</label>
                <input 
                    id='address'
                    type="text"
                    placeholder='Enter your Jobcoin address...' 
                    onChange={(e) => ctx.setUserAddress(e.target.value)}
                />
                <button onClick={(e) => handleLogin(e)} >Login</button>
            </StyledLoginForm>
            <Overlay />
        </StyledLoginWrapper>
    )
}

export default Login;