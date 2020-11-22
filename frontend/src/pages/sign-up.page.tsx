import React from 'react';
import { useForm } from '../hooks/useForm';

export const SignUpPage: React.FC = () => {
  const form = useForm<{ email: string, password: string }>({ email: '', password: '' });
  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(form.getData());
  }

  return <div>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
      <div><label>Email: <input {...form.register('email')} type="text" /></label></div>
      <div><label>Password: <input {...form.register('password')} type="text" /></label></div>
      <button type="submit">Go</button>
    </form>
  </div>;
}
