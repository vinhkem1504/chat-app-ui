import React, {useState} from 'react';

export const AppContext = React.createContext({
  channel: null,
  setChannel: channel => {},
  thread: null,
  setThread: thread => {},
  // clientIsReady: null,
  // setClientIsReady: clientIsReady => {},
});

export const AppProvider = ({children}) => {
  const [channel, setChannel] = useState();
  const [thread, setThread] = useState();
  // const [clientIsReady, setClientIsReady] = useState(false);

  return (
    <AppContext.Provider
      value={{
        channel,
        setChannel,
        thread,
        setThread,
        // clientIsReady,
        // setClientIsReady,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
