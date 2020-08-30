import React from 'react';
import { Link } from 'react-router-dom';

import { ErrorArea } from './styled';

function NotFound() {
    return (
        <>
            <ErrorArea>
                <h1>404</h1>
                <span>Página não encontrada!</span>
                <Link to='/'>Voltar para Home</Link>
            </ErrorArea>
        </>
    );
}

export default NotFound;