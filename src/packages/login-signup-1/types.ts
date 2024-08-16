export type inputType = 'username' | 'password' | 'confirmPassword' | 'email' | 'phoneNumber';

export interface validationObject {
  min?: number,
  max?: number,
  regex?: RegExp,
  errorMessage?: string,
}
export interface InputOptionsObject {
  checkAvailability?: string
  validation?: validationObject
  required?: boolean,
  placeholder?: string,
};

export type InputDefaults = Readonly<{
  [index in inputType]: InputOptionsObject
}>

export interface colors {
  primary: string,
  secondary: string, 
  text: string,
  primaryDark: string,
  secondaryDark: string, 
  textDark: string,
  primaryLight: string,
  secondaryLight: string, 
  textLight: string,
  error: string

}

export interface InputProps {
  value: string,
  setValue: (value: string) => void,
  options: boolean | InputOptionsObject,
  inputType?: inputType
  autocomplete?: string,
  showPassword?: boolean
  passwordValue?: string,
  showLocalError?: boolean,
  colors: colors,
  showLabel?: boolean
};

export interface ChecklistItem {
  condition: string,
  regex?: RegExp,
  min?: number,
  max?: number,
  field: inputType,
  value?: string,
}
export type ValidationChecklist = ChecklistItem[]

export type fieldValues = {
  [index in inputType]: string
}

export interface LinkObject {
  path?: string,
  text?: string
}

export interface FormProps {
  username?: boolean | InputOptionsObject,
  password?: boolean | InputOptionsObject,
  email?: boolean | InputOptionsObject,
  confirmPassword?: boolean | InputOptionsObject,
  phoneNumber?: boolean | InputOptionsObject,
  isLogin?: boolean,
  validationChecklist?: boolean | ValidationChecklist,
  primaryColor?: string,
  secondaryColor?: string,
  title?: string,
  buttonText?: string,
  textColor?: string,
  showInputLabels?: boolean,
  logoPath?: string,
  alternativeLink?: boolean | LinkObject
};