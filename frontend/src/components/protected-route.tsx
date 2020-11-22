import React from 'react';
import { Route, RouteProps } from 'react-router';
import { Link } from 'react-router-dom';
import { PAGES } from '../const';
import { sessionService } from '../services/session.service';
import { useRxValue } from '../hooks/useRxValue';

export const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isLoggedIn = useRxValue(sessionService.isLoggedIn$, void 0);

  if (isLoggedIn === void 0) {
    return null;
  }

  return <Route {...rest}>
    {isLoggedIn
     ? children
     : <div>
        To see this page you must be <Link to={PAGES.SIGN_IN}>logged in</Link>
     </div>}
  </Route>;
}
