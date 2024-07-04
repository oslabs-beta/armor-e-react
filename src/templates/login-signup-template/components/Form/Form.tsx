import React, { useState, FormEvent } from 'react';
import UsernameInput from '../Username/UsernameInput';
import EmailInput from '../Email/EmailInput';
import PasswordInput from '../Password/PasswordInput';
import ConfirmPasswordInput from '../ConfirmPassword/ConfirmPasswordInput';
import PhoneNumberInput from '../PhoneNumber/PhoneNumberInput';
import { validateInput, submitForm } from "../../../../options/loginOptions";
import type { FormProps } from '../../types';
import './Form.css';

const Form: React.FC<FormProps> = ({ username, email, password, confirmPassword, phoneNumber, isLogin }) => {
  const [usernameValue, setUsernameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // set default values for ommitted props
  const setDefaults = ((): void => {
    if (username === undefined) username = true;
    if (password === undefined) password = true;
    if (confirmPassword === undefined && !isLogin) confirmPassword = true;
  })();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody: Record<string, string> = {}

    if (username) requestBody.username = usernameValue;
    if (email) requestBody.email = emailValue;
    if (phoneNumber) requestBody.phoneNumber = phoneNumberValue.toString();
    if (password) requestBody.password = passwordValue;

    submitForm(setErrorMessage, requestBody, isLogin ? '/login' : '/signup', 'failed to login');
  }

  const handleShowPassword = (e) => {
    if (e.target.checked) setShowPassword(true);
    else setShowPassword(false);
  }

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {
          username && <UsernameInput
            value={usernameValue}
            setValue={setUsernameValue}
            options={username}
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
            options={password}
            autocomplete={isLogin ? 'current-password' : 'new-password'}
            showPassword={showPassword}
          />
        }

        {
          confirmPassword && <ConfirmPasswordInput
            value={confirmPasswordValue}
            setValue={setConfirmPasswordValue}
            options={confirmPassword}
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
    </div>
  );
};

export default Form;


