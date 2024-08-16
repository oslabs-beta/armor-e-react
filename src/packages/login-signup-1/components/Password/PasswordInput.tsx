import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const PasswordInput: React.FC<InputProps> = ({ value, setValue, options, autocomplete, showPassword, showLocalError }) => {
  return (
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='password'
        autocomplete={autocomplete}
        showPassword={showPassword}
        showLocalError={showLocalError}
      />
  );
};

export default PasswordInput;
