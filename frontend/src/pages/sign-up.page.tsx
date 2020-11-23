import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { PAGES } from '../const';
import { sessionService } from '../services/session.service';
import { useForm } from '../hooks/useForm';

export const SignUpPage: React.FC = () => {
  const history = useHistory();
  const form = useForm<{ email: string, password: string }>({ email: '', password: '' });
  const [error, setError] = useState<string | void>(void 0);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    setError(void 0);
    e.preventDefault();
    const { email, password } = form.getData();
    sessionService.signUp(email, password).then(() => {
      console.log('Success');
      history.push(PAGES.SIGN_IN);
    }).catch(err => {
      console.error(err);
      setError(err);
    })
  }

  return <div>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
      <div><label>Email: <input {...form.register('email')} type="text" /></label></div>
      <div><label>Password: <input {...form.register('password')} type="text" /></label></div>
      <button type="submit">Go</button>
      {error && <h2 style={{color: 'red'}}>{error}</h2>}
    </form>
  </div>;
}
