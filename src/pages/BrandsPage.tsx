import { FC, Suspense, useEffect, useState } from 'react';
import BasicPageWrapper from './wrappers/BasicPageWrapper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import { SelectChangeEvent } from '@mui/material';

import useBrandState from '../store/hooks/selectors/useBrandState';
import useActions from '../store/hooks/useActions';
import BrandCard from '../components/cards/BrandCard';
import useCountryState from '../store/hooks/selectors/useCountryState';
import Flag from 'react-flagkit';
import flagCodes, { FlagCodes } from '../utils/constants/flags.constants';

const BrandsPage: FC = () => {
  const { isBrandStateLoading, brands } = useBrandState();
  const { isCountryStateLoading, countries } = useCountryState();

  const { getBrands, getCountries } = useActions();
  const [chosenCountry, setChosenCountry] = useState<string | undefined>('all');

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setChosenCountry(event.target.value);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const allCountriesChosen = chosenCountry === 'all';

    const params = {
      isSortAscending: true,
      orderBy: 'Name',
      ...(!allCountriesChosen && {
        filterField: 'CountryId',
        filterValue: chosenCountry
      })
    };

    getBrands(params);
  }, [chosenCountry]);

  if (isBrandStateLoading || isCountryStateLoading) return <div>...LOADING</div>;

  return (
    <BasicPageWrapper>
      <Container>
        <h1>Brands Page</h1>
        <Box>
          <Select value={chosenCountry} onChange={handleCountryChange}>
            <MenuItem value={'all'}>All</MenuItem>
            {countries &&
              countries?.map((country) => (
                <MenuItem
                  key={country.id}
                  value={country.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                  <Flag country={flagCodes[country.name as keyof FlagCodes]} />
                  {country.name}
                </MenuItem>
              ))}
          </Select>
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </Box>
        </Suspense>
      </Container>
    </BasicPageWrapper>
  );
};

export default BrandsPage;
