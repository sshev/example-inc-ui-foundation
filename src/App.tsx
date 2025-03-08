import { FC } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router';
import { Header } from './components';
import { UsersList } from './features/users/UsersList';
import { PostsList } from './features/posts/PostsList';

export const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Routes>
          <Route path="users" element={<UsersList />} />
          <Route path="posts" element={<PostsList />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </Container>
    </>
  );
};
