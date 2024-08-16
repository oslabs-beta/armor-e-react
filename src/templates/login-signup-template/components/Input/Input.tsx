// this is the generic component for the input components. Those components are just a wrapper for this one


import React, { useState, useRef } from 'react';
import { InputProps, validationObject } from '../../types';
import { InputOptions, changeBrightness } from '../../../../componentFunctionality/loginFunctions';
import './Input.css';
import passwordImage from '../../../../assets/password.png';
import usernameImage from '../../../../assets/username.png';
import emailImage from '../../../../assets/email.png';
import phoneNumberImage from '../../../../assets/phoneNumber.png';
import closedEye from '../../../../assets/closedEye.png'
import openedEye from '../../../../assets/openedEye.png'

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  options,
  inputType,
  autocomplete,
  passwordValue,
  showLocalError,
  colors,
  showLabel
}) => {
  const [outlineColor, setOutlineColor] = useState<string>(''); // background color for input field indicates valid/invalid input
  const [error, setError] = useState<string>(''); // a local error message for this input field
  const [showPassword, setShowPassword] = useState(false);

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


  const checkInputAvailability = async (value: string) => {
    if (inputType === 'password' || inputType === 'confirmPassword') return;
    if (typeof options !== 'object' || !options.checkAvailability) return;
    try {
      const response = await fetch(options.checkAvailability, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [inputType]: value
        })
      })
      const isAvailable = (await response.json()).available;
      if (!isAvailable) {
        setError('Username taken');
        // setOutlineColor('rgb(255, 96, 96)');
      }
    } catch (err) {
      console.log({ err })
    }
  }

  const onChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log({ inputType })
    // setOutlineColor('');
    if (inputRef.current.matches('input:invalid')) setError(errorMessage);
    else {
      setError('');
      checkInputAvailability(e.target.value);
    }
  }

  const focusOutFunction = () => {
    if (value === '' && required) {
      setError('Required field');
      // setOutlineColor('rgb(255, 96, 96)');
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
      case 'password':
        return passwordImage
      case 'confirmPassword':
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
  }

  return (
    <div
      className='input-group'
      style={{ paddingBottom: '5px' }}
    >
      <style>
        {`
        .inputContainer input {
          color: ${colors.text}
        }
        .inputContainer input::placeholder {
          color: ${colors.textDark};
          opacity: 0.7
        }
        `}
      </style>
      <label
        htmlFor={inputType}
        style={{ display: 'block' }}
      >
        {showLabel && label +': '}
        <span className='requiredContainer'>
          {required ? '*' : ''}
        </span>
      </label>
      <div>
        <div className='inputContainer'
          style={{
            border: `1px solid ${colors.primary}`,
            backgroundColor: colors.primaryLight
          }}>
          <img src={chooseInputImage()} className='inputImage' />
          <input
            style={{ backgroundColor: colors.primaryLight }}
            ref={inputRef}
            type={type}
            id={inputType}
            value={value}
            onChange={onChangeFunction}
            onFocus={focusInFunction}
            onBlur={focusOutFunction}
            placeholder={`${placeholder}`}
            required={required}
            autoComplete={autocomplete}
            minLength={min}
            maxLength={max}
            pattern={regex.toString().slice(1, -1)} //remove the delimiters (forward slashes) from regex
          // onInvalid={(e) => inputRef.current.focus()}
          />
          {
            (inputType === 'password' || inputType === 'confirmPassword') &&
            <button
              className='show-password-button'
              onClick={() => setShowPassword(showPassword ? false : true)}
            >
              <img
                src={showPassword ? closedEye : openedEye}
                className='inputImage'
              />
            </button>
          }
        </div>
      </div>
      {error && showLocalError &&
        <div className='auth-local-error'
          style={{
            color: colors.error,
            display: 'block'
          }}
        >
          {error}
        </div>
      }
    </div>
  );
};

export default Input;
