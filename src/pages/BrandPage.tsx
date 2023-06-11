import { FC, useEffect, useMemo } from 'react';
import BasicPageWrapper from './wrappers/BasicPageWrapper';
import useUserState from '../store/hooks/selectors/useUserState';
import useBrandState from '../store/hooks/selectors/useBrandState';
import UserBrandEnvoy from '../types/entities/identity/user-brand-envoy.entity';
import useActions from '../store/hooks/useActions';
import { BrandRoute } from '../types/routes.enum';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser } from '../store/actions/user.action';
import BrandHeader from '../components/headers/BrandHeader';

const BrandPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isUserStateLoading, currentUser } = useUserState();
  const { isBrandStateLoading, newFetchedBrand: brand } = useBrandState();
  const { getBrand } = useActions();

  const isCurrentUserBrandEnvoyOfThisBrand = useMemo(
    () => id === (currentUser as UserBrandEnvoy)?.brand?.id,
    [id]
  );

  const handleVisitWebsite = () => {
    if (!brand) return;
    window.open(brand.websiteUrl, '_blank');
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (isCurrentUserBrandEnvoyOfThisBrand) {
      navigate(BrandRoute.BRAND_CURRENT_USER);
    } else if (id) {
      getBrand(id);
    }
  }, [isCurrentUserBrandEnvoyOfThisBrand]);

  if (isUserStateLoading || isBrandStateLoading) return <div>LOADING...</div>;

  if (!brand) return <div>NO BRAND</div>;

  return (
    <BasicPageWrapper>
      <BrandHeader brand={brand} onVisitWebsite={handleVisitWebsite} />
    </BasicPageWrapper>
  );
};

export default BrandPage;
