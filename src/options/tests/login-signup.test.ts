const { validateInput, submitForm } = require('../loginOptions');
let error: string = '';
const setError = (errorMessage: string): void => {
  error = errorMessage;
}

describe('validateInput tests', () => {
  let error: string = '';
  const setError = (errorMessage: string): void => {
    error = errorMessage;
  }

  it('should use the correct default validation values', () => {
    const validUsername: string = 'hello123_';
    const invalidUsername: string = '????';
    let isValidUsername: boolean = validateInput(setError, validUsername, 'username');
    expect(isValidUsername).toBe(true);
    expect(error).toBe('');
    isValidUsername = validateInput(setError, invalidUsername, 'username');
    expect(isValidUsername).toBe(false);
    expect(error).toBe('Username must be between 3 and 20 characters and contain only numbers, letters, and underscores');

    const validEmail: string = 'valid@gmail.com';
    const invalidEmail: string = '@gmail.com';
    let isValidEmail: boolean = validateInput(setError, validEmail, 'email');
    expect(isValidEmail).toBe(true);
    expect(error).toBe('');
    isValidEmail = validateInput(setError, invalidEmail, 'email');
    expect(isValidEmail).toBe(false);
    expect(error).toBe('Please type a valid email address');

    const validPhoneNumber: number = 15557777777;
    const invalidPhoneNumber: string = 'b';
    let isValidPhoneNumber: boolean = validateInput(setError, validPhoneNumber, 'phoneNumber');
    expect(isValidPhoneNumber).toBe(true);
    expect(error).toBe('');
    isValidPhoneNumber = validateInput(setError, invalidPhoneNumber, 'phoneNumber');
    expect(isValidPhoneNumber).toBe(false);
    expect(error).toBe('Please use a valid phone number');

    const validPassword: string = 'lowerUPPER123!@#';
    const invalidPassword: string = 'password';
    let isValidPassword: boolean = validateInput(setError, validPassword, 'password');
    expect(isValidPassword).toBe(true);
    expect(error).toBe('');
    isValidPassword = validateInput(setError, invalidPassword, 'password');
    expect(isValidPassword).toBe(false);
    expect(error).toBe('Password must be at least 14 characters long and must contain at least one lowercase letter, one uppercase letter, one number, and one special character');
  });

  it('should set a custom error message', () => {
    const newErrorMessage: string = 'This should override the default error message';
    validateInput(setError, 'badPassword', 'password', newErrorMessage);
    expect(error).toBe(newErrorMessage);
  });

  it('should set a custom min value', () => {
    const isValidUsername: boolean = validateInput(setError, 'tooShort', 'username', undefined, 10);
    expect(isValidUsername).toBe(false);
  });

  it('should set a custom max value', () => {
    const isValidUsername: boolean = validateInput(setError, 'tooLong', 'username', undefined, undefined, 5);
    expect(isValidUsername).toBe(false);
  });

  it('should set a custom regular expression', () => {
    const isValidUsername: boolean = validateInput(setError, 'noNumbers7', 'username', undefined, undefined, undefined, /^[A-Za-z]$/);
    expect(isValidUsername).toBe(false);
  });
});

describe('submitForm tests', () => {
  setError('');
  // mock the fetch api to give an ok response
  global.fetch = jest.fn()
    .mockReturnValueOnce(Promise.resolve({
      json: () => { },
      ok: true
    })).mockReturnValueOnce(Promise.resolve({
      json: () => { },
      ok: false
    }));

  it('should invoke fetch with the passed in endpoint and input fields', async () => {
    await submitForm(setError, { username: 'Bob', password: 'password' }, '/login', 'Login failed :/');
    expect(global.fetch).toHaveBeenCalledWith('/login', expect.objectContaining({
      method: 'POST',
      credentials: 'include',
      body: expect.stringMatching(/(?=.*"username":"Bob")(?=.*"password":"password")/)
    }))
  });

  it('should not write an error message if response is ok', () => {
    expect(error).toBe('');
  });


  it('should set an error message when the http response is not ok', async () => {
    await submitForm(setError, { username: 'Bob', password: 'password' }, '/login', 'Login failed :/');
    expect(error).toBe('Login failed :/')
  });

})