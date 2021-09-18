import { Fragment, useState } from 'react';
import { IconButton, Menu as MuiMenu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';

const Menu = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Fragment>
      <IconButton color="inherit" onClick={handleOpen}>
        <MenuIcon />
      </IconButton>

      <MuiMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        getContentAnchorEl={null}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            router.push('/');
          }}
        >
          Home
        </MenuItem>
        
        <MenuItem
          onClick={() => {
            handleClose();
            router.push('/reports');
          }}
        >
          Relatórios
        </MenuItem>
      </MuiMenu>
    </Fragment>
  );
};

export default Menu;
