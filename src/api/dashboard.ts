import { client } from './client';

export const dashboardApi = {
  summary: (data?: any) => client.get('/api/dashboard/:id', data),
  suggestions: (data?: any) => client.get('/api/dashboard', data),
  activity: (data?: any) => client.get('/api/dashboard/:id', data),
};

