import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

interface IScreenProps {
  children: React.ReactNode;
  padding?: boolean;
  backgroundColorContent?: string;
}

export const Layout: React.FC<IScreenProps> = React.memo(
  ({children, padding = false, backgroundColorContent = 'white'}) => {
    return (
      <View style={[styles.outer, {backgroundColor: backgroundColorContent}]}>
        <SafeAreaView style={!padding && [styles.inner]}>
          {children}
        </SafeAreaView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  inner: {
    paddingTop: 4,
    paddingHorizontal: 4,
    flex: 1,
  },
});
