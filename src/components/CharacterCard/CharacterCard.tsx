import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CharacterCardSkeleton } from './CharacterCardSkeleton';
import { CharacterCardStyles } from './styles';
import { Box } from '@mui/material';

export interface CharacterCardData {
  image: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  location: string;
  firstEpisode: string;
}

export interface CharacterCardProps {
  character: CharacterCardData | null;
}

const statusColors: Record<string, string> = {
  Alive: 'rgb(85, 204, 68)',
  Dead: 'rgb(214, 61, 46)',
  unknown: 'rgb(158, 158, 158)',
};

export const CharacterCard = ({
  character,
}: CharacterCardProps): JSX.Element => {
  if (character != null) {
    const { image, name, status, species, firstEpisode, gender, location } =
      character;
    const dotColor = statusColors[`${status}`];

    return (
      <Card sx={CharacterCardStyles.card}>
        <Box
          component="img"
          src={image}
          alt="Character"
          sx={CharacterCardStyles.charImg}
        />
        <CardContent sx={CharacterCardStyles.cardContent}>
          <Typography variant="h4" sx={CharacterCardStyles.name}>
            {name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <Box
              sx={CharacterCardStyles.statusDot}
              style={{ backgroundColor: dotColor }}
            />
            {`${status} | ${species} | ${gender}`}
          </Typography>
          <Typography variant="body1" sx={CharacterCardStyles.secText}>
            Last known location:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {location}
          </Typography>
          <Typography variant="body1" sx={CharacterCardStyles.secText}>
            First seen in:
          </Typography>
          <Typography variant="body1">{firstEpisode}</Typography>
        </CardContent>
      </Card>
    );
  } else {
    return <CharacterCardSkeleton />;
  }
};
