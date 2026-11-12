import { client } from './client';

export const organizeApi = {
  run: (data?: any) => client.post('/api/organize/:id', data),
  visuals: (data?: any) => client.get('/api/organize/:id', data),
};

