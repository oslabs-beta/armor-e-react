import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const PasswordInput: React.FC<InputProps> = ({ value, setValue, options, autocomplete, showPassword }) => {
  return (
    <div>
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='password'
        autocomplete={autocomplete}
        showPassword={showPassword}
      />
    </div>
  );
};

export default PasswordInput;
