import { client } from './client';

export const publicApi = {
  proposal: (data?: any) => client.get('/api/public/:id', data),
  unlockProposal: (data?: any) => client.get('/api/public/:id', data),
  events: (data?: any) => client.get('/api/public/:id', data),
  question: (data?: any) => client.get('/api/public/:id', data),
  contract: (data?: any) => client.get('/api/public/:id', data),
  contractAction: (data?: any) => client.post('/api/public/:id', data),
  invoice: (data?: any) => client.get('/api/public/:id', data),
  buyNow: (data?: any) => client.post('/api/public/:id', data),
  proof: (data?: any) => client.post('/api/public/:id', data),
  form: (data?: any) => client.get('/api/public/:id', data),
  submit: (data?: any) => client.post('/api/public/:id', data),
  close: (data?: any) => client.post('/api/public/:id', data),
  pdf: (data?: any) => client.get('/api/public/:id', data),
};

