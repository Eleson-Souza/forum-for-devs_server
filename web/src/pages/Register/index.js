import React, { useState } from 'react';

import { RegisterArea } from './styled';
import api from '../../services/api';
import { doLogin } from '../../services/authHandler';
import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import { ErrorMessage } from '../../components/MainComponents';

import imgLogo from '../../images/logo.png';

function Register() {

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [errors, setErrors] = useState({});

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            let response = await api.post('users', {
                name,
                email,
                password,
                confirmPassword
            });
            let {token, id, name: user, email: address} = response.data;

            doLogin(token, id, user, address);
            window.location.href = '/';
        } catch(error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    return (
        <>
            <Header />

            <RegisterArea>
                
                <div className="register">
                    <div className="logo-name">
                        <img src={imgLogo} alt="logo" />
                        <span>Forum Devs</span>
                    </div>

                    <h2>Cadastro de Usuário</h2>

                    <form method="POST" onSubmit={handleRegister}>
                        { errors.name &&
                            <ErrorMessage>{errors.name}</ErrorMessage>
                        }
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Nome" 
                            value={name} 
                            onChange={(e)=>setName(e.target.value)}
                        />

                        { errors.email &&
                            <ErrorMessage>{errors.email}</ErrorMessage>
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
                            <ErrorMessage>{errors.password}</ErrorMessage>
                        }
                        <input type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Senha" 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                        />

                        { errors.confirmPassword &&
                            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                        }
                        <input type="password" 
                            name="confirmPassword" 
                            id="confirmPassword" 
                            placeholder="Confirmar senha" 
                            value={confirmPassword} 
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                        <button type="submit">Finalizar Cadastro</button>
                    </form>
                </div>

            </RegisterArea>

            <Footer />
        </>
    );
}

export default Register;