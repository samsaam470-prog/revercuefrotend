import { client } from './client';

export const invoicesApi = {
  list: (data?: any) => client.get('/api/invoices', data),
  draft: (data?: any) => client.post('/api/invoices/:id', data),
  get: (data?: any) => client.get('/api/invoices', data),
  patch: (data?: any) => client.get('/api/invoices/:id', data),
  publish: (data?: any) => client.post('/api/invoices/:id', data),
  confirmPayment: (data?: any) => client.post('/api/invoices/:id', data),
  remove: (data?: any) => client.get('/api/invoices/:id', data),
};

