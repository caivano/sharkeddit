import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { goToFeed, goToLogin } from '../../routes/Coordinator';
import { ButtonWrapper, LogoImg, NavBarTitle } from './styled'
import SharkLogo from '../../assets/img/shark.png'

const NavBar = (props) => {
    const {buttonName, setButtonName} = props
    const history = useHistory()

    const logout = () => {
        localStorage.removeItem('token')
    }

    const navBarAction = () => {
        const token = localStorage.getItem('token')
        if(token){
            logout()
            setButtonName('login')
        }
        goToLogin(history)
    }

    return ( 
        <AppBar>
            <Toolbar>
                <ButtonWrapper>
                    <Button color={"inherit"} onClick={() => goToFeed(history)}>
                        <LogoImg src={SharkLogo}/>
                        <NavBarTitle>LabEddit</NavBarTitle>
                    </Button>
                    <Button color={"inherit"} onClick={navBarAction}>
                        <NavBarTitle>{buttonName}</NavBarTitle>
                    </Button>
                </ButtonWrapper>
            </Toolbar>
        </AppBar>
     );
}
 
export default NavBar;