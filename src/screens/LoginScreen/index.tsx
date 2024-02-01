import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Input} from '../../components/Input';
import {Button, Text, TextInput} from 'react-native-paper';
import {userLogin} from '../../APIs/auth.api';

export const LoginScreen = () => {
  const [username, setUsername] = useState<string>('Vinh');
  const [password, setPassword] = useState<string>('123456');
  const [isShownPassword, setShowPassword] = useState<boolean>(false);

  const onChangeUsername = (text: string) => {
    setUsername(text);
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
  };

  const onSubmit = async () => {
    const data = {
      username: username,
      password: password,
      firstName: 'Test',
      lastName: 'Nguyen',
      email: 'test@gmail.com',
      gender: 0,
      birthDay: new Date(),
    };
    console.log('data', data);
    try {
      userLogin(data);
      // userRegister(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onEyeChange = (isShow: boolean) => {
    setShowPassword(isShow);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.logo}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subTitle}>Login in to your account</Text>
      </View>
      <View style={styles.form}>
        <Input label="Username" value={username} onChange={onChangeUsername} />
        <Input
          value={password}
          onChange={onChangePassword}
          label="Password"
          isPassword={!isShownPassword}
          rightIcon={
            isShownPassword ? (
              <TextInput.Icon
                icon={'eye-off'}
                onPress={() => {
                  onEyeChange(!isShownPassword);
                }}
              />
            ) : (
              <TextInput.Icon
                icon={'eye'}
                onPress={() => {
                  onEyeChange(!isShownPassword);
                }}
              />
            )
          }
        />
        <Button mode="contained" onPress={onSubmit}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 16,
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
  },
  form: {
    flex: 2,
    rowGap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
  },
  subTitle: {
    fontWeight: '400',
  },
});
