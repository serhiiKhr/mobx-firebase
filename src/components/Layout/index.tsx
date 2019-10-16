import * as React from 'react';
import { withRouter } from 'react-router';

// Components
import Header from './Header';
import Footer from './Footer';

// Types
import { ILayoutView, ILayout } from '../../types/Layout';

// Styles
import './styles.css'
import {useRootData} from "../../tools/useRootData";

const LayoutView: React.FC<ILayoutView> = ({ children, history, location, logout }: ILayoutView) => {
  return (
    <React.Fragment>
      <Header history={history} location={location} logout={logout} />
      <main className="app-main">
        { children }
      </main>
      <Footer />
    </React.Fragment>
  )
};

const Layout: React.FC<ILayout> = (props: ILayout) => {
  const { logout } = useRootData(store => ({
    logout: store.auth.logout,
  }));

  return <LayoutView logout={logout} {...props} />
};

export default withRouter(Layout);
