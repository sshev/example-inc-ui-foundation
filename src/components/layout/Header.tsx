import { FC } from 'react';
import { Link, useLocation } from 'react-router';
import { AppBar, IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Widgets } from '@mui/icons-material';

export const Header: FC = () => {
  const location = useLocation();

  let currentTab: string | boolean = false;
  if (location.pathname.startsWith('/posts')) {
    currentTab = 'posts';
  }
  if (location.pathname.startsWith('/users')) {
    currentTab = 'users';
  }

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
          <Widgets />
        </IconButton>
        <Typography variant="h6" sx={{ mr: 4 }}>
          Example, Inc.
        </Typography>
        <Tabs value={currentTab} indicatorColor="secondary" textColor="inherit">
          <Tab label="Users" value="users" component={Link} to="/users" />
          <Tab label="Posts" value="posts" component={Link} to="/posts" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};
