import React from 'react';

interface PasswordInputProps {
  password: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ password, onPasswordChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
        required
      />
    </div>
  );
};

export default PasswordInput;
