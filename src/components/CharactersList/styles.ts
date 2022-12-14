import { SxProps } from '@mui/material';

export const CharacterListStyles: Record<string, SxProps> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
  },
  header: {
    color: 'rgb(197, 197, 197)',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 'clamp(3rem, 7vw, 6rem)',
  },
};
