import React from 'react';
import {Layout} from '../../components/Layout';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Input} from '../../components/Input';
import {useForm} from 'react-hook-form';

export const ChangePasswordScreen = () => {
  const {handleSubmit, control} = useForm();
  const onSubmit = (data: any) => {
    console.log({data});
  };
  return (
    <Layout>
      <View style={styles.wrapper}>
        <View style={styles.logo}>
          <Text style={styles.title}>Change password!</Text>
        </View>
        <View style={styles.form}>
          <Input control={control} name="newPassword" label="New password" />
          <Input
            control={control}
            name="confirmNewPassWord"
            label="Confirm password"
          />
          <Input control={control} name="verifyCode" label="Verify code" />
          <View style={styles.buttonWrap}>
            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              <Text style={styles.button}>Change password</Text>
            </Button>
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
  title: {
    fontSize: 24,
    fontWeight: '900',
  },
  form: {
    flex: 2,
    rowGap: 16,
  },
  button: {
    fontSize: 18,
    color: '#ffffff',
  },
  buttonWrap: {
    paddingTop: 24,
  },
});
