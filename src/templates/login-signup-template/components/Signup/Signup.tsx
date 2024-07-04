import React from "react";
import Form from "../Form/Form";
import type { FormProps } from "../../types";

const Signup: React.FC<FormProps> = ({ username, email, password, confirmPassword, phoneNumber }) => {
  return (
    <Form
      username={username}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      phoneNumber={phoneNumber}
      isLogin={false}
    />
  )
}

export default Signup;