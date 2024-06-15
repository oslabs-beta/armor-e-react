import React from 'react';

interface UsernameInputProps {
  username: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ username, onUsernameChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={onUsernameChange}
        required
      />
    </div>
  );
};

export default UsernameInput;
