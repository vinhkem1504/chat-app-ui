import React from 'react';
import {ChatScreen} from '../screens/ChatScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const ChatNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChannelDetail" component={ChatScreen} />
    </Stack.Navigator>
  );
};
