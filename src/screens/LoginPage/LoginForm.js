import React from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../../hooks/useForm';
import { login } from '../../services/users';

const useStyles = makeStyles((theme) => ({
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
    },
  }));

const LoginForm = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [form, handleInputChange] = useForm({ 
        username: '', 
        email: '', 
        password: ''
    })

    const onClickLogin = (event) => {
        event.preventDefault()
        const element = document.getElementById('login-form')
        const isValid = element.checkValidity()
        element.reportValidity()
        if(isValid){
            login(form, history, props.setButtonName)
        }
    }

    return ( 
            <form className={classes.form} id={'login-form'}>
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
                autoFocus
                />
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
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onClickLogin}
            >
                entrar
            </Button>
            </form>
     );
}
 
export default LoginForm;