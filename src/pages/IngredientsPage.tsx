import { FC, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import { useTranslation } from 'react-i18next';

import useIngredientState from '../store/hooks/selectors/useIngredient';
import useActions from '../store/hooks/useActions';
import Ingredient from '../types/entities/ingredient.entity';
import BasicPageWrapper from './wrappers/BasicPageWrapper';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryModal from '../components/modal/PrimaryModal';
import CreateIngredientForm from '../components/forms/ingredient/CreateIngredientForm';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  border: '1px solid',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'palette.grey[100]'
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

const IngredientsPage: FC = () => {
  const { t } = useTranslation();
  // const ingredients: Ingredient[] = [];
  const { ingredients } = useIngredientState();
  const { getIngredients } = useActions();

  const [isCreateIngredientModalOpen, setIsCreateIngredientModalOpen] = useState(false);

  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    getIngredients({
      isSearch: true,
      filterField: 'Name',
      filterValue: searchValue
    });
  }, [searchValue]);

  return (
    <BasicPageWrapper>
      <Container sx={{ height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '1rem'
          }}>
          <Typography variant="h3">{t('ingredientsPage.title')}</Typography>
          <Typography variant="body1">{t('ingredientsPage.description')}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: '1rem'
          }}>
          <PrimaryButton
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setIsCreateIngredientModalOpen(true);
            }}>
            {t('ingredientsPage.buttons.addIngredient')}
          </PrimaryButton>
        </Box>
        <Divider sx={{ mt: '1rem' }} />
        <Container sx={{ mt: '1rem' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t('ingredientsPage.searchPlaceholder') as string}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              value={searchValue}
            />
          </Search>
        </Container>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: '.5rem', // Added gap between elements
            mt: '1rem'
          }}>
          {ingredients &&
            ingredients.map((ingredient) => (
              <IngredientElement ingredient={ingredient} key={ingredient.id} />
            ))}
        </Container>
        <PrimaryModal
          title={t('ingredientsPage.modals.addIngredient.title') as string}
          open={isCreateIngredientModalOpen}
          onClose={() => setIsCreateIngredientModalOpen(false)}>
          <CreateIngredientForm />
        </PrimaryModal>
      </Container>
    </BasicPageWrapper>
  );
};

const IngredientElement: FC<{ ingredient: Ingredient }> = ({ ingredient }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        backgroundColor: 'primary.main',
        width: 'fit-content',
        blockSize: 'fit-content',
        borderRadius: '50px',
        p: '.7rem',
        color: 'white',
        m: 0,

        '&:hover': {
          backgroundColor: 'palette.grey[100]',
          color: 'secondary.main',
          borderRadius: '25px'
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="body1" key={ingredient.id}>
          {ingredient.name}
        </Typography>
        <ClearIcon />
      </Box>

      {isHovered && (
        <>
          <Divider sx={{ mt: '1rem' }} />
          <List>
            {ingredient.functions.map((func) => (
              <ListItem key={func}>{func}</ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
};

export default IngredientsPage;
