import styled from 'styled-components';

export const ErrorMessage = styled.div`

display: flex;
align-items: center;
background-color: #EB9595;
color: #FFF;
font-size: 15px;
padding: 5px 10px;
margin-bottom: 5px;
border: 1px solid #A96767;
border-radius: 5px;

span {
    margin-left: 10px;
}

`;

export const ErrorMessageMain = styled.div`

display: flex;
align-items: center;
background-color: #EB9595;
color: #FFF;
font-size: 17px;
padding: 10px 10px;
margin-bottom: 30px;
border: 1px solid #A96767;
border-radius: 5px;

span {
    margin-left: 10px;
}

`;

export const Container = styled.div`
    max-width: 1000px;
    margin: auto;
`;