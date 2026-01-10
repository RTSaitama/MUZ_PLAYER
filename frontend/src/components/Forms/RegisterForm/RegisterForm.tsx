import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const RegisterForm = () => {
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

    try {
      await register(email, password);
      navigate('/playlists');
    } catch (err) {
      console.error('Register error:', err);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h1 className="register-form__title">Register</h1>

      <div className="register-form__group">
        <label htmlFor="email" className="register-form__label">Email:</label>
        <input
          id="email"
          type="email"
          className="register-form__input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="register-form__group">
        <label htmlFor="password" className="register-form__label">Password:</label>
        <input
          id="password"
          type="password"
          className="register-form__input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="register-form__group">
        <label htmlFor="confirm-password" className="register-form__label">Please confirm Password:</label>
        <input
          id="confirm-password"
          type="password"
          className="register-form__input"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {passwordMismatch && (
        <p className="register-form__error">Passwords don`t match</p>
      )}

      {error && <p className="register-form__error">{error}</p>}

      <button 
        type="submit" 
        className="register-form__button"
        disabled={isLoading}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>

      <p className="register-form__link-text">
        Already have account? <a href="#/login" className="register-form__link">Enter</a>
      </p>
    </form>
  );
}