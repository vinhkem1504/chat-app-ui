import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Input} from '../../components/Input';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';
import {Layout} from '../../components/Layout';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuthStore} from '../../context';

export const LoginScreen = () => {
  const authStore = useAuthStore();
  const schema = Yup.object().shape({
    email: Yup.string().email().required().default('nguyenving1504@gmail.com'),
    password: Yup.string().min(6).required().default('123456'),
  });

  const {handleSubmit, control} = useForm({
    resolver: yupResolver(schema),
  });
  const [checked, setChecked] = useState<boolean>(false);
  const [isShownPassword, setShowPassword] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const onSubmit = (data: any) => {
    try {
      authStore.login(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onEyeChange = (isShow: boolean) => {
    setShowPassword(isShow);
  };

  return (
    <Layout>
      <View style={styles.wrapper}>
        <View style={styles.logo}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subTitle}>Login in to your account</Text>
        </View>
        <View style={styles.form}>
          <Input control={control} name="email" label="Email" />
          <Input
            control={control}
            name="password"
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
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            <Text style={styles.button}>Login</Text>
          </Button>
          <TouchableOpacity
            style={styles.saveInfomation}
            onPress={() => {
              setChecked(!checked);
            }}>
            <Checkbox status={checked ? 'checked' : 'unchecked'} />
            <Text>Save infomation</Text>
          </TouchableOpacity>
          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}>
              <Text style={styles.textForgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.action}>
          <View />
          <View style={styles.register}>
            <Text style={{fontSize: 16}}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text style={styles.textRegister}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
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
  saveInfomation: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  button: {
    fontSize: 18,
    color: '#ffffff',
  },
  action: {
    flex: 1,
    justifyContent: 'space-between',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    paddingBottom: 8,
  },
  register: {
    alignItems: 'center',
    paddingVertical: 32,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textForgotPassword: {
    fontStyle: 'italic',
  },
  textRegister: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});
