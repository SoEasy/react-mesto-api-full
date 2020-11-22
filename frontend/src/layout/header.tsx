import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { useRxValue } from '../hooks/useRxValue';
import { sessionService } from '../services/session.service';
import { PAGES } from '../const';

export const Header: React.FC = () => {
  const isLoggedIn = useRxValue(sessionService.isLoggedIn$, void 0);

  if (isLoggedIn === void 0) {
    return null;
  }

  return <div className="header">
    <div className="header__logo"><Link to={PAGES.HOME}>ToDoApp</Link></div>
    <div className="header__auth">
      <Switch>
        <Route path={PAGES.HOME} exact>
          {isLoggedIn ? <Link to="/logout">Logout</Link> : <Link to={PAGES.SIGN_IN}>Sign In</Link>}
        </Route>
        <Route path={PAGES.SIGN_IN}>
          <Link to={PAGES.SIGN_UP}>Sign Up</Link>
        </Route>
        <Route path={PAGES.SIGN_UP}>
          <Link to={PAGES.SIGN_IN}>Sign In</Link>
        </Route>
        <Route path="*"></Route>
      </Switch>
    </div>
  </div>;
}
