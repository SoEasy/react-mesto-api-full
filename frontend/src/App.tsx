import React from 'react';
import { Route, Switch } from 'react-router';
import { ProtectedRoute } from './components/protected-route';
import { TodoPage } from './pages/todo.page';
import { HomePage } from './pages/home.page';
import { PAGES } from './const';
import { SignInPage } from './pages/sign-in.page';
import { SignUpPage } from './pages/sign-up.page';
import { Layout } from './layout/layout';
import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={PAGES.HOME} exact>
          <HomePage />
        </Route>
        <Route path={PAGES.SIGN_UP}>
          <SignUpPage />
        </Route>
        <Route path={PAGES.SIGN_IN}>
          <SignInPage />
        </Route>
        <ProtectedRoute path={PAGES.TODO}>
          <TodoPage />
        </ProtectedRoute>
      </Switch>
    </Layout>
  );
}

export default App;
