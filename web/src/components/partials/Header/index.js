import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import { isLogged, getCookieUser, doLogout } from '../../../services/authHandler';
import { HeaderArea } from './styled';
import logo from '../../../images/logo.png';

function Header() {
    let logged = isLogged(); // logado ? true : false
    let user = getCookieUser(); // objeto do cookie user

    const handleLogout = () => {
        doLogout();
        window.location.href = '/login';
    }

    return (
        <HeaderArea>
            <div className="nav-menu-items">

                <ul>
                    <li className="logo-item">
                        <Link to="/" className="link-home">
                            <img src={logo} alt="logo" className="logo" />
                            <span>Forum For Devs</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/questions">Perguntas</Link>
                    </li>
                    <li>
                        <Link to="/tags">Tags</Link>
                    </li>
                </ul>

            </div>
            <div className="nav-menu-options">

                { !logged && 

                    <>
                        <Link to="/login" className="login">Login</Link>
                        <Link to="/users" className="register">Cadastrar</Link>
                    </>

                }

                { logged &&

                    <>
                        <button onClick={handleLogout} className="logout">Sair</button>
                        <div className="user-logged">
                            <FaUserCircle color="#FFF" size="32px" className="icon-user" />
                            <label>{user.name}</label>
                        </div>
                    </>

                }

            </div>
        </HeaderArea>
    );
}

export default Header;