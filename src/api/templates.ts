import { client } from './client';

export const templatesApi = {
  list: (data?: any) => client.get('/api/templates', data),
  get: (data?: any) => client.get('/api/templates', data),
  upload: (data?: any) => client.post('/api/templates/:id', data),
  remove: (data?: any) => client.get('/api/templates/:id', data),
};

