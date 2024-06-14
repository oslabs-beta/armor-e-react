import React, { useState, FormEvent } from 'react';
import './App.css';
import UsernameInput from './UsernameInput';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import ErrorMessage from './ErrorMessage';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Add your authentication logic here
    if (username === 'user' && password === 'password') {
      alert('Login successful');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <UsernameInput username={username} onUsernameChange={(e) => setUsername(e.target.value)} />
        <EmailInput email={email} onEmailChange={(e) => setEmail(e.target.value)} />
        <PasswordInput password={password} onPasswordChange={(e) => setPassword(e.target.value)} />
        <ErrorMessage message={errorMessage} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default App;


