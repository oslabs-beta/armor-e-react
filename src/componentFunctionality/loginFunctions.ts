import * as convert from 'color-convert';
// // functions and classes 

import { InputOptionsObject, validationObject, inputType, ValidationChecklist } from "../templates/login-signup-template/types";
import { KEYWORD } from 'color-convert/conversions';
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
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error();
  } catch (err) {
    console.log({ err });
    setError(failureMessage);
  }
}

// I might end up splitting this into multiple classes for each input field that all extend this class with the decorator pattern. 
export class InputOptions implements InputOptionsObject {
  validation?: validationObject;
  required?: boolean;
  placeholder?: string;

  constructor(
    type: inputType,
    options: InputOptionsObject | boolean,
    password?: string
  ) {
    if (typeof options === 'boolean') options = {};
    this.required = options.required || true;
    this.placeholder = options.placeholder || ' ';
    switch (type) {
      case 'username':
        this.placeholder = options.placeholder || 'Username';
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
        this.placeholder = options.placeholder || 'Email';
        break;
      case 'phoneNumber':
        this.validation = {
          min: 7,
          max: 15,
          regex: /^\d+$/,
          errorMessage: 'Please provide a valid email phone number',
        };
        this.placeholder = options.placeholder || 'Phone Number';
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
        this.placeholder = options.placeholder || 'Password';
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
        this.placeholder = options.placeholder || 'Confirm Password';
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

export const validationChecklistDefaults: ValidationChecklist = [
  {
    get condition() {
      return `Username must be ${this.min} to ${this.max} characters long`;
    },
    min: 3,
    max: 20,
    field: 'username',
  },
  {
    condition: 'Username must contain only letters, numbers, and underscores',
    regex: /^[\w]+$/,
    field: 'username',
  },
  {
    condition: 'Valid email address',
    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    field: 'email',
  },
  {
    get condition() {
      return `Password must be ${this.min} to ${this.max} characters long`;
    },
    min: 14,
    max: 64,
    field: 'password',
  },
  {
    condition: 'Password must contain a number',
    regex: /\d/,
    field: 'password',
  },
  {
    condition: 'Password must contain a lowercase letter',
    regex: /[a-z]/,
    field: 'password',
  },
  {
    condition: 'Password must contain an uppercase letter',
    regex: /[A-Z]/,
    field: 'password',
  },
  {
    condition: 'Password must contain a special character',
    regex: /[^a-zA-Z0-9]/,
    field: 'password',
  },
  {
    condition: 'Passwords must match',
    field: 'confirmPassword',
  },
  {
    condition: 'Valid phone number',
    min: 7,
    max: 15,
    regex: /^\d+$/,
    field: 'phoneNumber',
  }
]

export class usernameOptions extends InputOptions {

}

// // takes a color represented by keyword, rgb, or hex and converts it to hex
const convertColorToHex = (color: string): any => {
  if (color[0] === '#') return color;
  if (color.slice(0, 3) === 'rgb') {
    color = color.replace(' ', '');
    const openingIndex: number = color.indexOf('(') + 1;
    const closingIndex: number = color.indexOf(')')
    const colorValues: string[] = color.slice(openingIndex, closingIndex).split(',');
    const rr: number = parseInt(colorValues[0]);
    const gg: number = parseInt(colorValues[1]);
    const bb: number = parseInt(colorValues[2]);
    return '#' + convert.rgb.hex(rr, gg, bb);
  }
  return '#' + convert.keyword.hex(color as KEYWORD);
}

/*
lightens or darkens a color based on the amount specified by percent. 
higher numbers lighten the color, and lower numbers darken them
*/ 
export const changeBrightness = (color: string, percent: number): any => {
  const hex = convertColorToHex(color);
  const colorValues: (string)[] = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5)];
  colorValues.forEach((hex, index) => {
    // convert to decimal
    let decimal: number = parseInt(hex, 16);
    // calculate value
    decimal = Math.floor(decimal * percent);
    decimal = Math.min(255, decimal);
    // create new hex value
    colorValues[index] = decimal.toString(16).padStart(2, '0');
  })
  console.log({colorValues});
  return `#${colorValues.toString().replaceAll(',', '')}`;
}
