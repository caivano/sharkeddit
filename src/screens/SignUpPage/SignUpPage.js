import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import useForm from '../../hooks/useForm';
import useUnprotectedPage from '../../hooks/useUnprotectedPage';
import { signup } from '../../services/users';
import { validate, ErrorText } from './validate'
import useChangeTitle from '../../hooks/useChangeTitle';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
      display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        width: '150px',
        margin: '5px',
    }
}));

const SignUpPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [errors, setErrors] = useState({})
    const [form, handleInputChange] = useForm({ 
        username: '', 
        email: '', 
        password: ''
    })

    useChangeTitle("Cadastro")
    useUnprotectedPage();

    const onClickSignUp = (event) => {
        event.preventDefault()
        if(validate(form,setErrors)){
            signup(form, history, props.setButtonName)
        }
    }

    return ( 
        <Container className={classes.container} maxWidth="xs">
            <Avatar className={classes.avatar}>
                <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Faça seu cadastro!
            </Typography>
            <form className={classes.form} id={'signup-form'}>
                <TextField
                    value={form.username}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nome de usuário"
                    name="username"
                    autoComplete="username"
                    autoFocus
                />
                <ErrorText>{errors.username}</ErrorText>
                <TextField
                    value={form.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    autoComplete="email"
                />
                <ErrorText>{errors.email}</ErrorText>
                <TextField
                    value={form.password}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <ErrorText>{errors.password}</ErrorText>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={onClickSignUp}
                >
                    cadastrar
                </Button>
            </form>
        </Container>
     );
}
 
export default SignUpPage;
