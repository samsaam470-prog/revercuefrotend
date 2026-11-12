import { client } from './client';

export const settingsApi = {
  profile: (data?: any) => client.get('/api/settings', data),
  updateProfile: (data?: any) => client.get('/api/settings/:id', data),
  plan: (data?: any) => client.get('/api/settings', data),
  upgradeRequest: (data?: any) => client.post('/api/settings/:id', data),
  downgrade: (data?: any) => client.post('/api/settings/:id', data),
  upgradeStatus: (data?: any) => client.get('/api/settings', data),
  security: (data?: any) => client.get('/api/settings/:id', data),
  sessions: (data?: any) => client.get('/api/settings', data),
  logoutAll: (data?: any) => client.post('/api/settings/:id', data),
  notifications: (data?: any) => client.get('/api/settings', data),
  updateNotifications: (data?: any) => client.get('/api/settings/:id', data),
  formsubmitActivate: (data?: any) => client.post('/api/settings/:id', data),
  savedFaqs: (data?: any) => client.get('/api/settings', data),
  savedPackages: (data?: any) => client.get('/api/settings', data),
  revisionPrices: (data?: any) => client.get('/api/settings', data),
  revenue: (data?: any) => client.get('/api/settings', data),
  expenses: (data?: any) => client.post('/api/settings/:id', data),
  priceSuggestion: (data?: any) => client.get('/api/settings/:id', data),
  whatRevercueKnows: (data?: any) => client.get('/api/settings', data),
  deleteAccount: (data?: any) => client.post('/api/settings/:id', data),
  cancelDeletion: (data?: any) => client.post('/api/settings/:id', data),
};

