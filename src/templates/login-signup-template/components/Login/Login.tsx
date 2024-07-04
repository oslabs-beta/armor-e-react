import React from "react";
import Form from "../Form/Form";
import type { FormProps } from "../../types";

const Login: React.FC<FormProps> = ({ username, email, password, confirmPassword, phoneNumber }) => {

  return (
    <Form
      username={username}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      phoneNumber={phoneNumber}
      isLogin={true}
    />
  )
}

export default Login;