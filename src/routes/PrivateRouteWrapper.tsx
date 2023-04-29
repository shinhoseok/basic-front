import { useEffect } from 'react';
import { matchPath, Route, RouteProps } from 'react-router-dom';

export const PrivateRouteWrapper = (props: RouteProps) => {

  return <Route {...props} />;
};
