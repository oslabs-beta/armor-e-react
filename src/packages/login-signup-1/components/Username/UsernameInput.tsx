import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const UsernameInput: React.FC<InputProps> = ({ value, setValue, options, autocomplete, showLocalError }) => {
  return (
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='username'
        autocomplete={autocomplete}
        showLocalError={showLocalError}
      />
  );
};

export default UsernameInput;
