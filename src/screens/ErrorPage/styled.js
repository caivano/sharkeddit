import styled from 'styled-components';

export const MainContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
`

export const ErrorImg = styled.img`
    margin: 20px;

    @media(max-width: 1024px){
        width: 65vw;
    }
`