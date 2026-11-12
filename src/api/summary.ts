import { client } from './client';

export const summaryApi = {
  get: (data?: any) => client.get('/api/summary', data),
  schedule: (data?: any) => client.post('/api/summary/:id', data),
  generate: (data?: any) => client.post('/api/summary/:id', data),
};

