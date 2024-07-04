import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const PhoneNumberInput: React.FC<InputProps> = ({ value, setValue, setError, options, autocomplete }) => {
  return (
    <div>
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='phoneNumber'
        autocomplete={autocomplete}
      />
    </div>
  );
};

export default PhoneNumberInput;
