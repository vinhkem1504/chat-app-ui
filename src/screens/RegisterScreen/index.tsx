import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Layout} from '../../components/Layout';
import {Input} from '../../components/Input';
import {useForm} from 'react-hook-form';
import {Button, TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

export const RegiterScreen = () => {
  const [isShownPassword, setShowPassword] = useState<boolean>(false);
  const schema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'Passwords must match',
    ),
  });
  const {handleSubmit, control} = useForm({
    resolver: yupResolver(schema),
  });
  const onEyeChange = (isShow: boolean) => {
    setShowPassword(isShow);
  };
  const onSubmit = (data: any) => {
    console.log({register: data});
  };
  return (
    <Layout>
      <View style={styles.wrapper}>
        <View style={styles.logo}>
          <Text style={styles.title}>Register !</Text>
          <Text style={styles.subTitle}>Create a new account</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Input control={control} name="fisrtname" label="First name" />
            <Input control={control} name="lastname" label="Last name" />
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
            <Input
              control={control}
              name="confirmPassword"
              label="Confirm password"
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
          </View>
          <View>
            <Button mode="contained">
              <Text style={styles.button} onPress={handleSubmit(onSubmit)}>
                Register
              </Text>
            </Button>
          </View>
        </View>
        <View style={styles.login}>
          <Text>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 6,
    // backgroundColor: 'green',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
  },
  subTitle: {
    fontWeight: '400',
  },
  form: {
    flex: 7,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  input: {
    rowGap: 8,
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 18,
    color: '#ffffff',
  },
  login: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    justifyContent: 'center',
    // backgroundColor: 'yellow',
  },
  textLogin: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});
