import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
 export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(email, password);
      navigate('/playlists');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
  <h1 className="login-form__title">Login</h1>

  <div className="login-form__group">
    <label htmlFor="email" className="login-form__label">Email:</label>
    <input
      id="email"
      type="email"
      className="login-form__input"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      required
      disabled={isLoading}
    />
  </div>

  <div className="login-form__group">
    <label htmlFor="password" className="login-form__label">Password:</label>
    <input
      id="password"
      type="password"
      className="login-form__input"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      required
      disabled={isLoading}
    />
  </div>

  {error && <p className="login-form__error">{error}</p>}

  <button 
    type="submit" 
    className="login-form__button"
    disabled={isLoading}
  >
    {isLoading ? 'Logging in...' : 'Login'}
  </button>
</form>
  );
}