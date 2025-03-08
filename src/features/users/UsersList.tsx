import { FC, useState } from 'react';
import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useGetUsersListQuery } from '../../api/users';
import { User } from '../../api/types';
import { GenericError, Spinner } from '../../components';
import { UserModal } from './UserModal';

export const UsersList: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const { data: users, error, isLoading } = useGetUsersListQuery();

  const openUserModal = (user?: User) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const closeUserModal = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="20%">Name</TableCell>
              <TableCell width="15%">Username</TableCell>
              <TableCell width="20%">Email</TableCell>
              <TableCell width="20%">Phone</TableCell>
              <TableCell width="15%">Website</TableCell>
              <TableCell width="10%" />
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Spinner centered />
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell colSpan={6}>
                  <GenericError message={error.message} />
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              !error &&
              users?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>
                    <Link href={`mailto:${item.email}`} underline="hover">
                      {item.email}
                    </Link>
                  </TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    <Link href={item.website} underline="hover" target="_blank" rel="noopener noreferrer">
                      {item.website}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="text" startIcon={<Edit />} size="small" onClick={() => openUserModal(item)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, display: 'flex' }}>
        <Button variant="contained" sx={{ ml: 'auto' }} onClick={() => openUserModal()}>
          Add New User
        </Button>
      </Box>
      <UserModal user={selectedUser} open={openModal} onClose={closeUserModal} />
    </Box>
  );
};
