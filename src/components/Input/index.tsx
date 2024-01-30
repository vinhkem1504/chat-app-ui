import React from 'react';
import {TextInput} from 'react-native-paper';

interface IInput {
  label?: string;
  color?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
  value: string;
  onChange: (text: string) => void;
}

export const Input: React.FC<IInput> = ({
  label,
  color,
  rightIcon,
  leftIcon,
  isPassword,
  value,
  onChange,
}) => {
  return (
    <TextInput
      mode="outlined"
      label={label}
      textColor={color}
      right={rightIcon}
      left={leftIcon}
      secureTextEntry={isPassword}
      value={value}
      onChange={text => onChange(text.nativeEvent.text)}
    />
  );
};
