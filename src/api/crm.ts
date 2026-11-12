import { client } from './client';

export const crmApi = {
  list: (data?: any) => client.get('/api/crm', data),
  create: (data?: any) => client.post('/api/crm/:id', data),
  get: (data?: any) => client.get('/api/crm', data),
  patch: (data?: any) => client.get('/api/crm/:id', data),
  remove: (data?: any) => client.get('/api/crm/:id', data),
  archive: (data?: any) => client.post('/api/crm/:id', data),
  notInterested: (data?: any) => client.post('/api/crm/:id', data),
  interest: (data?: any) => client.get('/api/crm/:id', data),
  notes: (data?: any) => client.get('/api/crm', data),
  communication: (data?: any) => client.get('/api/crm/:id', data),
  suggestMessage: (data?: any) => client.post('/api/crm/:id', data),
};

