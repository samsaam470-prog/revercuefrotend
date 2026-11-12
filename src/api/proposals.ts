import { client } from './client';

export const proposalsApi = {
  list: (data?: any) => client.get('/api/proposals', data),
  draft: (data?: any) => client.post('/api/proposals/:id', data),
  get: (data?: any) => client.get('/api/proposals', data),
  patch: (data?: any) => client.get('/api/proposals/:id', data),
  autosave: (data?: any) => client.post('/api/proposals/:id', data),
  publish: (data?: any) => client.post('/api/proposals/:id', data),
  duplicate: (data?: any) => client.post('/api/proposals/:id', data),
  archive: (data?: any) => client.post('/api/proposals/:id', data),
  unarchive: (data?: any) => client.post('/api/proposals/:id', data),
  share: (data?: any) => client.post('/api/proposals/:id', data),
  password: (data?: any) => client.post('/api/proposals/:id', data),
  remove: (data?: any) => client.get('/api/proposals/:id', data),
};

