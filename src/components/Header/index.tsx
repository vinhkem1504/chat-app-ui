import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-paper';

export const HeaderBar = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const ref = useRef<any>();

  const handleSearch = (data: any) => {
    if (data) console.log({serach: data});
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapLeft}>
        <TouchableOpacity
          onPress={() => {
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
          }}
          style={styles.iconSearch}>
          <Icon
            source={!isFocus ? 'magnify' : 'chevron-left'}
            size={32}
            color="#ffffff"
          />
        </TouchableOpacity>
        <TextInput
          ref={ref}
          placeholder="Search"
          style={[styles.textInput, isFocus && {backgroundColor: '#ffffff'}]}
          onFocus={() => setIsFocus(true)}
          placeholderTextColor={isFocus ? '#ccc' : 'white'}
          onChangeText={text => {
            setSearchText(text);
            handleSearch(text);
          }}
          value={searchText}
        />
      </View>
      <View style={styles.wrapRight}>
        <TouchableOpacity onPress={() => {}} style={styles.iconSearch}>
          <Icon source={'chevron-left'} size={32} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.iconSearch}>
          <Icon source={'magnify'} size={32} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#2c8ff2',
    height: 50,
    paddingHorizontal: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 36,
    borderColor: '#2c8ff2',
    fontSize: 18,
    borderRadius: 14,
    flex: 6,
  },
  wrapRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
