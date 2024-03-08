import React, {useState} from 'react';
import {Layout} from '../../components/Layout';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Input} from '../../components/Input';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<any>();
  const [isContinue, setIsContinue] = useState<boolean>(false);
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
  });
  const {handleSubmit, control} = useForm({resolver: yupResolver(schema)});
  const onSubmit = (data: any) => {
    console.log({data});
    setIsContinue(true);
  };
  return (
    <Layout backButton>
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
            {isContinue && (
              <Button
                mode="contained"
                onPress={() => {
                  navigation.navigate('ChangePassword');
                }}
                buttonColor="#3cb05b">
                <Text style={styles.button}>Continue</Text>
              </Button>
            )}
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
