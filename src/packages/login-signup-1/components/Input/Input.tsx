// this is the generic component for the input components. Those components are just a wrapper for this one


import React, { useState, useRef } from 'react';
import type { inputType, InputOptionsObject } from '../../types';
import { InputProps, validationObject } from '../../types';
import { InputOptions } from '../../../../componentFunctionality/loginFunctions';
import './Input.css';
import passwordImage from '../../../../assets/password.jpg';
import usernameImage from '../../../../assets/username.jpg';
import emailImage from '../../../../assets/email.jpg';
import phoneNumberImage from '../../../../assets/phoneNumber.jpg';

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  options,
  inputType,
  showPassword,
  autocomplete,
  passwordValue,
  showLocalError
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(''); // background color for input field indicates valid/invalid input
  const [error, setError] = useState<string>(''); // a local error message for this input field

  const inputRef = useRef(null);

  const type = (() => { // gets the value of the type prop for the returned input component
    if (showPassword) return 'text';
    if (inputType === 'email') return 'email';
    if (inputType === 'phoneNumber') return 'tel';
    if (inputType === 'password' || inputType === 'confirmPassword') return 'password';
    return 'text';
  })();

  const label = (() => { // gets the value of the label for the input field
    let output: string = inputType[0].toUpperCase() + inputType.slice(1);
    output = output.replaceAll(/[A-Z]/g, (char) => ' ' + char);
    return output.trimStart();
  })();

  // get values from options and default
  const updatedOptions = new InputOptions(inputType, options, passwordValue);
  const { required, placeholder } = updatedOptions;
  const { min, max, regex, errorMessage } = updatedOptions.validation;


  const onChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setBackgroundColor('');
    if (inputRef.current.matches('input:invalid')) setError(errorMessage);
    else setError('');
  }

  const focusOutFunction = () => {
    if (value === '' && required) {
      setError('Required field');
      setBackgroundColor('rgb(255, 96, 96)');
    }
  };

  const focusInFunction = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setError('');
    if (inputRef.current.matches('input:invalid')) {
      setError(errorMessage);
    }
  }

  const chooseInputImage = (): string => {
    switch (inputType) {
      case 'password' || 'confirmPassword':
        return passwordImage
      case 'username':
        return usernameImage
      case 'email':
        return emailImage
      case 'phoneNumber':
        return phoneNumberImage
      default:
        break;
    }
    if (inputType === 'confirmPassword' || input) return passwordImage;
  }

  return (
    <div>
      <div className="form-group">
        <label htmlFor={inputType}>
          <span style={{ display: 'none' }}>{label}:</span>
          <span style={{ color: 'red' }}>
            {required ? '*' : ''}
          </span>
        </label>
        <div className='inputContainer'>
          <img src={chooseInputImage()} className='inputImage' />
          <input
            style={{ backgroundColor }}
            ref={inputRef}
            type={type}
            id={inputType}
            value={value}
            onChange={onChangeFunction}
            onFocus={focusInFunction}
            onBlur={focusOutFunction}
            placeholder={placeholder}
            required={required}
            autoComplete={autocomplete}
            minLength={min}
            maxLength={max}
            pattern={regex.toString().slice(1, -1)} //remove the delimiters (forward slashes) from regex
          // onInvalid={(e) => inputRef.current.focus()}
          />
        </div>
        <br />
      </div>
      {error && showLocalError && <div style={{ color: 'red', display: 'block'}}>{error}</div>}
      <br/>
    </div>
  );
};

export default Input;
