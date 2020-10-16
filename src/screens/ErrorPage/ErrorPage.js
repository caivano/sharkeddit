import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import useChangeTitle from '../../hooks/useChangeTitle';
import { goToFeed } from '../../routes/Coordinator';
import { MainContainer, ErrorImg } from './styled'
import ErrorShark from '../../assets/img/error-shark.png'

const ErrorPage = () => {
    const history = useHistory()

    useChangeTitle("Erro")

    return ( 
        <MainContainer>
            <ErrorImg alt={'erro 404'} src={ErrorShark}/>
            <Typography color={'primary'} variant={'h4'} align={'center'} gutterBottom>Hmmmm... não encontramos esta página!</Typography>
            <Button variant="contained" onClick={() => goToFeed(history)}>voltar</Button>
        </MainContainer>
     );
}
 
export default ErrorPage;
