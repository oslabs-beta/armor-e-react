## Table of contents
* [Introduction](#introduction)
* [Login and signup options](#login-and-signup-options)
  * [Options.[inputField]](#optionsinputfield)
  * [Options.inputField.[options]](#optionsinputfieldoptions)
  * [Options.inputField.validation.[options]](#optionsinputfieldvalidationoptions)
  * [Options.[button]](#button-options)


## Introduction
The functionality of each Armor-E React component is enabled and configured by passing an object prop, options, to that component. The components are rendered with a default set of input fields and buttons, which can be added and removed by configuring the corresponding properties in options.

## Login and signup options
Login and signup components can be configured to handle input validation, post requests, [@TODO: password breach protection, email verification, phone number verification, and ]. Each renderable input field can be enabled or disabled by setting the corresponding property to a boolean value. Assigning a field name to true renders the component without any additional functionality. Fields are required by default. To configure the functionality for a given input field, use the configuration object in place of a boolean.

### Options.[inputField] 
**(boolean | Object)**

Valid input fields [@TODO and their default behaviors]: 

* **Options.username** - Enabled by default in both the log in and sign up components.
* **Options.email** - Enabled by default in both the log in and sign up components.
* **Options.password** - Enabled by default in both the log in and sign up components.
* **Options.confirmPassword** - Enabled by default in only the sign up components.
* **Options.phoneNumber** - Disabled by default. 

[@TODO
 * **Options.name** - Disabled by default. 
* **Options.firstName** - Disabled by default. 
* **Options.lastName** - Disabled by default. 
]


### Options.inputField.[options]

* **required (boolean)** - Input fields are all required by default. Set to false to disable
* **placeholder (string)** - Specifies placeholder text for the input field

### Options.inputField.validation.[options]

* **min (number)** - The minimum number of characters for the field
* **max (number)** - The maximum number of characters for the field
* **regex (RegExp)** - A regular expression that the field must match
* **errorMessage (string)** - A message to display when validation fails

### Options.[button]
Both log in and sign up components come with a submit button rendered by default. Set submitButton to false to disable. This button will submit a post request to your server if the submit option is enabled. [@TODO If password breach protection is enabled, it will send the password to the haveibeenpwned API before submitting the form data to your server.] [@TODO Oauth buttons can be enabled by ...]

### Options.submit
**(string)** - Set this to the endpoint that handles your login or signup form submission. This enables the execution of submission functionality when submitButton is clicked. First, each input field is validated. Then, if validation passes, every non-empty input field is submitted in the body of a POST request to the specified endpoint. 

### Example code snippet

```Javascript
import React from 'react';
import SignUp4 from '@armor-e/signUp4';

const Signup = () => {
  const options = {
    email: false,
    username: {
      placeholder: 'This text will show in the username input field',
      validation: {
        min: 5,
        regex: /^[A-Za-z]+$/,
        errorMessage: 'Username must be between 5 and 20 characters and contain only letters';
      }
    },
    submit: '/login'
  }
  return (
    <signUp4 options={options}/>
  )
}
```
<!-- * **displayRules (string[])** -  Optionally display the validation rules to the end user -->




