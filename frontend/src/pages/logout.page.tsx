import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { sessionService } from '../services/session.service';
import { PAGES } from '../const';

export const LogoutPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    sessionService.logout().then(() => {
      setLoading(false);
    })
  }, [])
  return loading ? <div>loading</div> : <Redirect to={PAGES.HOME}/>;
}
