// functions and classes 

import {InputOptionsObject, validationObject, inputType} from "../templates/login-signup-template/types";

export const submitForm = async (
  setError: (error: string) => void,
  inputFields: Record<string, string>,
  endpoint: string,
  failureMessage: string,
): Promise<void> => {
  setError('');
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(inputFields),
      credentials: 'include'
    });
    if (!response.ok) throw new Error();
  } catch (err) {
    console.log({err});
    setError(failureMessage);
  }
}

// I might end up splitting this into multiple classes for each input field that all extend this class with the decorator pattern. 
export class InputOptions implements InputOptionsObject{
  validation?: validationObject;
  required?: boolean;
  placeholder?: string;

  constructor (
    type: inputType, 
    options: InputOptionsObject | boolean,
    password?: string
  ) {
    if (typeof options === 'boolean') options = {};
    this.required = options.required || true;
    this.placeholder = options.placeholder || ' ';
    switch (type) {
      case 'username':
        this.validation = {
          min: 3,
          max: 20,
          regex: /^[\w]+$/,
          get errorMessage() {
            return `Username must be between ${this.min} and ${this.max} characters and contain only numbers, letters, and underscores`;
          },
        };
        break;
      case 'email':
        this.validation = {
          regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          errorMessage: 'Please provide a valid email address',
        };
        break;
      case 'phoneNumber':
        this.validation = {
          min: 7,
          max: 15,
          regex: /^\d+$/,
          errorMessage: 'Please provide a valid email phone number',
        };
        break;
      case 'password':
        this.validation = {
          min: 14,
          max: 63,
          regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$/,
          get errorMessage() {
            return `Password must be between ${this.min} and ${this.max} characters long and must contain at least one lowercase letter, one uppercase letter, one number, and one special character`;
          },
        };
        break;
      case 'confirmPassword':
        if (password === undefined) break;
        const passwordEscapeSpecialCharacters: string = 
        password.replaceAll(/[\^\$\\\.\*\+\?\(\)\[\]\{\}\|\/]/g, (unescaped) => `\\${unescaped}`);
        const regex: RegExp = new RegExp(`(${passwordEscapeSpecialCharacters})`);
        this.validation = {
          regex,
          errorMessage: 'Passwords must match'
        }
        break;
      default:
        this.validation = {}
        break;
      }
    if (options.validation) Object.keys(options.validation).forEach((key: keyof validationObject) => {
      Object.defineProperty(this.validation, key, {
        value: options.validation[key]
      });
    })
  }
}