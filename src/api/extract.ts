import { client } from './client';

export const extractApi = {
  run: (data?: any) => client.post('/api/extract/:id', data),
  visuals: (data?: any) => client.get('/api/extract/:id', data),
};

