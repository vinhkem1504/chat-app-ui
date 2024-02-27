import React from 'react';
import {Controller} from 'react-hook-form';
import {Text, TextInput} from 'react-native-paper';

interface IInput {
  name: string;
  label?: string;
  color?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
  register?: any;
  setValue?: any;
  control: any;
}

export const Input: React.FC<IInput> = ({
  name,
  control,
  label,
  color,
  rightIcon,
  leftIcon,
  isPassword,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field, fieldState}) => {
        return (
          <>
            <TextInput
              {...field}
              onChangeText={text => field.onChange(text)}
              mode="outlined"
              label={label}
              textColor={color}
              right={rightIcon}
              left={leftIcon}
              secureTextEntry={isPassword}
            />
            {fieldState.error && (
              <Text style={{color: 'red'}}>{fieldState.error.message}</Text>
            )}
          </>
        );
      }}
    />
  );
};
