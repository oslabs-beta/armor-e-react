import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const UsernameInput: React.FC<InputProps> = ({ value, setValue, options, autocomplete }) => {
  return (
    <div>
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='username'
        autocomplete={autocomplete}
      />
    </div>
  );
};

export default UsernameInput;
