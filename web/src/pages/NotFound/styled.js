import styled from 'styled-components';

export const ErrorArea = styled.div`

background-color: #2B2B34;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
color: #fff;

h1 {
    font-size: 100px;
}

span {
    font-size: 25px;
}

a {
    text-decoration: none;
    background-color: #485A83;
    margin-top: 30px;
    padding: 10px 20px;
    border-radius: 8px;
    color: #FFF;
    transition: all ease 0.2s;

    &:hover {
        background-color: #404e70;
    }
}

`;