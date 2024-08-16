import React from "react";
import Form from "../Form/Form";
import type { FormProps } from "../../types";

const Login: React.FC<FormProps> = ({ 
  username,
  email, 
  password, 
  confirmPassword, 
  phoneNumber, 
  validationChecklist,
  primaryColor,
  secondaryColor
}) => {

  return (
    <Form
      username={username}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      phoneNumber={phoneNumber}
      isLogin={true}
      validationChecklist={validationChecklist}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  )
}

export default Login;