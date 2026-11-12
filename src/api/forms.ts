import { client } from './client';

export const formsApi = {
  list: (data?: any) => client.get('/api/forms', data),
  draft: (data?: any) => client.post('/api/forms/:id', data),
  get: (data?: any) => client.get('/api/forms', data),
  patch: (data?: any) => client.get('/api/forms/:id', data),
  publish: (data?: any) => client.post('/api/forms/:id', data),
  remove: (data?: any) => client.get('/api/forms/:id', data),
};

