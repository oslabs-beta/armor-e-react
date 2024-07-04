interface validationDefaults {
  min?: number,
  max?: number,
  regex?: RegExp,
};

export interface validationDefaultsDictionary {
  getErrorMessage: ((inputType: string, min: number, max: number) => string),
  [index: string]: validationDefaults | ((inputType: string, min: number, max: number) => string),
}

export interface InputProps {
  value: string,
  setValue: (value: string) => void,
  options: boolean | Record<string, any>,
  inputType?: string
  autocomplete?: string,
  showPassword?: boolean
  passwordValue?: string
}


export interface FormProps {
  username?: boolean | Record<string, any>,
  password?: boolean | Record<string, any>,
  email?: boolean | Record<string, any>,
  confirmPassword?: boolean | Record<string, any>,
  phoneNumber?: boolean | Record<string, any>,
  isLogin?: boolean,
}