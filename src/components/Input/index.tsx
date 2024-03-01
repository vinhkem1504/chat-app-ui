import React from 'react';
import {Controller} from 'react-hook-form';
import {Text, TextInput} from 'react-native-paper';

interface IInput {
  name: string;
  placeholder?: string;
  label?: string;
  color?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
  isEditable?: boolean;
  onPressIn?: () => void;
  register?: any;
  setValue?: any;
  control: any;
}

export const Input: React.FC<IInput> = ({
  name,
  control,
  placeholder,
  label,
  color,
  rightIcon,
  leftIcon,
  isPassword,
  isEditable,
  onPressIn,
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
              placeholder={placeholder}
              textColor={color}
              right={rightIcon}
              left={leftIcon}
              secureTextEntry={isPassword}
              editable={isEditable}
              onPressIn={onPressIn}
            />
            {fieldState.error && (
              <Text style={{color: 'red', marginTop: -6}}>
                {fieldState.error.message}
              </Text>
            )}
          </>
        );
      }}
    />
  );
};
