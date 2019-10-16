import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { get } from 'lodash';


// Pages
import AuthPage          from '../containers/Auth';
import HomePage          from '../containers/Home';
import MessagesPage      from '../containers/Messages';
import NotificationsPage from '../containers/Notifications';
import ProfilePage       from '../containers/Profile';
import NotFound          from '../containers/NotFound';

// Components
import Layout from '../components/Layout';

// Routes
import PublicRoute  from './Public.route';
import PrivateRoute from './Private.route';

// Store
import {useRootData} from "../tools/useRootData";

// History


const AppRouterView: React.FC<any> = ({ uid }) => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
            <PublicRoute  path="/auth/:type" exact component={AuthPage} />
            <Route        path="/auth">
              <Redirect   to="/auth/sign-in" />
            </Route>
            <PrivateRoute uid={uid} path="/" exact        component={HomePage} />
            <PrivateRoute uid={uid} path="/messages"      component={MessagesPage} />
            <PrivateRoute uid={uid} path="/profile"       component={ProfilePage} />
            <PrivateRoute uid={uid} path="/notifications" component={NotificationsPage} />
            <Route        component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

const AppRouter: React.FC = (props) => {
  const { uid } = useRootData(store => ({
    uid: get(store, 'auth.user.uid', null)
  }));

  return <AppRouterView uid={uid} />
};

export default AppRouter;
