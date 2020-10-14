import React from 'react';
import { Button, CircularProgress, TextField } from '@material-ui/core';


const FeedForm = (props) => {
    const { isLoading, form, handleInputChange } = props
   
    const handleClick = (event) => {
        event.preventDefault()
        props.onClickCreate(checkForm())
    }

    const checkForm = () => {
        const element = document.getElementById('feed-form')
        const isValid = element.checkValidity()
        element.reportValidity()
        return isValid
    }

    return ( 
        <form id='feed-form'>
                    <TextField
                        value={form.title}
                        onChange={handleInputChange}
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Título do post"
                        name="title"
                    />
                    <TextField
                        value={form.text}
                        onChange={handleInputChange}
                        margin="normal"
                        required
                        fullWidth
                        id="text"
                        label="Escreva aqui seu post"
                        name="text"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => handleClick()}
                    >
                    {isLoading ? <CircularProgress color={'inherit'} size={24}/> : <>postar</>}
                </Button>
            </form>
     );
}
 
export default FeedForm;
