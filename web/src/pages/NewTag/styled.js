import styled from 'styled-components';

export const TagArea = styled.div`

margin-top: 37px;

h1 {
    font-size: 25px;
    margin-bottom: 36px;
}

form {
    margin: auto;
    width: 918px;
    box-sizing: border-box;
    background-color: #FFF;
    border-radius: 8px;
    padding: 35px 65px;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.5);

    div {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 3px;
    }

    input, textarea, select {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #756F6F;
        border-radius: 5px;
        outline: 0;
        padding: 5px 10px;
        margin-bottom: 23px;
        font-size: 14px;
    }

    textarea {
        height: 180px;
        resize: none;
    }

    input[type="file"] {
        display: none;
    }

    label {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 23px;
        background-color: #2E4BDC;
        color: #FFF;
        border: 2px solid #2E4BDC;
        border-radius: 10px;
        width: 170px;
        padding: 12px 20px;
        cursor: pointer;
        transition: all ease 0.3s;

        span {
            margin-left: 10px;
        }

        &:hover {
            background-color: #FFF;
            color: #000;
            border: 2px solid #000;
        }
        
    }

    button {
        background-color: #4BB94F;
        color: #FFF;
        font-size: 16px;
        font-weight: 500;
        border: none;
        border-radius: 5px;
        outline: 0;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.5);
        padding: 10px 30px;
        cursor: pointer;
        transition: all ease 0.3s;

        &:hover {
            background-color: #419D45;
        }
    }
}

`;