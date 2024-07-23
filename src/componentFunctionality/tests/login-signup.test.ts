//IGNORE THIS FILE FOR NOW. TESTING NOT COMPLETE
const { submitForm } = require('../loginFunctions');
let error: string = '';
const setError = (errorMessage: string): void => {
  error = errorMessage;
}

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