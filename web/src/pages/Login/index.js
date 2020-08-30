import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

import { LoginArea } from './styled';
import { doLogin } from '../../services/authHandler';
import api from '../../services/api';
import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import { ErrorMessage, ErrorMessageMain } from '../../components/MainComponents';

import imgLogo from '../../images/logo.png';

function Login() {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errors, setErrors] = useState({});

    const handleValidateLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('login', {email, password});
            const { token, id, name, email: adress } = response.data;

            doLogin(token, id, name, adress);
            window.location.href = '/';
        } catch (error)  {
            setErrors(error.response.data);
        }
    }

    return (
        <>
            <Header />

            <LoginArea>
                
                <div className="login">
                    <div className="logo-name">
                        <img src={imgLogo} alt="logo" />
                        <span>Forum Devs</span>
                    </div>

                    <h2>Acesse sua conta</h2>

                    <form method="POST" onSubmit={handleValidateLogin}>
                        { errors.error &&
                            <ErrorMessageMain>
                                <FiX color="#F00" size="25px" />
                                <span>{errors.error}</span>
                            </ErrorMessageMain>
                        }

                        { errors.email &&
                            <ErrorMessage>
                                <FiX color="#F00" size="20px" />
                                <span>{errors.email}</span>
                            </ErrorMessage>
                        }
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder="E-mail" 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                        />

                        { errors.password &&
                            <ErrorMessage>
                                <FiX color="#F00" size="20px" />
                                <span>{errors.password}</span>
                            </ErrorMessage>
                        }
                        <input type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Senha" 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>

            </LoginArea>

            <Footer />
        </>
    );
}

export default Login;