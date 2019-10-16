import * as React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import makeInspectable from 'mobx-devtools-mst';
import { RootStoreType, getDefaultStore } from '../stores';

// Types
import { User } from '../types/Auth';

export const storeContext = React.createContext<RootStoreType | null>(null);

export const StoreProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const store = useLocalStore(getDefaultStore);
  React.useEffect(() => {
    store.auth.isLoggedIn().then(() => {
      store.messages.subscribe((store.auth.user as User).uid);
      setLoading(false);
    }, () => {
      setLoading(false);
    });
  }, []);


  makeInspectable(store);
  return (
    <storeContext.Provider value={store}>
      {
        loading ? <div>Loading</div> : <React.Fragment>{children}</React.Fragment>
      }
    </storeContext.Provider>
  )
};

export default StoreProvider;
