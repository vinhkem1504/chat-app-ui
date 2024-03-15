import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
interface IScreenProps {
  children: React.ReactNode;
  padding?: boolean;
  backgroundColorContent?: string;
  backButton?: boolean;
  header?: boolean;
}

export const Layout: React.FC<IScreenProps> = React.memo(
  ({
    children,
    padding = false,
    backgroundColorContent = 'white',
    backButton,
  }) => {
    const navigation = useNavigation();
    return (
      <View style={[styles.outer, {backgroundColor: backgroundColorContent}]}>
        <SafeAreaView style={!padding && [styles.inner]}>
          {backButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon source={'arrow-left'} size={18} />
              <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
          )}
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
  },
  inner: {
    flex: 1,
  },
  backWrap: {
    backgroundColor: 'red',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 6,
    left: 10,
    marginTop: 10,
    width: 'auto',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  // childrenWrap: {
  //   height: heightDimensions - 50,
  // },
});
