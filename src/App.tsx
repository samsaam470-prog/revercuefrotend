import React, { useState } from 'react';
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
  MoreVertical,
  Download,
  Sparkles,
  ShieldCheck,
  X,
  ArrowRight
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'crm' | 'proposals' | 'contracts' | 'invoices' | 'forms' | 'workflows'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // New Interactive Modals / Drawers State
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [isProposalEditorOpen, setIsProposalEditorOpen] = useState(false);
  const [isFormBuilderOpen, setIsFormBuilderOpen] = useState(false);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);

  // Mock Data states
  const [clients, setClients] = useState([
    { id: 1, name: 'Sarah Jenkins', company: 'Acme Corp', status: 'Active', value: '$12,500', date: '2 hours ago', email: 'sarah@acmecorp.com', phone: '+1 (555) 019-2834' },
    { id: 2, name: 'Marcus Vance', company: 'Nexus Labs', status: 'Proposal Sent', value: '$8,000', date: '1 day ago', email: 'marcus@nexuslabs.io', phone: '+1 (555) 432-8711' },
    { id: 3, name: 'Elena Rostova', company: 'Starlight Media', status: 'Active', value: '$15,400', date: '3 days ago', email: 'elena@starlight.co', phone: '+1 (555) 789-3421' },
    { id: 4, name: 'David Kim', company: 'Apex Digital', status: 'Lead', value: '$5,000', date: '5 days ago', email: 'david@apexdigital.net', phone: '+1 (555) 234-9082' },
  ]);

  const [proposals, setProposals] = useState([
    { id: 1, title: 'Brand Redesign & Web App', client: 'Acme Corp', amount: '$12,500', status: 'Accepted', date: 'Aug 24, 2026' },
    { id: 2, title: 'Growth Marketing Retainer', client: 'Nexus Labs', amount: '$4,500/mo', status: 'Viewed', date: 'Aug 22, 2026' },
    { id: 3, title: 'E-Commerce Checkout Flow', client: 'Starlight Media', amount: '$9,200', status: 'Draft', date: 'Aug 20, 2026' },
  ]);

  const [forms, setForms] = useState([
    { id: 1, title: 'Client Brand Intake Questionnaire', responses: 12, status: 'Published' },
    { id: 2, title: 'Website Audit & Scope Request', responses: 8, status: 'Published' }
  ]);

  const [workflows, setWorkflows] = useState([
    { id: 1, trigger: 'When Proposal is Accepted', action: 'Create Contract & Send Invoice', status: 'Active' },
    { id: 2, trigger: 'When Invoice is Paid', action: 'Create Onboarding Task & Send Welcome Email', status: 'Active' },
  ]);

  // New Proposal Form State
  const [newPropTitle, setNewPropTitle] = useState('');
  const [newPropClient, setNewPropClient] = useState('');
  const [newPropAmount, setNewPropAmount] = useState('');

  // New Form Builder State
  const [newFormTitle, setNewFormTitle] = useState('');
  const [formFields] = useState([ { id: 1, type: 'text', label: 'Company Name' }, { id: 2, type: 'textarea', label: 'Project Goals' } ]);

  // New Workflow State
  const [newTrigger, setNewTrigger] = useState('When Proposal is Accepted');
  const [newAction, setNewAction] = useState('Send Thank You Email');

  const stats = [
    { label: 'Total Revenue', value: '$48,250', change: '+12.4%', isPositive: true, icon: DollarSign },
    { label: 'Active Proposals', value: proposals.length.toString(), change: '+3 this week', isPositive: true, icon: FileText },
    { label: 'Pending Invoices', value: '$8,400', change: '3 overdue', isPositive: false, icon: Clock },
    { label: 'Conversion Rate', value: '68.2%', change: '+5.1%', isPositive: true, icon: TrendingUp },
  ];

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPropTitle || !newPropClient) return;
    setProposals([{ id: Date.now(), title: newPropTitle, client: newPropClient, amount: newPropAmount || '$5,000', status: 'Draft', date: 'Just now' }, ...proposals]);
    setIsProposalEditorOpen(false);
    setNewPropTitle('');
    setNewPropClient('');
    setNewPropAmount('');
  };

  const handleCreateForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFormTitle) return;
    setForms([{ id: Date.now(), title: newFormTitle, responses: 0, status: 'Published' }, ...forms]);
    setIsFormBuilderOpen(false);
    setNewFormTitle('');
  };

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkflows([{ id: Date.now(), trigger: newTrigger, action: newAction, status: 'Active' }, ...workflows]);
    setIsWorkflowModalOpen(false);
  };

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
            { id: 'proposals', label: 'Proposal Builder', icon: FileText },
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

        <div className="p-4 border-t border-slate-800">
          <div className={`flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 ${!sidebarOpen && 'md:justify-center'}`}>
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs border border-indigo-500/30">
              SA
            </div>
            <div className={`overflow-hidden ${!sidebarOpen && 'md:hidden'}`}>
              <p className="text-sm font-semibold truncate text-slate-200">Siddeeq Ali</p>
              <p className="text-xs text-slate-400 truncate">Pro Workspace</p>
            </div>
          </div>
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
              onClick={() => {
                if (activeTab === 'proposals') setIsProposalEditorOpen(true);
                else if (activeTab === 'forms') setIsFormBuilderOpen(true);
                else if (activeTab === 'workflows') setIsWorkflowModalOpen(true);
                else setIsProposalEditorOpen(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New</span>
            </button>
          </div>
        </header>

        {/* Dynamic Workspace */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-950">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back, Siddeeq</h1>
                  <p className="text-sm text-slate-400">Here's what's happening across your client pipeline today.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> All systems operational
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
                    {[
                      { client: 'Acme Corp', action: 'Signed Contract #PROP-2026-01', time: '10 mins ago', status: 'completed' },
                      { client: 'Nexus Labs', action: 'Viewed Proposal v2', time: '1 hour ago', status: 'pending' },
                      { client: 'Starlight Media', action: 'Paid Invoice #INV-8821 ($3,200)', time: '3 hours ago', status: 'completed' },
                      { client: 'Apex Digital', action: 'Completed intake form', time: 'Yesterday', status: 'completed' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800/50 hover:border-slate-700 transition-all">
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <div>
                            <p className="text-sm font-semibold text-white">{item.client}</p>
                            <p className="text-xs text-slate-400">{item.action}</p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-500">{item.time}</span>
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
                          <FileText className="w-4 h-4 text-indigo-400" /> New Proposal
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button onClick={() => setActiveTab('invoices')} className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 hover:bg-indigo-600/10 hover:border-indigo-500/30 border border-slate-700/50 transition-all text-sm font-medium text-slate-200 group">
                        <span className="flex items-center gap-2.5">
                          <Receipt className="w-4 h-4 text-emerald-400" /> Create Invoice
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button onClick={() => setActiveTab('crm')} className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 hover:bg-indigo-600/10 hover:border-indigo-500/30 border border-slate-700/50 transition-all text-sm font-medium text-slate-200 group">
                        <span className="flex items-center gap-2.5">
                          <Users className="w-4 h-4 text-violet-400" /> Add New Client
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

          {activeTab === 'crm' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">CRM & Client Pipeline</h1>
                  <p className="text-sm text-slate-400">Manage client relationships, contact history, and deal stages. Click a client for full timeline.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  <Plus className="w-4 h-4" /> Add Client
                </button>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white">All Clients ({clients.length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="text" placeholder="Filter clients..." className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-950/60 text-xs uppercase text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="px-6 py-4">Client Name</th>
                        <th className="px-6 py-4">Company</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Deal Value</th>
                        <th className="px-6 py-4">Last Contact</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {clients.map((client) => (
                        <tr 
                          key={client.id} 
                          onClick={() => setSelectedClient(client)}
                          className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                        >
                          <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                            {client.name}
                            <ArrowRight className="w-3.5 h-3.5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </td>
                          <td className="px-6 py-4 text-slate-400">{client.company}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              client.status === 'Proposal Sent' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {client.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-white">{client.value}</td>
                          <td className="px-6 py-4 text-slate-400">{client.date}</td>
                          <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setSelectedClient(client)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'proposals' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Proposal Builder</h1>
                  <p className="text-sm text-slate-400">Create high-converting interactive proposals with embedded pricing.</p>
                </div>
                <button 
                  onClick={() => setIsProposalEditorOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" /> Create Proposal
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {proposals.map((prop) => (
                  <div key={prop.id} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                          prop.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          prop.status === 'Viewed' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                          'bg-slate-800 text-slate-400'
                        }`}>
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
                        Edit Proposal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
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

          {activeTab === 'invoices' && (
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
                    { id: 'INV-2026-003', client: 'Starlight Media', amount: '$3,200', status: 'Overdue', date: 'Aug 05, 2026' },
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
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                          inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' :
                          inv.status === 'Pending' ? 'bg-indigo-500/10 text-indigo-400' :
                          'bg-rose-500/10 text-rose-400'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'forms' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Client Intake Form Builder</h1>
                  <p className="text-sm text-slate-400">Design custom forms and questionnaires for seamless client onboarding.</p>
                </div>
                <button 
                  onClick={() => setIsFormBuilderOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" /> New Form
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {forms.map((form) => (
                  <div key={form.id} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {form.status}
                        </span>
                        <span className="text-xs text-slate-400">{form.responses} responses</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{form.title}</h3>
                      <p className="text-xs text-slate-400 mb-4">Embedded form URL ready for client sharing.</p>
                    </div>
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <button onClick={() => setIsFormBuilderOpen(true)} className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">Edit Form Fields</button>
                      <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white">Copy Link</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'workflows' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Workflow Automations</h1>
                  <p className="text-sm text-slate-400">Automate your client lifecycle triggers, task assignments, and follow-ups.</p>
                </div>
                <button 
                  onClick={() => setIsWorkflowModalOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" /> New Automation
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workflows.map((wf) => (
                  <div key={wf.id} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {wf.status}
                      </span>
                      <GitBranch className="w-5 h-5 text-indigo-400" />
                    </div>
                    <p className="text-xs uppercase text-slate-500 font-semibold mb-1">Trigger</p>
                    <p className="text-sm font-bold text-white mb-3">{wf.trigger}</p>
                    <p className="text-xs uppercase text-slate-500 font-semibold mb-1">Action</p>
                    <p className="text-sm font-medium text-indigo-300">{wf.action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- NEW MODALS / INTERACTIVE DRAWERS --- */}

      {/* 1. Client Detail Slide-over Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedClient.name}</h2>
                  <p className="text-sm text-indigo-400">{selectedClient.company}</p>
                </div>
                <button onClick={() => setSelectedClient(null)} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <p className="text-xs font-semibold uppercase text-slate-400">Contact Details</p>
                  <p className="text-sm text-slate-200">Email: <span className="text-indigo-400">{selectedClient.email}</span></p>
                  <p className="text-sm text-slate-200">Phone: <span className="text-slate-300">{selectedClient.phone}</span></p>
                  <p className="text-sm text-slate-200">Active Deal Value: <span className="font-bold text-emerald-400">{selectedClient.value}</span></p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white mb-3">Activity Timeline</h3>
                  <div className="space-y-3 border-l-2 border-indigo-500/30 pl-4 ml-2">
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      <p className="text-xs font-semibold text-white">Proposal Viewed</p>
                      <p className="text-xs text-slate-400">Client opened brand redesign proposal</p>
                      <span className="text-[10px] text-slate-500">2 hours ago</span>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <p className="text-xs font-semibold text-white">Intake Form Completed</p>
                      <p className="text-xs text-slate-400">Submitted requirements questionnaire</p>
                      <span className="text-[10px] text-slate-500">Yesterday</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button onClick={() => setSelectedClient(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-sm font-semibold text-white hover:bg-slate-700">
                Close
              </button>
              <button className="px-4 py-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Proposal Builder Modal */}
      {isProposalEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" /> Create Interactive Proposal
              </h2>
              <button onClick={() => setIsProposalEditorOpen(false)} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProposal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Proposal Title</label>
                <input 
                  type="text" 
                  value={newPropTitle} 
                  onChange={(e) => setNewPropTitle(e.target.value)} 
                  placeholder="e.g., Full Stack Web Application & UI/UX" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Client Name / Company</label>
                  <input 
                    type="text" 
                    value={newPropClient} 
                    onChange={(e) => setNewPropClient(e.target.value)} 
                    placeholder="e.g., Apex Digital" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Total Budget Amount</label>
                  <input 
                    type="text" 
                    value={newPropAmount} 
                    onChange={(e) => setNewPropAmount(e.target.value)} 
                    placeholder="e.g., $10,500" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsProposalEditorOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-sm font-semibold text-white hover:bg-slate-700">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30">
                  Save & Publish Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Form Builder Modal */}
      {isFormBuilderOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FormInput className="w-5 h-5 text-indigo-400" /> Create Client Intake Form
              </h2>
              <button onClick={() => setIsFormBuilderOpen(false)} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateForm} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Form Title</label>
                <input 
                  type="text" 
                  value={newFormTitle} 
                  onChange={(e) => setNewFormTitle(e.target.value)} 
                  placeholder="e.g., Brand & Scope Discovery Questionnaire" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <p className="text-xs font-semibold uppercase text-slate-400">Included Fields</p>
                {formFields.map(field => (
                  <div key={field.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-sm text-white">{field.label}</span>
                    <span className="text-xs text-indigo-400 uppercase">{field.type}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsFormBuilderOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-sm font-semibold text-white hover:bg-slate-700">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30">
                  Save & Publish Form
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Workflow Builder Modal */}
      {isWorkflowModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-indigo-400" /> New Workflow Automation
              </h2>
              <button onClick={() => setIsWorkflowModalOpen(false)} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateWorkflow} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Trigger Event</label>
                <select 
                  value={newTrigger} 
                  onChange={(e) => setNewTrigger(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="When Proposal is Accepted">When Proposal is Accepted</option>
                  <option value="When Invoice is Paid">When Invoice is Paid</option>
                  <option value="When Intake Form is Submitted">When Intake Form is Submitted</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Automated Action</label>
                <select 
                  value={newAction} 
                  onChange={(e) => setNewAction(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Create Contract & Send Invoice">Create Contract & Send Invoice</option>
                  <option value="Create Onboarding Task & Send Welcome Email">Create Onboarding Task & Send Welcome Email</option>
                  <option value="Assign Client to CRM Pipeline">Assign Client to CRM Pipeline</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsWorkflowModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-sm font-semibold text-white hover:bg-slate-700">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30">
                  Enable Automation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
