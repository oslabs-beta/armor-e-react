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
  logoPath,
  alternativeLink
}) => {
  return (
    <Form
      isLogin={false}
      username={username === undefined ? true : username}
      email={email}
      password={password === undefined ? true : password}
      confirmPassword={confirmPassword === undefined ? true : confirmPassword}
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

export default Signup;