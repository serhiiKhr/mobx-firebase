import * as React from 'react';
import { withRouter } from 'react-router';

// Components
import Header from './Header';
import Footer from './Footer';

// Types
import { ILayoutView, ILayout } from '../../types/Layout';

// Stores
import { useRootData } from '../../tools/useRootData';

// Styles
import './styles.css';

const LayoutView: React.FC<ILayoutView> = ({ children, history, location, user, logout, clearProfileInfo }: ILayoutView) => (
    <React.Fragment>
        <Header history={history} location={location} isLoggedIn={!!user && !!user.uid} logout={logout} clearProfileInfo={clearProfileInfo} />
        <main className="app-main">
            { children }
        </main>
        <Footer />
    </React.Fragment>
);

const Layout: React.FC<ILayout> = (props: ILayout) => {
    const { user, logout, clearProfileInfo } = useRootData(store => ({
        user: store.profile.user,
        logout: store.auth.logout,
        clearProfileInfo: store.profile.clearProfileInfo,
    }));

    return <LayoutView user={user} logout={logout} clearProfileInfo={clearProfileInfo} {...props} />
};

export default withRouter(Layout);
