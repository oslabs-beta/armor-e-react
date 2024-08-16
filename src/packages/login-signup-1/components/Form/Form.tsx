// this is the generic component for both login and signup components. Those components are just a wrapper for this one

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import UsernameInput from '../Username/UsernameInput';
import EmailInput from '../Email/EmailInput';
import PasswordInput from '../Password/PasswordInput';
import ConfirmPasswordInput from '../ConfirmPassword/ConfirmPasswordInput';
import PhoneNumberInput from '../PhoneNumber/PhoneNumberInput';
import ChecklistContainer from '../ValidationChecklist/ChecklistContainer';
import { submitForm, validationChecklistDefaults } from "../../../../componentFunctionality/loginFunctions";
import type { FormProps, inputType, ValidationChecklist } from '../../types';
import './Form.css';



const Form: React.FC<FormProps> = (props) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    phoneNumber,
    isLogin,
    validationChecklist,
    primaryColor,
    secondaryColor
  } = props;

  const [usernameValue, setUsernameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<ValidationChecklist>(createValidationChecklist());

  const formRef = useRef<HTMLFormElement>(null);

  function createValidationChecklist(): ValidationChecklist {
    const output = [];
    for (const item of validationChecklistDefaults) {
      if (
        props[item.field] === undefined
        || props[item.field] === false
      ) continue;
      output.push(item)
    }
    return output;
  }

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
    <div>
      <div className="login-signup-container">
        <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
        <form onSubmit={(e) => handleSubmit(e)} ref={formRef}>
          {
            username && <UsernameInput
              value={usernameValue}
              setValue={setUsernameValue}
              options={username === undefined ? true : username}
              autocomplete={isLogin && 'username'}
              showLocalError={!validationChecklist}
            />
          }

          {
            email && <EmailInput
              value={emailValue}
              setValue={setEmailValue}
              options={email}
              autocomplete={'email'}
              showLocalError={!validationChecklist}
            />
          }

          {
            phoneNumber && <PhoneNumberInput
              value={phoneNumberValue}
              setValue={setPhoneNumberValue}
              options={phoneNumber}
              autocomplete='tel'
              showLocalError={!validationChecklist}
            />
          }

          {
            password && <PasswordInput
              value={passwordValue}
              setValue={setPasswordValue}
              options={password === undefined ? true : password}
              autocomplete={isLogin ? 'current-password' : 'new-password'}
              showPassword={showPassword}
              showLocalError={!validationChecklist}
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
              showLocalError={!validationChecklist}
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
      </div>
      {validationChecklist && <ChecklistContainer
        checklist={checklist}
        fieldValues={{
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          confirmPassword: confirmPasswordValue,
          phoneNumber: phoneNumberValue,
        }}
      />}
    </div>
  );
};

export default Form;


