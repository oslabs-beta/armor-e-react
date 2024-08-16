// this is the generic component for both login and signup components. Those components are just a wrapper for this one

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import UsernameInput from '../Username/UsernameInput';
import EmailInput from '../Email/EmailInput';
import PasswordInput from '../Password/PasswordInput';
import ConfirmPasswordInput from '../ConfirmPassword/ConfirmPasswordInput';
import PhoneNumberInput from '../PhoneNumber/PhoneNumberInput';
import ChecklistContainer from '../ValidationChecklist/ChecklistContainer';
import { changeBrightness, submitForm, validationChecklistDefaults } from "../../../../componentFunctionality/loginFunctions";
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
    secondaryColor,
    title,
    buttonText,
    textColor,
    showInputLabels,
    logoPath
  } = props;

  const [usernameValue, setUsernameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [checklist, setChecklist] = useState<ValidationChecklist>(createValidationChecklist());

  const formRef = useRef<HTMLFormElement>(null);

  const formDefaults = {
    title: isLogin ? 'Log In' : 'Sign Up',
    buttonText: buttonText || isLogin ? 'Log In' : 'Sign Up',
  }

  const colors = (() => {
    const primary = primaryColor || '#312e2b';
    const secondary = secondaryColor || 'maroon';
    const text = textColor || '#e0e0e0';
    return {
      primary,
      secondary,
      text,
      primaryDark: changeBrightness(primary, 0.7),
      secondaryDark: changeBrightness(secondary, 0.7),
      textDark: changeBrightness(text, 0.7),
      primaryLight: changeBrightness(primary, 1.5),
      secondaryLight: changeBrightness(secondary, 1.3),
      textLight: changeBrightness(text, 1.3),
      error: '#ffa3a3'
    }
  })();

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

  const [primary, secondary, formTitle] = (() => {
    const primary = primaryColor ? primaryColor : 'red';
    const secondary = secondaryColor ? secondaryColor : 'blue';
    let formTitle = isLogin ? 'Log In' : 'Sign Up';
    if (title) formTitle = title;
    return [primary, secondary, formTitle];
  })()

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
    <div
      style={{
        backgroundColor: colors.primary,
        color: colors.text
      }}>
      <style>
        {`
        .submit-button {
          background-color: ${colors.secondary};
          color: ${colors.textLight};
          border-color: ${colors.secondaryDark};
        }
        .submit-button:hover {
          background-color: ${colors.secondaryLight};
          border-color: ${colors.secondary};
          }
        .checkbox-container {
          background-color: ${colors.primaryLight};
        }
        .auth-footer {
          background-color: ${colors.primaryDark};
          color: ${colors.text}
        }
        .auth-options {
          accent-color: ${primaryColor};
        }
        `}
      </style>
      <div className='header-form-footer'>
        <div className='auth-header'>
          {logoPath && <img
            src={logoPath}
            className='auth-logo'
          />}
          <h2>{formTitle}</h2>
          <div></div>
        </div>
        <div className="form-container">
          <form
            onSubmit={(e) => handleSubmit(e)}
            ref={formRef}
          >
            {
              username && <UsernameInput
                value={usernameValue}
                setValue={setUsernameValue}
                options={username === undefined ? true : username}
                autocomplete={isLogin && 'username'}
                showLocalError={!validationChecklist}
                colors={colors}
                showLabel={showInputLabels}
              />
            }

            {
              email && <EmailInput
                value={emailValue}
                setValue={setEmailValue}
                options={email}
                autocomplete={'email'}
                showLocalError={!validationChecklist}
                colors={colors}
                showLabel={showInputLabels}
              />
            }

            {
              phoneNumber && <PhoneNumberInput
                value={phoneNumberValue}
                setValue={setPhoneNumberValue}
                options={phoneNumber}
                autocomplete='tel'
                showLocalError={!validationChecklist}
                colors={colors}
                showLabel={showInputLabels}
              />
            }

            {
              password && <PasswordInput
                value={passwordValue}
                setValue={setPasswordValue}
                options={password === undefined ? true : password}
                autocomplete={isLogin ? 'current-password' : 'new-password'}
                showLocalError={!validationChecklist}
                colors={colors}
                showLabel={showInputLabels}
              />
            }

            {
              confirmPassword && <ConfirmPasswordInput
                value={confirmPasswordValue}
                setValue={setConfirmPasswordValue}
                options={confirmPassword === undefined && !isLogin ? true : confirmPassword}
                autocomplete={'new-password'}
                passwordValue={passwordValue}
                showLocalError={!validationChecklist}
                colors={colors}
                showLabel={showInputLabels}
                
              />
            }
            <div>{errorMessage}</div>
            <div className='auth-options'>
              <span>
                <span className='checkboxContainer'>
                  <input
                    type='checkbox'
                  />
                </span>
                Remember me
              </span>
              <span>
                <a href='google.com'>
                  Forgot password?
                </a>
              </span>
            </div>
            <button
              className='submit-button'
              type="submit"
            >{isLogin ? 'Log In' : 'Sign Up'}</button>
          </form>
        </div>
        <div className='auth-footer'>
          <a>
            Don't have an account yet? Sign up now!
          </a>
        </div>
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


