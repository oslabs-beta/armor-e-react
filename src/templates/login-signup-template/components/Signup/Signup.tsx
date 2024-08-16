import React from "react";
import Form from "../Form/Form";
import type { FormProps } from "../../types";

const Signup: React.FC<FormProps> = ({ 
  username, 
  email, 
  password, 
  confirmPassword, 
  phoneNumber,
  validationChecklist,
  primaryColor,
  secondaryColor,
  title,
  buttonText,
  textColor,
  showInputLabels,
  logoPath
}) => {
  return (
    <Form
      username={username}
      email={email}
      password={password}
      confirmPassword={confirmPassword === undefined ? true : confirmPassword}
      phoneNumber={phoneNumber}
      isLogin={false}
      validationChecklist={validationChecklist}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      title={title}
      buttonText={buttonText}
      textColor={textColor}
      showInputLabels={showInputLabels}
      logoPath={logoPath}
    />
  )
}

export default Signup;