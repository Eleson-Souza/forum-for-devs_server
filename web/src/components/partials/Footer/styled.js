import styled from 'styled-components';

export const FooterArea = styled.footer`

display: flex;
align-items: center;
background-color: #D4D4D4;
height: 182px;
margin-top: 50px;
padding: 0 100px;

.logo {
    img {
        width: 96px;
    }
}

.footer-info {
    flex: 1;
    display: flex;
    justify-content: center;

    div {
        margin: 0px 50px;
    }

    .about {

    }

    .socials {
        img {
            width: 35px;
            margin-right: 20px;
    }
}

}

`;