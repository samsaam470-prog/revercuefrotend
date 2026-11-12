import { client } from './client';

export const adminApi = {
  login: (data?: any) => client.post('/api/admin/:id', data),
  overview: (data?: any) => client.get('/api/admin', data),
  users: (data?: any) => client.get('/api/admin', data),
  userDetail: (data?: any) => client.get('/api/admin/:id', data),
  changePlan: (data?: any) => client.get('/api/admin/:id', data),
  removeUser: (data?: any) => client.get('/api/admin/:id', data),
  waitlist: (data?: any) => client.get('/api/admin', data),
  beta: (data?: any) => client.get('/api/admin', data),
  contact: (data?: any) => client.get('/api/admin', data),
  websiteHelp: (data?: any) => client.post('/api/admin', data),
  payments: (data?: any) => client.get('/api/admin', data),
  feedback: (data?: any) => client.get('/api/admin', data),
  templates: (data?: any) => client.get('/api/admin', data),
  suggestions: (data?: any) => client.get('/api/admin', data),
  health: (data?: any) => client.get('/api/admin', data),
  notes: (data?: any) => client.get('/api/admin', data),
};

