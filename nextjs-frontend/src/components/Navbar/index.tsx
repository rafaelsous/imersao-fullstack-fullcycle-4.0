import { AppBar, Box, makeStyles, Toolbar, Typography } from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';

import Menu from './Menu';
import UserAccountMenu from './UserAccountMenu';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

const Navbar: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Menu />
          
          <Box marginRight={1}>
            <StoreIcon />
          </Box>

          <Typography component="h1" variant="h6" className={classes.title}>
            Fincycle - La Casa de Papel 
          </Typography>

          <Typography>Saldo R$ 0</Typography>
          
          <UserAccountMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
