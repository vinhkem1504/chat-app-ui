import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppContextProvider} from './context';
import {AppNavigator} from './navigator/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
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
