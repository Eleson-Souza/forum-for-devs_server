import React from 'react';
import { Link } from 'react-router-dom';

import { HomeArea } from './styled';
import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import imgDeveloapment from '../../images/development.png';

function Home() {
    return (
        <>
            <Header />

            <HomeArea>

                <div className="area-description">
                    
                    <h1>Forum For Devs</h1>
                    <p>
                        Tire dúvidas e aprenda sobre variados assuntos relacionados a tecnologia. Este é um site de perguntas e respostas para profissionais e entusiastas na área de programação de computadores.
                    </p>
                    <Link to="/questions">Visualizar Perguntas</Link>

                </div>

                <div className="area-image">

                    <img src={imgDeveloapment} alt="imagem principal"/>

                </div>

            </HomeArea>

            <Footer />
        </>
    );
}

export default Home;