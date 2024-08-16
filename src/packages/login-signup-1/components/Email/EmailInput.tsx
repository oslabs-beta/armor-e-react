import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const EmailInput: React.FC<InputProps> = ({ value, setValue, setError, options, autocomplete, showLocalError }) => {
  return (
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='email'
        autocomplete={autocomplete}
        showLocalError={showLocalError}
      />
  );
};

export default EmailInput;
