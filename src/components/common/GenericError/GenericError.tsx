import { FC } from 'react';
import { Alert } from '@mui/material';

interface GenericErrorProps {
  message?: string;
}

export const GenericError: FC<GenericErrorProps> = ({ message }) => {
  return <Alert severity="error">{message || 'Something went wrong, please try again.'}.</Alert>;
};
