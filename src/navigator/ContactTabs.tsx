import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ContactScreen} from '../screens/ContactScreen';
import {GroupScreen} from '../screens/GroupScreen';
import {Layout} from '../components/Layout';
import {HeaderBar} from '../components/Header';

const Tab = createMaterialTopTabNavigator();

export const ContactTabs = () => {
  return (
    <Layout>
      <HeaderBar contact />
      <Tab.Navigator>
        <Tab.Screen name="Friends" component={ContactScreen} />
        <Tab.Screen name="Group" component={GroupScreen} />
      </Tab.Navigator>
    </Layout>
  );
};
