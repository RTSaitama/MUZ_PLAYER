import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
 
const loginFormSchema = z.object({
  email: z.string().min(4, 'email is required and must contain 4-16symbols').email('Invalid email'),
  password: z.string().min(8, 'Password must contain 8-16 symbols').max(16),
 
});
type loginFormData = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const {register, handleSubmit, formState: {errors} } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: loginFormData) => {
 
    try {
      await login(data.email, data.password);
      navigate('/playlists');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form className="login-form " onSubmit={handleSubmit(onSubmit)}>
      <h1 className="login-form__title">Login</h1>

      <div className="login-form__group">
        <label htmlFor="email" className="login-form__label">Email:</label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className="login-form__input"
           disabled={isLoading}
        />
        {errors.email && <p className="login-form__error">{errors.email.message}</p>}

      </div>

      <div className="login-form__group">
        <label htmlFor="password" className="login-form__label">Password:</label>
        <input
        {...register('password')}
          id="password"
          type="password"
          className="login-form__input"
           disabled={isLoading}
        />
      </div>
      {errors.password && <p className="login-form__error">{errors.password.message}</p>}

      <button 
        type="submit" 
        className="login-form__button"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <p className="login-form__link-text">
        Ще не маєте аккаунту? <NavLink to="/register" className="login-form__link">Реєструйтесь</NavLink>
      </p>
    </form>
  );
}