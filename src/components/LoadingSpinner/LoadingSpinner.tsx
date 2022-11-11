import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingSpinner = (): JSX.Element => {
  return (
    <Box mt={10}>
      <CircularProgress size={80} sx={{ color: 'rgb(197, 197, 197)' }} />
      <Typography variant="h5" sx={{ color: 'rgb(197, 197, 197)', mt: 1 }}>
        Loading
      </Typography>
    </Box>
  );
};
