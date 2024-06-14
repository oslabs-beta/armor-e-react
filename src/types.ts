interface validationDefaults {
  min?: number,
  max?: number,
  regex?: RegExp,
  errorMessage: string 
};

export interface validationDefaultsDictionary {
  [index: string]: validationDefaults
}
