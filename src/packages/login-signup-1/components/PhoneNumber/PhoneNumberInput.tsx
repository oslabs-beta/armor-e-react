import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const PhoneNumberInput: React.FC<InputProps> = ({ value, setValue, options, autocomplete, showLocalError }) => {
  return (
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='phoneNumber'
        autocomplete={autocomplete}
        showLocalError={showLocalError}
      />
  );
};

export default PhoneNumberInput;
