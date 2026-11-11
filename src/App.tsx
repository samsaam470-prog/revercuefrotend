import React, { useState, createContext, useContext, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FileSignature, 
  Receipt, 
  FormInput, 
  GitBranch, 
  Bell, 
  Search, 
  Plus, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  Download,
  Sparkles,
  ShieldCheck,
  X,
  LogOut,
  Lock,
  Mail,
  User,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { api } from './api';

// --- AUTH CONTEXT & PROVIDER ---
interface AuthContextType {
  user: { name: string; email: string; workspace: string } | null;
  login: (email: string, pass: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; email: string; workspace: string } | null>({
    name: 'Siddeeq Ali',
    email: 'siddeeq@revercue.pro',
    workspace: 'Pro Workspace',
  });

  const login = (email: string) => {
    setUser({ name: 'Siddeeq Ali', email, workspace: 'Pro Workspace' });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// --- MAIN APP COMPONENT ---
export function App() {
  const { user, login, logout } = useAuth();
  const [emailInput, setEmailInput] = useState('siddeeq@revercue.pro');
  const [passInput, setPassInput] = useState('••••••••');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'crm' | 'proposals' | 'contracts' | 'invoices' | 'forms' | 'workflows'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Live API State
  const [clientsList, setClientsList] = useState<any[]>([]);
  const [stats, setStats] = useState([
    { label: 'Total Revenue', value: '$48,250', change: '+12.4%', isPositive: true, icon: DollarSign },
    { label: 'Active Proposals', value: '14', change: '+3 this week', isPositive: true, icon: FileText },
    { label: 'Pending Invoices', value: '$8,400', change: '3 overdue', isPositive: false, icon: Clock },
    { label: 'Conversion Rate', value: '68.2%', change: '+5.1%', isPositive: true, icon: TrendingUp },
  ]);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // Modals / Drawers State
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [isProposalEditorOpen, setIsProposalEditorOpen] = useState(false);
  const [proposalTitle, setProposalTitle] = useState('Website Redesign & Brand Identity');
  const [proposalItems, setProposalItems] = useState([
    { name: 'UX/UI Wireframing & Discovery', price: 2500 },
    { name: 'React Frontend Development', price: 6500 },
    { name: 'Brand Guide & Asset Kit', price: 3500 },
  ]);

  const [isFormBuilderOpen, setIsFormBuilderOpen] = useState(false);
  const [formFields, setFormFields] = useState([
    { id: 1, type: 'text', label: 'Company Name', required: true },
    { id: 2, type: 'select', label: 'Project Budget', required: true },
    { id: 3, type: 'textarea', label: 'Project Scope & Requirements', required: false },
  ]);

  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [workflowTrigger, setWorkflowTrigger] = useState('Proposal Accepted');
  const [workflowAction, setWorkflowAction] = useState('Generate Contract & Send Invoice');

  // Fetch initial data via API client on mount
  useEffect(() => {
    if (user) {
      setIsLoadingApi(true);
      // Simulate live API fetch using api service
      setTimeout(() => {
        setClientsList([
          { id: 1, name: 'Sarah Jenkins', company: 'Acme Corp', email: 'sarah@acmeproj.com', status: 'Active', value: '$12,500', date: '2 hours ago', history: ['Signed MSA Agreement', 'Paid Invoice #INV-001', 'Completed Discovery Call'] },
          { id: 2, name: 'Marcus Vance', company: 'Nexus Labs', email: 'marcus@nexuslabs.io', status: 'Proposal Sent', value: '$8,000', date: '1 day ago', history: ['Viewed Proposal v2', 'Requested custom timeline'] },
          { id: 3, name: 'Elena Rostova', company: 'Starlight Media', email: 'elena@starlight.co', status: 'Active', value: '$15,400', date: '3 days ago', history: ['Paid Invoice #INV-8821', 'Approved design mockups'] },
          { id: 4, name: 'David Kim', company: 'Apex Digital', email: 'david@apexdigital.net', status: 'Lead', value: '$5,000', date: '5 days ago', history: ['Submitted intake questionnaire'] },
        ]);
        setIsLoadingApi(false);
      }, 400);
    }
  }, [user]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      login(emailInput);
      setIsLoggingIn(false);
    }, 600);
  };

  if (!user) {
    return (
      <div className="flex h-screen bg-slate-950 items-center justify-center p-4 font-sans text-slate-100">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">Revercue Sign In</h1>
              <p className="text-xs text-slate-400">Agency & Freelance Operations Platform</p>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoggingIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Sign In to Workspace</span>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'}`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className={`font-bold text-xl tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent ${!sidebarOpen && 'md:hidden'}`}>
            Revercue
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'crm', label: 'CRM & Clients', icon: Users },
            { id: 'proposals', label: 'Proposals', icon: FileText },
            { id: 'contracts', label: 'Contracts', icon: FileSignature },
            { id: 'invoices', label: 'Invoices', icon: Receipt },
            { id: 'forms', label: 'Form Builder', icon: FormInput },
            { id: 'workflows', label: 'Workflows', icon: GitBranch },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span className={`${!sidebarOpen && 'md:hidden'}`}>{item.label}</span>
                {isActive && <div className="absolute right-2 w-1.5 h-5 rounded-full bg-indigo-500" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div className={`flex items-center gap-3 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 ${!sidebarOpen && 'md:hidden'}`}>
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs border border-indigo-500/30">
              SA
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold truncate text-slate-200">{user.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={logout} title="Sign Out" className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search clients, proposals, invoices..." 
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50 transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            </button>
            <button 
              onClick={() => setIsProposalEditorOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New</span>
            </button>
          </div>
        </header>

        {/* Dynamic Workspace */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-950">
          {isLoadingApi && (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
            </div>
          )}

          {!isLoadingApi && activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back, Siddeeq</h1>
                  <p className="text-sm text-slate-400">Here's what's happening across your client pipeline today.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> API Connected
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-slate-400">{stat.label}</span>
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Activity & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">Recent Client Activity</h2>
                    <button onClick={() => setActiveTab('crm')} className="text-xs font-medium text-indigo-400 hover:text-indigo-300">View all</button>
                  </div>
                  <div className="space-y-4">
                    {clientsList.map((client, i) => (
                      <div key={i} onClick={() => setSelectedClient(client)} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800/50 hover:border-indigo-500/40 cursor-pointer transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <div>
                            <p className="text-sm font-semibold text-white">{client.name} <span className="text-xs text-slate-400 font-normal">({client.company})</span></p>
                            <p className="text-xs text-slate-400">Latest: {client.history[0]}</p>
                          </div>
                        </div>
                        <span className="text-xs text-indigo-400 font-medium">View Profile &rarr;</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-2">Quick Actions</h2>
                    <p className="text-xs text-slate-400 mb-6">Frequently used tools for your agency workflow.</p>
                    <div className="space-y-3">
                      <button onClick={() => setIsProposalEditorOpen(true)} className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 hover:bg-indigo-600/10 hover:border-indigo-500/30 border border-slate-700/50 transition-all text-sm font-medium text-slate-200 group">
                        <span className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-indigo-400" /> New Proposal Builder
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button onClick={() => setIsFormBuilderOpen(true)} className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 hover:bg-indigo-600/10 hover:border-indigo-500/30 border border-slate-700/50 transition-all text-sm font-medium text-slate-200 group">
                        <span className="flex items-center gap-2.5">
                          <FormInput className="w-4 h-4 text-emerald-400" /> Intake Form Builder
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button onClick={() => setIsWorkflowModalOpen(true)} className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 hover:bg-indigo-600/10 hover:border-indigo-500/30 border border-slate-700/50 transition-all text-sm font-medium text-slate-200 group">
                        <span className="flex items-center gap-2.5">
                          <GitBranch className="w-4 h-4 text-violet-400" /> Workflow Automation Canvas
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-indigo-900/20 to-violet-900/20 border border-indigo-500/20">
                    <p className="text-xs font-semibold text-indigo-300 mb-1">Revercue AI Assistant</p>
                    <p className="text-xs text-slate-400 mb-3">Your contract clauses are fully optimized for local regulations.</p>
                    <button className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-all">
                      Ask AI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isLoadingApi && activeTab === 'crm' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">CRM & Client Pipeline</h1>
                  <p className="text-sm text-slate-400">Click any client row to open their complete activity history and documents.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  <Plus className="w-4 h-4" /> Add Client
                </button>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">All Clients ({clientsList.length})</span>
                  <input type="text" placeholder="Filter clients..." className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200" />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-950/60 text-xs uppercase text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="px-6 py-4">Client Name</th>
                        <th className="px-6 py-4">Company</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Deal Value</th>
                        <th className="px-6 py-4">Last Activity</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {clientsList.map((client) => (
                        <tr key={client.id} onClick={() => setSelectedClient(client)} className="hover:bg-slate-800/40 cursor-pointer transition-colors">
                          <td className="px-6 py-4 font-medium text-white">{client.name}</td>
                          <td className="px-6 py-4 text-slate-400">{client.company}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                              {client.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-white">{client.value}</td>
                          <td className="px-6 py-4 text-slate-400">{client.date}</td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">View Profile</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {!isLoadingApi && activeTab === 'proposals' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Proposal Builder</h1>
                  <p className="text-sm text-slate-400">Create high-converting interactive proposals with embedded pricing.</p>
                </div>
                <button onClick={() => setIsProposalEditorOpen(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  <Plus className="w-4 h-4" /> Create Proposal
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: proposalTitle, client: 'Acme Corp', amount: '$12,500', status: 'Accepted', date: 'Aug 24, 2026' },
                  { title: 'Growth Marketing Retainer', client: 'Nexus Labs', amount: '$4,500/mo', status: 'Viewed', date: 'Aug 22, 2026' },
                  { title: 'E-Commerce Checkout Flow', client: 'Starlight Media', amount: '$9,200', status: 'Draft', date: 'Aug 20, 2026' },
                ].map((prop, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {prop.status}
                        </span>
                        <span className="text-xs text-slate-500">{prop.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{prop.title}</h3>
                      <p className="text-sm text-slate-400 mb-4">Client: {prop.client}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-lg font-bold text-indigo-400">{prop.amount}</span>
                      <button onClick={() => setIsProposalEditorOpen(true)} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all">
                        Open Editor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoadingApi && activeTab === 'contracts' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Contract Builder & E-Signatures</h1>
                  <p className="text-sm text-slate-400">Generate legally binding agreements with automated variable injection.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  <Plus className="w-4 h-4" /> New Contract
                </button>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
                <div className="space-y-4">
                  {[
                    { title: 'Master Services Agreement (MSA)', client: 'Acme Corp', status: 'Signed', date: 'Aug 24, 2026' },
                    { title: 'Independent Contractor Agreement', client: 'Nexus Labs', status: 'Pending Signature', date: 'Aug 22, 2026' },
                  ].map((contract, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800/50">
                      <div>
                        <h4 className="text-sm font-semibold text-white">{contract.title}</h4>
                        <p className="text-xs text-slate-400">Client: {contract.client} • Created {contract.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${contract.status === 'Signed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {contract.status}
                        </span>
                        <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!isLoadingApi && activeTab === 'invoices' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Invoices & Payments</h1>
                  <p className="text-sm text-slate-400">Track paid and pending invoices with automated payment links.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  <Plus className="w-4 h-4" /> Create Invoice
                </button>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
                <div className="space-y-4">
                  {[
                    { id: 'INV-2026-001', client: 'Acme Corp', amount: '$6,250', status: 'Paid', date: 'Aug 24, 2026' },
                    { id: 'INV-2026-002', client: 'Nexus Labs', amount: '$4,000', status: 'Pending', date: 'Aug 18, 2026' },
                  ].map((inv, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800/50">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{inv.id}</span>
                          <span className="text-xs text-slate-400">• {inv.client}</span>
                        </div>
                        <p className="text-xs text-slate-500">Issued on {inv.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-white">{inv.amount}</span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400">
                          {inv.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!isLoadingApi && activeTab === 'forms' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Client Intake Form Builder</h1>
                  <p className="text-sm text-slate-400">Design custom forms and questionnaires for seamless client onboarding.</p>
                </div>
                <button onClick={() => setIsFormBuilderOpen(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  <Plus className="w-4 h-4" /> Open Form Builder
                </button>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Active Intake Questionnaire</h3>
                  <button onClick={() => setIsFormBuilderOpen(true)} className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">Edit Form Blocks</button>
                </div>
                <div className="space-y-3">
                  {formFields.map((field) => (
                    <div key={field.id} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{field.label} <span className="text-xs text-slate-500">({field.type})</span></span>
                      <span className="text-xs text-indigo-400">{field.required ? 'Required' : 'Optional'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!isLoadingApi && activeTab === 'workflows' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Workflow Automations</h1>
                  <p className="text-sm text-slate-400">Automate your client lifecycle triggers, task assignments, and follow-ups.</p>
                </div>
                <button onClick={() => setIsWorkflowModalOpen(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  <Plus className="w-4 h-4" /> New Automation Canvas
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                    <GitBranch className="w-5 h-5 text-indigo-400" />
                  </div>
                  <p className="text-xs uppercase text-slate-500 font-semibold mb-1">Trigger</p>
                  <p className="text-sm font-bold text-white mb-3">{workflowTrigger}</p>
                  <p className="text-xs uppercase text-slate-500 font-semibold mb-1">Action</p>
                  <p className="text-sm font-medium text-indigo-300">{workflowAction}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- MODALS & DRAWERS --- */}

      {/* 1. Client Detail Slide-Over Drawer */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedClient.name}</h2>
                  <p className="text-xs text-slate-400">{selectedClient.company} • {selectedClient.email}</p>
                </div>
                <button onClick={() => setSelectedClient(null)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-xs uppercase text-slate-500 font-semibold mb-1">Deal Pipeline Value</p>
                  <p className="text-2xl font-bold text-indigo-400">{selectedClient.value}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Activity Timeline</h4>
                  <div className="space-y-3">
                    {selectedClient.history.map((h: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-slate-300 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1" />
                        <div>
                          <p className="font-medium text-white">{h}</p>
                          <span className="text-slate-500">{selectedClient.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center gap-3">
              <button onClick={() => setSelectedClient(null)} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-all">
                Send Message / Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Proposal & Contract Block Editor Modal */}
      {isProposalEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-lg font-bold text-white">Interactive Proposal & Contract Editor</h2>
              <button onClick={() => setIsProposalEditorOpen(false)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1 block">Proposal Title</label>
                <input 
                  type="text" 
                  value={proposalTitle} 
                  onChange={(e) => setProposalTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium mb-1 block">Scope & Pricing Items</label>
                <div className="space-y-2">
                  {proposalItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="flex-1 text-sm text-slate-200">{item.name}</span>
                      <span className="text-sm font-bold text-indigo-400">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button onClick={() => setIsProposalEditorOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-slate-300">
                Cancel
              </button>
              <button onClick={() => setIsProposalEditorOpen(false)} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white">
                Save & Publish Proposal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Form Builder Modal */}
      {isFormBuilderOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-lg font-bold text-white">Client Intake Form Builder</h2>
              <button onClick={() => setIsFormBuilderOpen(false)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {formFields.map((f, idx) => (
                <div key={f.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{idx + 1}. {f.label} ({f.type})</span>
                  <button onClick={() => setFormFields(formFields.filter(x => x.id !== f.id))} className="text-rose-400 hover:text-rose-300 text-xs">Remove</button>
                </div>
              ))}
              <button 
                onClick={() => setFormFields([...formFields, { id: Date.now(), type: 'text', label: 'New Custom Question', required: false }])}
                className="w-full py-2.5 rounded-xl border border-dashed border-slate-700 text-indigo-400 text-xs font-semibold hover:border-indigo-500 transition-all"
              >
                + Add Form Field
              </button>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button onClick={() => setIsFormBuilderOpen(false)} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white">
                Save Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Workflow Automation Canvas Modal */}
      {isWorkflowModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-lg font-bold text-white">Workflow Automation Canvas</h2>
              <button onClick={() => setIsWorkflowModalOpen(false)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1 block">Trigger Event</label>
                <select 
                  value={workflowTrigger} 
                  onChange={(e) => setWorkflowTrigger(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                >
                  <option value="Proposal Accepted">When Proposal is Accepted</option>
                  <option value="Invoice Paid">When Invoice is Paid</option>
                  <option value="Form Submitted">When Intake Form is Submitted</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium mb-1 block">Automated Action</label>
                <select 
                  value={workflowAction} 
                  onChange={(e) => setWorkflowAction(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                >
                  <option value="Generate Contract & Send Invoice">Generate Contract & Send Invoice</option>
                  <option value="Create Onboarding Task & Send Welcome Email">Create Onboarding Task & Send Welcome Email</option>
                  <option value="Assign CRM Deal Stage to Won">Assign CRM Deal Stage to Won</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button onClick={() => setIsWorkflowModalOpen(false)} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white">
                Activate Workflow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
