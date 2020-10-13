import { Typography } from '@material-ui/core'
import styled from 'styled-components'

export const ButtonWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
`

export const NavBarTitle = styled(Typography)`

`

export const LogoImg = styled.img`
    width: 13vw;

    @media(min-width: 750px){
        width: 8vw;
    }
    @media(min-width: 1024px) {
        width: 4vw;
    }
`