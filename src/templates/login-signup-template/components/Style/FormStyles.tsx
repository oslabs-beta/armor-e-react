// a style tag component to handle the color scheme of the form component without cluttering the 

import React from "react";
import { colors } from "../../types";

const FormStyles: React.FC<{colors: colors}> = ({colors}) => {

  return (
    <style>
        {`
        .auth-form-container {
          background-color: ${colors.primary};
          color: ${colors.text};
        }
        .submit-button {
          background-color: ${colors.secondary};
          color: ${colors.textLight};
          border-color: ${colors.secondaryDark};
        }
        .submit-button:hover {
          background-color: ${colors.secondaryLight};
          border-color: ${colors.secondary};
          }
        .checkbox-container {
          background-color: ${colors.primaryLight};
        }
        .auth-footer {
          background-color: ${colors.primaryDark};
          color: ${colors.text}
        }
        .auth-options {
          accent-color: ${colors.primary};
        }
        `}
      </style>
  )
}

export default FormStyles;