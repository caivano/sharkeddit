import { createMuiTheme } from '@material-ui/core/styles'
import { primaryColor, secondaryColor } from './colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: 'white'
    },
    secondary: {
      main: secondaryColor,
      contrastText: 'white'
    }
  }
})

export default theme
