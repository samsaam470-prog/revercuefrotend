import { client } from './client';

export const filesApi = {
  get: (data?: any) => client.get('/api/files', data),
  upload: (data?: any) => client.post('/api/files/:id', data),
};

