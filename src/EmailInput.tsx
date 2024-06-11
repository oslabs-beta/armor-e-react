import React from 'react';

interface EmailInputProps {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, onEmailChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={onEmailChange}
        required
      />
    </div>
  );
};

export default EmailInput;