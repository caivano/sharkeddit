import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import styled from 'styled-components'
import Router from './routes/Router';
import NavBar from './components/NavBar';
import theme from './constants/theme'

const InnerScreenContainer = styled.div`
  padding-top: 64px;
`

function App() {
  const token = localStorage.getItem('token')
  const [buttonName, setButtonName] = useState(token ? 'logout' : 'login')

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar buttonName={buttonName} setButtonName={setButtonName}/>
        <InnerScreenContainer>
          <Router setButtonName={setButtonName}/>
        </InnerScreenContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
