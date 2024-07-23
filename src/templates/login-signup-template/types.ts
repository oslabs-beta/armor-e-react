export type inputType = 'username' | 'password' | 'confirmPassword' | 'email' | 'phoneNumber';

export interface validationObject {
  min?: number,
  max?: number,
  regex?: RegExp,
  errorMessage?: string
}
export interface InputOptionsObject {
  validation?: validationObject
  required?: boolean,
  placeholder?: string,
};

export type InputDefaults = Readonly<{
  [index in inputType]: InputOptionsObject
}>

export interface InputProps {
  value: string,
  setValue: (value: string) => void,
  options: boolean | InputOptionsObject,
  inputType?: inputType
  autocomplete?: string,
  showPassword?: boolean
  passwordValue?: string
};

export interface ChecklistItem {
  condition: string,
  regex?: RegExp,
  min?: number,
  max?: number,
  isFulfilled: boolean
}
export type ValidationChecklist = {
  [index in inputType]?: ChecklistItem[]
}

export interface FormProps {
  username?: boolean | InputOptionsObject,
  password?: boolean | InputOptionsObject,
  email?: boolean | InputOptionsObject,
  confirmPassword?: boolean | InputOptionsObject,
  phoneNumber?: boolean | InputOptionsObject,
  isLogin?: boolean,
  validationChecklist?: boolean | ValidationChecklist
};