/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppContextProvider} from './context';
import {AppNavigator} from './navigator/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {requestNotifications} from 'react-native-permissions';

function App(): React.JSX.Element {
  // useEffect(async () => {
  //   await requestNotifications(['alert', 'sound']);
  // }, []);
  return (
    <AppContextProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AppContextProvider>
  );
}

export default App;
