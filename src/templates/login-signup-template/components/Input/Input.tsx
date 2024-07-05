import React, { useState, useRef } from 'react';
import type { inputDefaults, inputType, inputOptions } from '../../types';
import { InputProps } from '../../types';
import './Input.css';

const defaultValidationOptions: inputDefaults = {
  username: {
    validation: {
      min: 3,
      max: 20,
      regex: /^[\w]+$/,
      get errorMessage() {
        return `Username must be between ${this.min} and ${this.max} characters and contain only numbers, letters, and underscores`;
      },
    },
    placeholder: ' ',
    required: true,
  },
  email: {
    validation: {
      regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      errorMessage: 'Please provide a valid email address',
    },
    placeholder: ' ',
    required: true,
  },
  password: {
    validation: {
      min: 14,
      max: 64,
      regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$/,
      get errorMessage() {
        return `Password must be between ${this.min} and ${this.max} characters long and must contain at least one lowercase letter, one uppercase letter, one number, and one special character`;
      },
    },
    placeholder: ' ',
    required: true,
  },
  confirmPassword: {
    validation: {
      errorMessage: 'Passwords must match',
    },
    placeholder: ' ',
    required: true,
  },
  phoneNumber: {
    validation: {
      min: 7,
      max: 15,
      regex: /^\d+$/,
      errorMessage: 'Please provide a valid email phone number',
    },
    placeholder: ' ',
    required: true,
  },
}

const Input: React.FC<InputProps> = ({ value, setValue, options, inputType, showPassword, autocomplete, passwordValue }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(''); // background color for input field indicates valid/invalid input
  const [error, setError] = useState<string>(''); // a local error message for this input field

  const inputRef = useRef(null); // a ref to the returned input DOM element

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

  // gets values for input options from defaults and passed in props
  const [min, max, regex, isRequired, errorMessage, placeholder] =
    ((): [number, number, RegExp, boolean, string, string] => {

      // gets default values from dictionary
      const getDefaultValues = (): [number, number, RegExp, boolean, string, string] => {
        const defaultOptions: inputOptions = defaultValidationOptions[inputType as inputType];
        if (inputType === 'confirmPassword') {
          // create regex to match password value, escape special characters
          const matchPasswordsRegex: string = passwordValue.replaceAll(/[\^\$\\\.\*\+\?\(\)\[\]\{\}\|\/]/g, (unescaped) => `\\${unescaped}`);
          defaultOptions.validation.regex = new RegExp(`(${matchPasswordsRegex})`);
        }
        const { min, max, regex, errorMessage } = defaultOptions.validation;
        const isRequired: boolean = defaultOptions.required;
        const placeholder: string = defaultOptions.placeholder;
        return [min, max, regex, isRequired, errorMessage, placeholder];
      }

      // gets values from options prop
      const getValuesFromProp = (): [number, number, RegExp, boolean, string, string] => {
        options = options as inputOptions;
        const { min, max, regex, errorMessage } = options.validation || {};
        const isRequired: boolean = options.required;
        const placeholder: string = options.placeholder;
        return [min, max, regex, isRequired, errorMessage, placeholder];
      }

      if (typeof options === 'boolean') return getDefaultValues();

      const defaultValues = getDefaultValues();
      const valuesFromProp = getValuesFromProp();
      return valuesFromProp.map((value, index) => {
        if (value !== undefined) return value;
        return defaultValues[index];
      }) as [number, number, RegExp, boolean, string, string];

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
        pattern={regex.toString().slice(1, -1)} //remove the delimiters (forward slashes) from regex
      // onInvalid={(e) => inputRef.current.focus()}
      />
      <br />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Input;
