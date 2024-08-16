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
  secondaryColor,
  title,
  buttonText,
  textColor,
  showInputLabels,
  logoPath,
  alternativeLink
}) => {
  return (
    <Form
      isLogin={true}
      username={username === undefined ? true : username}
      email={email}
      password={password === undefined ? true : password}
      confirmPassword={confirmPassword}
      phoneNumber={phoneNumber}
      validationChecklist={validationChecklist}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      title={title}
      buttonText={buttonText}
      textColor={textColor}
      showInputLabels={showInputLabels}
      logoPath={logoPath}
      alternativeLink={alternativeLink}
    />
  )
}

export default Login;