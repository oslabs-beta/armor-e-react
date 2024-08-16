import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const ConfirmPasswordInput: React.FC<InputProps> = ({ 
  value, 
  setValue, 
  options, 
  autocomplete, 
  showPassword, 
  passwordValue, 
  showLocalError ,
  colors,
  showLabel
}) => {
  return (
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='confirmPassword'
        autocomplete={autocomplete}
        passwordValue={passwordValue}
        showLocalError={showLocalError}
        colors={colors}
        showLabel={showLabel}
      />
  );
};

export default ConfirmPasswordInput;
