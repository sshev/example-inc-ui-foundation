import { FC } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../../api/types';
import { useUpdateUserMutation, useCreateUserMutation } from '../../api/users';
import { GenericError } from '../../components';

interface UserModalProps {
  user?: User;
  open: boolean;
  onClose: () => void;
}

type UserForm = Pick<User, 'name' | 'username' | 'email' | 'phone' | 'website'>;

const DEFAULT_VALUES: UserForm = {
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
};

export const UserModal: FC<UserModalProps> = ({ open, onClose, user }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    mode: 'onChange',
    values: user
      ? {
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          website: user.website,
        }
      : DEFAULT_VALUES,
  });

  const createUser = useCreateUserMutation();
  const updateUser = useUpdateUserMutation();
  const userMutation = user ? updateUser : createUser;

  const save: SubmitHandler<UserForm> = async (data) => {
    const payload: User = {
      ...user!,
      ...data,
    };

    try {
      await userMutation.mutateAsync(payload);
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const close = () => {
    if (userMutation.isPending) return;
    userMutation.reset();
    reset();
    onClose();
  };

  return (
    <Dialog onClose={close} open={open} maxWidth="sm">
      <form onSubmit={handleSubmit(save)}>
        <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent dividers>
          {userMutation.error && (
            <Box sx={{ mb: 2 }}>
              <GenericError message={userMutation.error.message} />
            </Box>
          )}
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            error={!!errors.name}
            helperText={errors.name && 'This field is required'}
            slotProps={{ htmlInput: register('name', { required: true }) }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Username"
            variant="standard"
            fullWidth
            error={!!errors.username}
            helperText={errors.username && 'This field is required'}
            slotProps={{ htmlInput: register('username', { required: true }) }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            error={!!errors.email}
            helperText={errors.email && 'This field is required'}
            slotProps={{ htmlInput: register('email', { required: true }) }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            variant="standard"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone && 'This field is required'}
            slotProps={{ htmlInput: register('phone', { required: true }) }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Website"
            variant="standard"
            fullWidth
            error={!!errors.website}
            helperText={errors.website && 'This field is required'}
            slotProps={{ htmlInput: register('website', { required: true }) }}
          />
        </DialogContent>
        <DialogActions sx={{ paddingY: 2, paddingX: 3 }}>
          <Button variant="outlined" onClick={close} disabled={userMutation.isPending}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" loading={userMutation.isPending} loadingPosition="start">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
