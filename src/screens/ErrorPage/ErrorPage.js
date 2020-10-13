import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { goToFeed } from '../../routes/Coordinator';
import ErrorShark from '../../assets/img/error-shark.png'
import { MainContainer, ErrorImg } from './styled'

const ErrorPage = () => {
    const history = useHistory()

    return ( 
        <MainContainer>
            <ErrorImg alt={'erro 404'} src={ErrorShark}/>
            <Typography color={'primary'} variant={'h4'} align={'center'} gutterBottom>Hmmmm... não encontramos esta página!</Typography>
            <Button variant="contained" onClick={() => goToFeed(history)}>voltar</Button>
        </MainContainer>
     );
}
 
export default ErrorPage;