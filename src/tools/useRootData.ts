import { storeContext } from './StoreProvider';
import { RootStoreType } from '../stores';
import { useStoreData } from './useStoreData';

export const useRootData = <Selection>(dataSelector: (store: RootStoreType) => Selection) =>
  useStoreData(storeContext, contextData => contextData!, dataSelector);
