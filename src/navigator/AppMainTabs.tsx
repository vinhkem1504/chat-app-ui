/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/HomeScreen';
import {Icon} from 'react-native-paper';
import {DiaryScreen} from '../screens/DiaryScreen';
import {UserInformationScreen} from '../screens/UserInformationScreen';
import {ContactTabs} from './ContactTabs';

const Tab = createBottomTabNavigator();

export function AppMainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="ChannelList"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              source="message-text-outline"
              size={22}
              color={focused ? '#2c8ff2' : '#525c66'}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
          },
          tabBarLabel: 'Message',
        }}
      />

      <Tab.Screen
        name="Contact"
        component={ContactTabs}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              source="contacts-outline"
              size={20}
              color={focused ? '#2c8ff2' : '#525c66'}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
          },
          tabBarLabel: 'Contact',
        }}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              source="clock-outline"
              size={24}
              color={focused ? '#2c8ff2' : '#525c66'}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
          },
          tabBarLabel: 'Diary',
        }}
      />
      <Tab.Screen
        name="UserInformation"
        component={UserInformationScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              source="account-circle-outline"
              size={24}
              color={focused ? '#2c8ff2' : '#525c66'}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
          },
          tabBarLabel: 'User',
        }}
      />
    </Tab.Navigator>
  );
}
