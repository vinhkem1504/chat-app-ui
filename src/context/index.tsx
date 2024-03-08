import {IRootStore, RootStore} from '../store/RootStore';
import {useLocalObservable} from 'mobx-react-lite';
import React, {useContext} from 'react';
import {Maybe} from '../utils/type';

interface IAppContextProps {
  children: React.ReactNode;
}

export const MobxStoreContext = React.createContext<Maybe<IRootStore>>(null);

export const AppContextProvider: React.FC<IAppContextProps> = ({children}) => {
  const store = useLocalObservable(() => new RootStore());

  return (
    <MobxStoreContext.Provider value={store}>
      {children}
    </MobxStoreContext.Provider>
  );
};

export const useStore = (): IRootStore => {
  const store = useContext(MobxStoreContext);
  if (!store) {
    throw new Error('Hook must be call in StoreProvider');
  }
  return store;
};

export const useAuthStore = () => {
  const store = useStore();
  return store.authStore;
};

export const useUserStore = () => {
  const store = useStore();
  return store.userStore;
};

export const useChannelStore = () => {
  const store = useStore();
  return store.channelStore;
};
