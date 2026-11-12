import { client } from './client';

export const contractsApi = {
  list: (data?: any) => client.get('/api/contracts', data),
  draft: (data?: any) => client.post('/api/contracts/:id', data),
  get: (data?: any) => client.get('/api/contracts', data),
  patch: (data?: any) => client.get('/api/contracts/:id', data),
  publish: (data?: any) => client.post('/api/contracts/:id', data),
  remove: (data?: any) => client.get('/api/contracts/:id', data),
};

