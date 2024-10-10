import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSucess {
  ok: true;
  user: User;
  token: string;
}

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<RegisterError | RegisterSucess> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo crear el registro de usuario.',
    };
  }
};
