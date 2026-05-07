import { FC, ReactElement } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '../../services/store';

import { selectIsAuthChecked, selectUser } from '../../services/selectors';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;

  component: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  component
}) => {
  const user = useSelector(selectUser);

  const isAuthChecked = useSelector(selectIsAuthChecked);

  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return component;
};
