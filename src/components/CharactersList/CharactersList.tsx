import { CharacterCard } from '../CharacterCard';
import { DynamicList } from '../DynamicList';
import { CharacterCardProps } from '../CharacterCard/CharacterCard';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { LoadingSpinner } from '../LoadingSpinner';
import { CharacterListStyles as styles } from './styles';

interface CharactersListProps {
  data?: CharacterCardProps[] | null;
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (
    startIndex: number,
    stopIndex: number,
  ) => Promise<void> | void;
}

export const CharactersList = ({
  data,
  isItemLoaded,
  loadMoreItems,
}: CharactersListProps): JSX.Element => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box sx={styles.container}>
      <Typography variant="h1" sx={styles.header}>
        Rick & Morty Characters
      </Typography>
      <DynamicList
        ItemComponent={CharacterCard}
        data={data}
        SpinnerComponent={LoadingSpinner}
        listConfig={{
          itemHeight: isSm ? 240 : 470,
          windowHeight: 860,
          numItems: data?.length ?? 0,
          windowWidth: isSm ? 600 : 300,
          loadMoreItems,
          isItemLoaded,
        }}
      />
    </Box>
  );
};
