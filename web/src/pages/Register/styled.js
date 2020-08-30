import styled from 'styled-components';

export const RegisterArea = styled.div`

display: flex;
justify-content: center;
align-items: center;
height: calc(100vh - 60px);

.register {
    width: 496px;
    box-sizing: border-box;
    background-color: #FFF;
    box-shadow: 0px 0px 5px #000;
    border-radius: 10px;
    padding: 24px 42px;

    .logo-name {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 45px;
        }

        span {
            margin-left: 8px;
            font-size: 17px;
        }
    }

    h2 {
        font-size: 26px;
        text-align: center;
        margin-top: 17px;
        margin-bottom: 55px;
    }

    form {
        display: flex;
        flex-direction: column;

        input {
            margin-bottom: 27px;
            background-color: #F0F0F0;
            border: 2px solid #C4C4C4;
            border-radius: 7px;
            padding: 7px 10px;
            outline: none;
            font-size: 16px;
            transition: all ease-in 0.3s;

            &:hover {
                border: 2px solid #000;
            }
        }

        button {
            background-color: #48C95D;
            border: none;
            border-radius: 7px;
            padding: 8px;
            color: #FFF;
            font-size: 16px;
            cursor: pointer;
            transition: all ease 0.3s;

            &:hover {
                background-color: #3a9e4a;
            }
        }
    }
}

`;