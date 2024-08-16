import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const ConfirmPasswordInput: React.FC<InputProps> = ({ value, setValue, options, autocomplete, showPassword, passwordValue, showLocalError }) => {
  return (
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='confirmPassword'
        autocomplete={autocomplete}
        showPassword={showPassword}
        passwordValue={passwordValue}
        showLocalError={showLocalError}
      />
  );
};

export default ConfirmPasswordInput;
