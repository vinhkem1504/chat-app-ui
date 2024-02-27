import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Input} from '../../components/Input';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';
import {userLogin} from '../../APIs/auth.api';
import {Layout} from '../../components/Layout';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const LoginScreen = () => {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
  });

  const {handleSubmit, control} = useForm({
    resolver: yupResolver(schema),
  });
  const [checked, setChecked] = useState<boolean>(false);
  const [isShownPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    console.log({data});

    try {
      userLogin(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onEyeChange = (isShow: boolean) => {
    setShowPassword(isShow);
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };
  return (
    <Layout>
      <View>
        <Button onPress={showDatePicker}>Show Date Picker</Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
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
            <TouchableOpacity>
              <Text style={styles.textForgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.action}>
          <View></View>
          <View style={styles.register}>
            <Text style={{fontSize: 16}}>Don't have an account? </Text>
            <TouchableOpacity>
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
    paddingVertical: 16,
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
