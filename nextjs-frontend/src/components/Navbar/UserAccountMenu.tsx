import { Fragment, useState } from 'react';
import { Divider, IconButton, Menu as MuiMenu, MenuItem } from '@material-ui/core';
import AccountBox from '@material-ui/icons/AccountBox';
import { useRouter } from 'next/router';
import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';

const UserAccountMenu = () => {
  const {keycloak} = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Fragment>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleOpen}
      >
        <AccountBox />
      </IconButton>

      <MuiMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        getContentAnchorEl={null}
      >
        <MenuItem disabled>{(keycloak?.idTokenParsed as any).given_name}</MenuItem>

        <Divider />

        <MenuItem onClick={() => {
            router.push('/logout');
          }}
        >
          Logout
        </MenuItem>
      </MuiMenu>
    </Fragment>
  );
};

export default UserAccountMenu;
