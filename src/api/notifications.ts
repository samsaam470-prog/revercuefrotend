import { client } from './client';

export const notificationsApi = {
  list: (data?: any) => client.get('/api/notifications', data),
  unreadCount: (data?: any) => client.get('/api/notifications', data),
  read: (data?: any) => client.get('/api/notifications/:id', data),
  readAll: (data?: any) => client.get('/api/notifications/:id', data),
  dismiss: (data?: any) => client.get('/api/notifications/:id', data),
};

