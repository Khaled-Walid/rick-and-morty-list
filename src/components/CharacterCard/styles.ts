import { SxProps } from '@mui/material';

export const CharacterCardStyles: Record<string, SxProps> = {
  card: {
    backgroundColor: 'rgb(60, 62, 68)',
    color: '#fff',
    width: { xs: '100%', sm: '580px' },
    display: 'flex',
    height: { xs: '480px', sm: '220px' },
    overflow: 'hidden',
    borderRadius: '0.5rem',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: 'center',
  },
  charImg: {
    width: { xs: '280px', sm: '220px' },
    aspectRatio: '1/1',
    height: '100%',
  },
  cardContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '1rem',
    '&:last-child': {
      paddingBottom: '1rem',
    },
  },
  name: {
    fontWeight: '900',
    fontSize: '1.5rem',
    marginBottom: '-0.25rem',
    display: '-webkit-box',
    webkitLineClamp: '2',
    webkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  secText: {
    color: 'rgb(158, 158, 158)',
    lineHeight: '1rem',
  },
  statusDot: {
    display: 'inline-block',
    height: '0.5rem',
    width: '0.5rem',
    marginRight: '0.375rem',
    borderRadius: '50%',
  },
};
