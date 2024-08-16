import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const PasswordInput: React.FC<InputProps> = ({ 
  value, 
  setValue, 
  options, 
  autocomplete, 
  showPassword, 
  showLocalError,
  colors,
  showLabel
}) => {
  return (
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='password'
        autocomplete={autocomplete}
        showLocalError={showLocalError}
        colors={colors}
        showLabel={showLabel}
      />
  );
};

export default PasswordInput;
