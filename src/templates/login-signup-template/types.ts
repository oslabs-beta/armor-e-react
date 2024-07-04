export type inputType = 'username' | 'password' | 'confirmPassword' | 'email' | 'phoneNumber';

export interface inputOptions {
  readonly validation?: {
    min?: number,
    max?: number,
    regex?: RegExp,
    errorMessage?: string
  }
  readonly required?: boolean,
  readonly placeholder?: string
};

export type inputDefaults = {
  readonly [index in inputType]: inputOptions
} 

export interface InputProps {
  value: string,
  setValue: (value: string) => void,
  options: boolean | inputOptions,
  inputType?: string
  autocomplete?: string,
  showPassword?: boolean
  passwordValue?: string
};


export interface FormProps {
  username?: boolean | inputOptions,
  password?: boolean | inputOptions,
  email?: boolean | inputOptions,
  confirmPassword?: boolean | inputOptions,
  phoneNumber?: boolean | inputOptions,
  isLogin?: boolean,
};