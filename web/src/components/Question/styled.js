import styled from 'styled-components';

export const QuestionArea = styled.div`

width: 49%;
background-color: #FFF;
border-radius: 10px;
box-shadow: 0px 0px 5px #000;
margin-top: 15px;
cursor: default;

a {
    text-decoration: none;
    color: #000;

    &:hover {
        text-decoration: underline;
    }
}

h3 {
    margin: 10px 15px;
    font-size: 14px;
}

.info {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    font-size: 12px;

    .desc {
        display: flex;
        align-items: center;
        margin-top: 4px;

        span {
            margin-left: 5px;
        }
    }
}

.tags {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    font-size: 12px;

    .items {
        margin-left: 10px;

        div {
            display: inline-block;
            background-color: #B0CEDA;
            border-radius: 3px;
            color: #000;
            padding: 3px 10px;
            margin: 0px 2px 4px 2px;
        }

        small {
            font-size: 12px;
            color: #F00;
        }
    }
}

`;