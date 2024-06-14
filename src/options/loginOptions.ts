import * as types from '../types';

const defaultValidationOptions: types.validationDefaultsDictionary = {
  username: {
    min: 3,
    max: 20,
    errorMessage: 'Username must be between 3 and 20 characters and contain only numbers, letters, and underscores',
    regex: /^[\w]+$/
  },
  email: {
    errorMessage: 'Please type a valid email address',
    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  password: {
    min: 14,
    max: 64,
    errorMessage: 'Password must be at least 14 characters long and must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$/
  },
  phoneNumber: {
    min: 7,
    max: 15,
    errorMessage: 'Please use a valid phone number',
    regex: /^\d+$/
  }
}
const username = 'hello';
const password = 'secret';
const testInputs = [username, password]


const validateInput = (
  setError: (error: string) => void,
  input: string | number,
  inputType: string,
  errorMessage?: string,
  min?: number,
  max?: number,
  regex?: RegExp
): boolean => {
  setError('');
  input = input.toString();

  // assign default values if necessary
  min = min ? min : defaultValidationOptions[inputType].min;
  max = max ? max : defaultValidationOptions[inputType].max;
  errorMessage = errorMessage ? errorMessage : defaultValidationOptions[inputType].errorMessage;
  regex = regex ? regex : defaultValidationOptions[inputType].regex;

  if (input.length > max || input.length < min || (regex && !regex.test(input))) {
    setError(errorMessage);
    return false;
  }
  return true;
}
const submitForm = async (
  setError: (error: string) => void,
  inputFields: Record<string, string>[],
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
    setError(failureMessage);
  }
}

module.exports = {validateInput, submitForm};
