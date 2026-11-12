const fs = require('fs');
const path = require('path');

const apiModules = [
  { name: 'auth', base: '/api/auth', funcs: ['signup', 'login', 'google', 'verifyEmail', 'resendVerification', 'twoFactorVerify', 'twoFactorResend', 'passwordResetRequest', 'passwordResetVerify', 'logout', 'me'] },
  { name: 'onboarding', base: '/api/onboarding', funcs: ['step1', 'step2', 'step4', 'step5', 'tutorial', 'websiteHelp'] },
  { name: 'dashboard', base: '/api/dashboard', funcs: ['summary', 'suggestions', 'activity'] },
  { name: 'proposals', base: '/api/proposals', funcs: ['list', 'draft', 'get', 'patch', 'autosave', 'publish', 'duplicate', 'archive', 'unarchive', 'share', 'password', 'remove'] },
  { name: 'contracts', base: '/api/contracts', funcs: ['list', 'draft', 'get', 'patch', 'publish', 'remove'] },
  { name: 'forms', base: '/api/forms', funcs: ['list', 'draft', 'get', 'patch', 'publish', 'remove'] },
  { name: 'invoices', base: '/api/invoices', funcs: ['list', 'draft', 'get', 'patch', 'publish', 'confirmPayment', 'remove'] },
  { name: 'public', base: '/api/public', funcs: ['proposal', 'unlockProposal', 'events', 'question', 'contract', 'contractAction', 'invoice', 'buyNow', 'proof', 'form', 'submit', 'close', 'pdf'] },
  { name: 'files', base: '/api/files', funcs: ['get', 'upload'] },
  { name: 'crm', base: '/api/crm', funcs: ['list', 'create', 'get', 'patch', 'remove', 'archive', 'notInterested', 'interest', 'notes', 'communication', 'suggestMessage'] },
  { name: 'settings', base: '/api/settings', funcs: ['profile', 'updateProfile', 'plan', 'upgradeRequest', 'downgrade', 'upgradeStatus', 'security', 'sessions', 'logoutAll', 'notifications', 'updateNotifications', 'formsubmitActivate', 'savedFaqs', 'savedPackages', 'revisionPrices', 'revenue', 'expenses', 'priceSuggestion', 'whatRevercueKnows', 'deleteAccount', 'cancelDeletion'] },
  { name: 'notifications', base: '/api/notifications', funcs: ['list', 'unreadCount', 'read', 'readAll', 'dismiss'] },
  { name: 'templates', base: '/api/templates', funcs: ['list', 'get', 'upload', 'remove'] },
  { name: 'admin', base: '/api/admin', funcs: ['login', 'overview', 'users', 'userDetail', 'changePlan', 'removeUser', 'waitlist', 'beta', 'contact', 'websiteHelp', 'payments', 'feedback', 'templates', 'suggestions', 'health', 'notes'] },
  { name: 'extract', base: '/api/extract', funcs: ['run', 'visuals'] },
  { name: 'organize', base: '/api/organize', funcs: ['run', 'visuals'] },
  { name: 'summary', base: '/api/summary', funcs: ['get', 'schedule', 'generate'] },
];

const postFuncs = new Set([
  'signup', 'login', 'google', 'passwordResetRequest', 'websiteHelp', 'draft', 'autosave', 'publish', 'duplicate', 'archive', 'unarchive', 'share', 'password', 'confirmPayment', 'contractAction', 'buyNow', 'proof', 'submit', 'close', 'create', 'notInterested', 'suggestMessage', 'upgradeRequest', 'downgrade', 'logoutAll', 'formsubmitActivate', 'expenses', 'deleteAccount', 'cancelDeletion', 'upload', 'run', 'schedule', 'generate'
]);

const noPathFuncs = new Set([
  'list', 'get', 'profile', 'plan', 'notifications', 'unreadCount', 'sessions', 'revenue', 'whatRevercueKnows', 'overview', 'users', 'waitlist', 'beta', 'contact', 'websiteHelp', 'payments', 'feedback', 'templates', 'suggestions', 'health', 'notes', 'savedFaqs', 'savedPackages', 'revisionPrices', 'upgradeStatus'
]);

function apiModuleCode(m) {
  const body = m.funcs.map((f) => {
    const method = postFuncs.has(f) ? 'post' : 'get';
    const pathArg = noPathFuncs.has(f) ? '' : '/:id';
    return `  ${f}: (data?: any) => client.${method}('${m.base}${pathArg}', data),`;
  }).join('\n');
  return `import { client } from './client';\n\nexport const ${m.name}Api = {\n${body}\n};\n`;
}

for (const m of apiModules) {
  fs.mkdirSync('src/api', { recursive: true });
  fs.writeFileSync(`src/api/${m.name}.ts`, apiModuleCode(m));
  console.log('  src/api/' + m.name + '.ts');
}

console.log('Phase 2 generated.');
