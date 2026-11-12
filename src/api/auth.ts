import { client } from './client';

export const authApi = {
  signup: (data?: any) => client.post('/api/auth/:id', data),
  login: (data?: any) => client.post('/api/auth/:id', data),
  google: (data?: any) => client.post('/api/auth/:id', data),
  verifyEmail: (data?: any) => client.post('/api/auth/:id', data),
  resendVerification: (data?: any) => client.post('/api/auth/:id', data),
  twoFactorVerify: (data?: any) => client.post('/api/auth/:id', data),
  twoFactorResend: (data?: any) => client.post('/api/auth/:id', data),
  passwordResetRequest: (data?: any) => client.post('/api/auth/:id', data),
  passwordResetVerify: (data?: any) => client.post('/api/auth/:id', data),
  logout: (data?: any) => client.get('/api/auth/:id', data),
  me: (data?: any) => client.get('/api/auth', data),
};

