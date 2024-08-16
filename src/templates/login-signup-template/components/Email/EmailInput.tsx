import React from 'react';
import Input from '../Input/Input';
import { InputProps } from '../../types';

const EmailInput: React.FC<InputProps> = ({ 
  value, 
  setValue, 
  options, 
  autocomplete, 
  showLocalError, 
  colors,
  showLabel
}) => {
  return (
      <Input
        value={value}
        setValue={setValue}
        options={options}
        inputType='email'
        autocomplete={autocomplete}
        showLocalError={showLocalError}
        colors={colors}
        showLabel={showLabel}

      />
  );
};

export default EmailInput;
