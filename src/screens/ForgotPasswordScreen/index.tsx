import React from 'react';
import {Layout} from '../../components/Layout';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Input} from '../../components/Input';
import {useForm} from 'react-hook-form';

export const ForgotPasswordScreen = () => {
  const {handleSubmit, control} = useForm();
  const onSubmit = (data: any) => {
    console.log({data});
  };
  return (
    <Layout>
      <View style={styles.wrapper}>
        <View style={styles.logo}>
          <Text style={styles.title}>Forgot password!</Text>
        </View>
        <View style={styles.form}>
          <Input control={control} name="email" label="Email" />
          <View style={styles.buttonWrap}>
            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              <Text style={styles.button}>Get code</Text>
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              buttonColor="#3cb05b">
              <Text style={styles.button}>Continue</Text>
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
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
  },
});
