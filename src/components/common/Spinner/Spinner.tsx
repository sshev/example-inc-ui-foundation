import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface SpinnerProps {
  small?: boolean;
  centered?: boolean;
}

export const Spinner: FC<SpinnerProps> = ({ small, centered }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: centered ? 'center' : 'unset', paddingY: centered ? 10 : 'unset' }}>
      <CircularProgress size={small ? 16 : 48} />
    </Box>
  );
};
