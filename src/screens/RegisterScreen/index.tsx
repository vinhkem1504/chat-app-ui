import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Layout} from '../../components/Layout';
import {Input} from '../../components/Input';
import {useForm} from 'react-hook-form';
import {Button, TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {userRegister} from '../../APIs/auth.api';

export const RegisterScreen = () => {
  const [isShownPassword, setShowPassword] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const schema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    birthDay: Yup.date().required(),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    birthDayShow: Yup.string().required(),
  });
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const {handleSubmit, control, setValue} = useForm({
    resolver: yupResolver(schema),
  });
  const handleConfirm = (date: any) => {
    setValue('birthDay', dayjs(date).toDate());
    setValue('birthDayShow', dayjs(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };
  const onEyeChange = (isShow: boolean) => {
    setShowPassword(isShow);
  };
  const onSubmit = (data: any) => {
    console.log({register: data});
    try {
      userRegister(data);
    } catch (error) {
      console.log(error);
    }
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
            <Input control={control} name="firstName" label="First name" />
            <Input control={control} name="lastName" label="Last name" />
            <Input control={control} name="email" label="Email" />
            <Input
              control={control}
              name="birthDayShow"
              placeholder="Birthday"
              isEditable={false}
              onPressIn={showDatePicker}
            />
            <View style={{display: 'none'}}>
              <Input control={control} name="birthDay" />
            </View>
            <DateTimePickerModal
              onCancel={hideDatePicker}
              onConfirm={handleConfirm}
              mode="date"
              isVisible={isDatePickerVisible}
            />
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
          <View style={styles.wrapButton}>
            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              <Text style={styles.button}>Register</Text>
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
  wrapButton: {
    paddingTop: 10,
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
