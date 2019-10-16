import React from 'react';
import AppRoute from './routers/App.route';

// Firebase
import { database, storage } from './firebase';

// Store
import StoreProvider from './tools/StoreProvider';

export interface IAppProps {

}

const App: React.FC<IAppProps> = () => {
  return (
    <StoreProvider>
      <AppRoute />
    </StoreProvider>
  );
};

export default App;
