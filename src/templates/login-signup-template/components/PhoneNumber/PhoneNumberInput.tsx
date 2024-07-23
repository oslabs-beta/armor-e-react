import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const PhoneNumberInput: React.FC<InputProps> = ({ value, setValue, setError, options, autocomplete }) => {
  return (
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='phoneNumber'
        autocomplete={autocomplete}
      />
  );
};

export default PhoneNumberInput;
