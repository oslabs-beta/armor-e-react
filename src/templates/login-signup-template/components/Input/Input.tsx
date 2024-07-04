import React, { useState, useRef } from 'react';
import { validateInput, submitForm } from '../../../../options/loginOptions';
import type { validationDefaultsDictionary } from '../../types';
import { InputProps } from '../../types';
import './Input.css';
import { NumberLiteralType } from 'typescript';

const defaultValidationOptions: validationDefaultsDictionary = {
  username: {
    min: 3,
    max: 20,
    regex: /^[\w]+$/
  },
  email: {
    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  password: {
    min: 14,
    max: 64,
    regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$/
  },
  confirmPassword: {
    min: undefined,
    max: undefined,
  },
  phoneNumber: {
    min: 7,
    max: 15,
    regex: /^\d+$/
  },
  getErrorMessage: (
    inputType: string,
    min?: number,
    max?: number
  ): string => {
    switch (inputType) {
      case 'username':
        return `Username must be between ${min} and ${max} characters and contain only numbers, letters, and underscores`;
      case 'email':
        return 'Please provide a valid email address';
      case 'password':
        return `Password must be between ${min} and ${max} characters long and must contain at least one lowercase letter, one uppercase letter, one number, and one special character`;
      case 'confirmPassword':
        return 'Passwords must match';
      case 'phoneNumber':
        return 'Please provide a valid phone number';
      default:
        return 'Input invalid';
    }
  }
}

const Input: React.FC<InputProps> = ({ value, setValue, options, inputType, showPassword, autocomplete, passwordValue }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [error, setError] = useState<string>('');

  const inputRef = useRef(null)


  const type = (() => {
    if (showPassword) return 'text';
    if (inputType === 'email') return 'email';
    if (inputType === 'phoneNumber') return 'tel';
    if (inputType === 'password' || inputType === 'confirmPassword') return 'password';
    return 'text';
  })();

  const label = (() => {
    let output: string = inputType[0].toUpperCase() + inputType.slice(1);
    output = output.replaceAll(/[A-Z]/g, (char) => ' ' + char);
    return output.trimStart();
  })();

  const [min, max, regex, isRequired, errorMessage, placeholder] =
    ((): [number, number, RegExp, boolean, string, string] => {
      // get default validation values 
      let errorMessage: string;
      let min: number = defaultValidationOptions[inputType].min;
      let max: number = defaultValidationOptions[inputType].max;
      let regex = defaultValidationOptions[inputType].regex;
      let isRequired: boolean = true; // input fields are required by default

      // update validation options
      if (options.required === false) isRequired = false;
      let placeholder: string = options.placeholder || '';
      if (typeof options === 'object') {
        if (options.validation) {
          min = options.validation.min || min;
          max = options.validation.max || max;
          regex = options.validation.regex || regex;
          errorMessage = options.validation.errorMessage;
        }
      }
      console.log({inputType, passwordValue})
      if(inputType === 'confirmPassword') regex = new RegExp(`(${passwordValue})`);
      if (!errorMessage) errorMessage = defaultValidationOptions.getErrorMessage(inputType, min, max);

      return [min, max, regex, isRequired, errorMessage, placeholder];
    })();


  const onChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setBackgroundColor('');
    if (inputRef.current.matches('input:invalid')) setError(errorMessage);
    else setError('');
  }

  const focusOutFunction = () => {
    if (value === '' && isRequired) {
      setError('Required field');
      setBackgroundColor('rgb(255, 96, 96)');
    }
  };

  const focusInFunction = () => {
    setError('');
    if (inputRef.current.matches('input:invalid')) {
      setError(errorMessage);
    }
  }

  return (
    <div className="form-group">
      <label htmlFor={inputType}>
        {label}:
        <span style={{ color: 'red' }}>
          {isRequired ? ' *' : ''}
        </span>
      </label>
      <br />
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
        required={isRequired}
        autoComplete={autocomplete}
        minLength={min}
        maxLength={max}
        pattern={regex.toString().slice(1, -1)} //remove the delimiters from regex
      />
      <br />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Input;
