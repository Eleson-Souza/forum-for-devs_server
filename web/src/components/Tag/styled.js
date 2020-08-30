import styled from 'styled-components';

export const TagArea = styled.div`

width: 49%;
background-color: #FFF;
font-size: 14px;
border-radius: 10px;
box-shadow: 0px 0px 5px #000;
margin-top: 15px;
cursor: default;

.title-header {
    display: flex;  
    align-items: center;
    justify-content: space-between;
    background-color: #4987aa3b;
    padding: 8px 15px;
    border-radius: 10px 10px 0px 0px;
    
    a {
        text-decoration: none;
        color: #000;

        &:hover {
            text-decoration: underline;
        }

        h3 {
            font-size: 18px;
        }
    }

    img {
        width: 40px;
    }
}

.info-body {
    padding: 10px 15px;
    text-align: justify;
}

.info-footer {
    margin-bottom: 10px;
    padding: 0px 15px;

    >span {
        font-weight: bold;
    }

    div {
        display: flex;
        align-items: center;
        margin-top: 3px;

        span {
            margin-left: 5px;
        }
    }
}

`;