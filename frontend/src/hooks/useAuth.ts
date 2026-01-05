import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from '../redux/apis/authApi';
import { authSlice } from '@/redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const [registerMutation, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const isLoading = isRegisterLoading || isLoginLoading || isLogoutLoading;

  const register = async (email: string, password: string) => {
    try {
      const response = await registerMutation({ email, password }).unwrap();
      dispatch(authSlice.actions.setCredentials({
        user: response.user,
        accessToken: response.accessToken
      }));
      return response;
    } catch (error) {
      dispatch(authSlice.actions.setError('Registration failed'));
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await loginMutation({ email, password }).unwrap();
      dispatch(authSlice.actions.setCredentials({
        user: response.user,
        accessToken: response.accessToken
      }));
      return response;
    } catch (error) {
      dispatch(authSlice.actions.setError('Login failed'));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(authSlice.actions.clearAuth());
    } catch (error) {
      console.error('Logout failed:', error);
      dispatch(authSlice.actions.clearAuth());
    }
  };

  return {
    ...authState,
    isLoading,
    register,
    login,
    logout
  };
};