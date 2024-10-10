import { tesloApi } from '@/api/tesloApi';
import type { User } from '../interfaces/user.interface';
import type { AuthResponse } from '../interfaces/auth.response';
import { isAxiosError } from 'axios';

interface CheckError {
  ok: false;
  message: string;
}

interface CheckSucess {
  ok: true;
  user: User;
  token: string;
}

export const checkAuthAction = async (): Promise<CheckError | CheckSucess> => {
  try {
    const localToken = localStorage.getItem('token');

    if (localToken && localToken.length < 10) {
      return {
        ok: false,
        message: 'Token no válido',
      };
    }

    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Token no válido',
      };
    }

    throw new Error('No se pudo realizar la petición');
  }
};
