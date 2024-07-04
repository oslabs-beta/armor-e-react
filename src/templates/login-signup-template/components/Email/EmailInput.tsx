import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const EmailInput: React.FC<InputProps> = ({ value, setValue, setError, options, autocomplete }) => {
  return (
    <div>
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='email'
        autocomplete={autocomplete}
      />
    </div>
  );
};

export default EmailInput;
