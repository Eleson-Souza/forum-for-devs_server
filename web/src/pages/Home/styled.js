import styled from 'styled-components';

export const HomeArea = styled.div`

display: flex;
align-items: center;
padding: 0 60px;

.area-description {
    /*background-color: #888;*/
    flex: 1;
    margin-top: 60px;
    padding-right: 20px;

    h1 {
        font-size: 68px;
    }

    p {
        font-size: 18px;
        font-weight: bold;
        margin-top: 15px;
        margin-bottom: 70px;
    }

    a {
        text-decoration: none;
        padding: 20px 41px;
        background-color: #683BA4;
        border: none;
        border-radius: 9px;
        color: #FFF;
        font-size: 20px;
        font-weight: bold;
        transition: all ease 0.3s;

        &:hover {
            background-color: #7a44c0;
        }
    }
}

.area-image {
    /*background-color: #777;*/
    flex: 1;

    img {
        width: 670px;
    }
}

`;