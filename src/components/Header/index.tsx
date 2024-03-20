import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
export interface IHeaderProps {
  home?: boolean;
  contact?: boolean;
  diary?: boolean;
  user?: boolean;
  chat?: boolean;
  title?: string;
}

export const HeaderBar: React.FC<IHeaderProps> = observer(
  ({home, contact, diary, user, chat, title}) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const navigation = useNavigation<any>();
    const ref = useRef<any>();

    const handleSearch = (data: any) => {
      if (data) console.log({serach: data});
    };

    const handleGoBack = () => {
      navigation.goBack();
    };

    const handleCancleSearch = () => {
      if (isFocus) {
        setSearchText('');
        setIsFocus(false);
        setTimeout(() => {
          ref.current.blur();
        }, 0);
      } else {
        setIsFocus(true);
        ref.current?.focus();
      }
    };

    const handleAudioCall = async () => {
      navigation.navigate('CallPanel');
    };

    return (
      <View style={styles.wrapper}>
        <View style={[styles.wrapLeft, isFocus && styles.focusWrap]}>
          <TouchableOpacity
            onPress={
              home || contact || diary || user
                ? handleCancleSearch
                : handleGoBack
            }
            style={styles.iconSearch}>
            {home || contact || diary || user ? (
              <Icon
                source={!isFocus ? 'magnify' : 'chevron-left'}
                size={32}
                color="#ffffff"
              />
            ) : (
              <Icon source={'chevron-left'} size={32} color="#ffffff" />
            )}
          </TouchableOpacity>
          {title ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            <TextInput
              ref={ref}
              placeholder="Search"
              style={[
                styles.textInput,
                isFocus && {backgroundColor: '#ffffff'},
              ]}
              onFocus={() => setIsFocus(true)}
              placeholderTextColor={isFocus ? '#ccc' : 'white'}
              onChangeText={text => {
                setSearchText(text);
                handleSearch(text);
              }}
              value={searchText}
            />
          )}
        </View>
        <View style={styles.wrapRight}>
          {chat && (
            <>
              <TouchableOpacity
                onPress={() => {
                  handleAudioCall();
                }}
                style={styles.iconSearch}>
                <Icon source={'phone'} size={26} color="#ffffff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CallPanel');
                }}
                style={styles.iconSearch}>
                <Icon source={'video'} size={32} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.iconSearch}>
                <Icon source={'menu'} size={32} color="#ffffff" />
              </TouchableOpacity>
            </>
          )}
          {contact && (
            <TouchableOpacity
              onPress={() => {}}
              style={styles.iconAddNewFriend}>
              <Icon source={'account-plus'} size={32} color="#ffffff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#2c8ff2',
    height: 50,
    paddingHorizontal: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  focusWrap: {
    flex: 14,
  },
  wrapLeft: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSearch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#2c8ff2',
    paddingHorizontal: 12,
    paddingVertical: 0,
    height: 36,
    borderColor: '#2c8ff2',
    fontSize: 16,
    borderRadius: 14,
    flex: 6,
  },
  wrapRight: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    flex: 6,
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
  },
  iconAddNewFriend: {
    paddingRight: 12,
  },
});
