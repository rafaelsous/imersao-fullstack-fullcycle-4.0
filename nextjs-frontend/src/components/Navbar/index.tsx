import { FunctionComponent, useContext } from 'react';
import {
  AppBar,
  Box,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import { useKeycloak } from '@react-keycloak/ssr';

import Menu from './Menu';
import UserAccountMenu from './UserAccountMenu';
import TenantContext from '../../contexts/TenantProvider';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

const Navbar: FunctionComponent = () => {
  const { initialized, keycloak } = useKeycloak();
  const tenant = useContext(TenantContext);
  const classes = useStyles();

  // TODO: Verificar a razão pela qual o tenant está vindo com undefined

  return initialized && keycloak?.authenticated && tenant ? (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Menu />

          <StoreIcon />

          <Typography component="h1" variant="h6" className={classes.title}>
            Fincycle - {tenant.name}
          </Typography>

          <Typography>Saldo R$ {tenant.balance}</Typography>
          
          <UserAccountMenu />
        </Toolbar>
      </AppBar>
    </div>
  ) : null;
};

export default Navbar;
