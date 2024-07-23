// this is the generic component for both login and signup components. Those components are just a wrapper for this one

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import UsernameInput from '../Username/UsernameInput';
import EmailInput from '../Email/EmailInput';
import PasswordInput from '../Password/PasswordInput';
import ConfirmPasswordInput from '../ConfirmPassword/ConfirmPasswordInput';
import PhoneNumberInput from '../PhoneNumber/PhoneNumberInput';
// import ValidationChecklistContainer from '../ValidationChecklist/ValidationChecklistContainer';
import { submitForm } from "../../../../componentFunctionality/loginFunctions";
import type { FormProps, inputType, ValidationChecklist } from '../../types';
import './Form.css';

// const validationChecklistDefaults: ValidationChecklist = {
//   username: [
//     {
//       get condition() {
//         return `Username must be ${this.min} to ${this.max} characters long`;
//       },
//       min: 3,
//       max: 20,
//       isFulfilled: false
//     },
//     {
//       condition: 'Username must contain only letters, numbers, and underscores',
//       regex: /^[\w]+$/,
//       isFulfilled: false
//     },
//   ],
//   email: [
//     {
//       condition: 'Valid email address',
//       regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
//       isFulfilled: false
//     },
//   ],
//   password: [
//     {
//       get condition() {
//         return `Password must be ${this.min} to ${this.max} characters long`;
//       },
//       min: 14,
//       max: 64,
//       isFulfilled: false
//     },
//     {
//       condition: 'Password must contain a number',
//       regex: /\d/,
//       isFulfilled: false
//     },
//     {
//       condition: 'Password must contain a lowercase letter',
//       regex: /[a-z]/,
//       isFulfilled: false
//     },
//     {
//       condition: 'Password must contain an uppercase letter',
//       regex: /[A-Z]/,
//       isFulfilled: false
//     },
//     {
//       condition: 'Password must contain a special character',
//       regex: /[^a-zA-Z0-9]/,
//       isFulfilled: false
//     },
//   ],
//   confirmPassword: [
//     {
//       condition: 'Passwords must match',
//       isFulfilled: false
//     },
//   ],
//   phoneNumber: [
//     {
//       condition: 'Valid phone number',
//       min: 7,
//       max: 15,
//       regex: /^\d+$/,
//       isFulfilled: false
//     }
//   ]
// }

const Form: React.FC<FormProps> = (props) => {
  const { username, email, password, confirmPassword, phoneNumber, isLogin, validationChecklist } = props;

  const [usernameValue, setUsernameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [checklist, setChecklist] = useState<ValidationChecklist>(setValidationChecklist());

  const formRef = useRef<HTMLFormElement>(null);

  // function setValidationChecklist(): ValidationChecklist {
  //   const output: ValidationChecklist = {};
  //   if (!validationChecklist) return output;
  //   for (let inputType in validationChecklistDefaults) {
  //     if (!props[inputType as inputType]) continue;
  //     if (typeof validationChecklist === 'boolean' || !validationChecklist[inputType as inputType]) { // use defaults
  //       output[inputType as inputType] = validationChecklistDefaults[inputType as inputType];
  //     }
  //     else { // use passed in values
  //       output[inputType as inputType] = validationChecklist[inputType as inputType];
  //     }
  //   }
  //   return output;
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody: Record<string, string> = {}

    if (username) requestBody.username = usernameValue;
    if (email) requestBody.email = emailValue;
    if (phoneNumber) requestBody.phoneNumber = phoneNumberValue.toString();
    if (password) requestBody.password = passwordValue;

    submitForm(setErrorMessage, requestBody, isLogin ? '/login' : '/signup', 'failed to login');
  }

  const handleShowPassword = (e: React.MouseEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).checked) setShowPassword(true);
    else setShowPassword(false);
  }

  // focus the firt input field on initial component mount
  useEffect(() => {
    // performs a DFS to find first node with type input and focuses it
    const focusFirstInput = (node: HTMLElement) => {
      if (node.matches('input')) {
        node.focus();
        return true;
      }
      const childNodes: HTMLElement[] = Array.from(node.children) as HTMLElement[];
      return childNodes.some((child): boolean | undefined => (
        focusFirstInput(child)
      ));
    }
    focusFirstInput(formRef.current);
  }, [])

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
      <form onSubmit={(e) => handleSubmit(e)} ref={formRef}>
        {
          username && <UsernameInput
            value={usernameValue}
            setValue={setUsernameValue}
            options={username === undefined ? true : username}
            autocomplete={isLogin && 'username'}
          />
        }

        {
          email && <EmailInput
            value={emailValue}
            setValue={setEmailValue}
            options={email}
            autocomplete={'email'}
          />
        }

        {
          phoneNumber && <PhoneNumberInput
            value={phoneNumberValue}
            setValue={setPhoneNumberValue}
            options={phoneNumber}
            autocomplete='tel'
          />
        }

        {
          password && <PasswordInput
            value={passwordValue}
            setValue={setPasswordValue}
            options={password === undefined ? true : password}
            autocomplete={isLogin ? 'current-password' : 'new-password'}
            showPassword={showPassword}
          />
        }

        {
          confirmPassword && <ConfirmPasswordInput
            value={confirmPasswordValue}
            setValue={setConfirmPasswordValue}
            options={confirmPassword === undefined && !isLogin ? true : confirmPassword}
            autocomplete={'new-password'}
            showPassword={showPassword}
            passwordValue={passwordValue}
          />
        }
        <input
          type='checkbox'
          id='showPassword'
          onClick={(e) => handleShowPassword(e)}
        />
        <label htmlFor='showPassword'>Show Password</label>
        <div>{errorMessage}</div>
        <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
      </form>
      {/* <ValidationChecklistContainer
        checklist={checklist}
      /> */}
    </div>
  );
};

export default Form;


