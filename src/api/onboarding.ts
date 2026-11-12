import { client } from './client';

export const onboardingApi = {
  step1: (data?: any) => client.get('/api/onboarding/:id', data),
  step2: (data?: any) => client.get('/api/onboarding/:id', data),
  step4: (data?: any) => client.get('/api/onboarding/:id', data),
  step5: (data?: any) => client.get('/api/onboarding/:id', data),
  tutorial: (data?: any) => client.get('/api/onboarding/:id', data),
  websiteHelp: (data?: any) => client.post('/api/onboarding', data),
};

