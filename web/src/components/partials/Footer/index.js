import React from 'react';
import { Link } from 'react-router-dom';


import { FooterArea } from './styled';
import logo from '../../../images/logo.png';
import imgFacebook from '../../../images/facebook.png';
import imgInstagram from '../../../images/instagram.png';
import imgGithub from '../../../images/github.png';

function Footer() {
    return (
        <FooterArea>
            
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>

            <div className="footer-info">

                <div className="about">
                    <h4>Sobre</h4>
                    <br/>
                    <span>Fale Conosco</span>
                </div>

                <div className="socials">
                    <h4>Redes Sociais</h4>
                    <br/>
                    <img src={imgFacebook} alt="facebook"/>
                    <img src={imgInstagram} alt="instagram"/>
                    <img src={imgGithub} alt="github"/>
                </div>

            </div>

        </FooterArea>
    );
}

export default Footer;