 import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const registerFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(8, 'Password must contain 8-16 symbols').max(16),
  confirmPassword: z.string().min(8).max(16),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

type registerFormData = z.infer<typeof registerFormSchema>;

export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<registerFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const { register: authRegister, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: registerFormData) => {
    try {
      await authRegister(data.email, data.password);
      navigate('/playlists');
    } catch (err) {
      console.error('Register error:', err);
    }
  };

  return (
    <form className="register-form " onSubmit={handleSubmit(onSubmit)}>
      <h1 className="register-form__title">Register</h1>

      <div className="register-form__group">
        <label htmlFor="email" className="register-form__label">Email:</label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className="register-form__input"
          disabled={isLoading}
        />
        {errors.email && <p className="register-form__error">{errors.email.message}</p>}
      </div>

      <div className="register-form__group">
        <label htmlFor="password" className="register-form__label">Password:</label>
        <input
          {...register('password')}
          id="password"
          type="password"
          className="register-form__input"
          disabled={isLoading}
        />
        {errors.password && <p className="register-form__error">{errors.password.message}</p>}
      </div>

      <div className="register-form__group">
        <label htmlFor="confirmPassword" className="register-form__label">Confirm Password:</label>
        <input
          {...register('confirmPassword')}
          id="confirmPassword"
          type="password"
          className="register-form__input"
          disabled={isLoading}
        />
        {errors.confirmPassword && <p className="register-form__error">{errors.confirmPassword.message}</p>}
      </div>

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