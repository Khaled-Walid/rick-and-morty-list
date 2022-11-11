import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Skeleton } from '@mui/material';
import { CharacterCardStyles as styles } from './styles';

export const CharacterCardSkeleton = (): JSX.Element => {
  return (
    <Card sx={styles.card}>
      <Skeleton variant="rectangular" sx={styles.charImg} />
      <CardContent sx={styles.cardContent}>
        <Typography variant="h4" sx={styles.name} style={{ display: 'block' }}>
          <Skeleton />
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <Skeleton />
        </Typography>
        <Typography variant="body1" sx={styles.secText}>
          <Skeleton />
        </Typography>
        <Typography variant="body1" gutterBottom>
          <Skeleton />
        </Typography>
        <Typography variant="body1" sx={styles.secText}>
          <Skeleton />
        </Typography>
        <Typography variant="body1">
          <Skeleton />
        </Typography>
      </CardContent>
    </Card>
  );
};
