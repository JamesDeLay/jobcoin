import React, { useContext } from 'react';
import Store from "../../context/store"
import { useAlert } from 'react-alert'
import ApiService from '../../api';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const StyledLoginWrapper = styled.div`
    height: 100vh;
    width: 100vw;
`;

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
    label {
        font-family: 'Roboto', sans-serif;
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
        </StyledLoginWrapper>
    )
}

export default Login;