import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
const Theme = createTheme({
   palette:{
     mode:"light",
     common:{
       black:"#000",
       white:"#fff"
     },
    primary:{
      main: purple[500],
    },
    // secondary:{},
   }
  });
// https://mui.com/material-ui/customization/default-theme/
export default Theme;