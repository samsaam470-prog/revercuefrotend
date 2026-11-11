import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FileSignature, 
  Receipt, 
  FormInput, 
  GitBranch, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  MoreVertical,
  Download,
  Send,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'crm' | 'proposals' | 'contracts' | 'invoices' | 'forms' | 'workflows'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock stats
  const stats = [
    { label: 'Total Revenue', value: '$48,250', change: '+12.4%', isPositive: true, icon: DollarSign },
    { label: 'Active Proposals', value: '14', change: '+3 this week', isPositive: true, icon: FileText },
    { label: 'Pending Invoices', value: '$8,400', change: '3 overdue', isPositive: false, icon: Clock },
    { label: 'Conversion Rate', value: '68.2%', change: '+5.1%', isPositive: true, icon: TrendingUp },
  ];

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
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all">
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
                    <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300">View all</button>
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
                      <button onClick={() => setActiveTab('proposals')} className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 hover:bg-indigo-600/10 hover:border-indigo-500/30 border border-slate-700/50 transition-all text-sm font-medium text-slate-200 group">
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
                  <p className="text-sm text-slate-400">Manage client relationships, contact history, and deal stages.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  <Plus className="w-4 h-4" /> Add Client
                </button>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white">All Clients (6)</span>
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
                      {[
                        { name: 'Sarah Jenkins', company: 'Acme Corp', status: 'Active', value: '$12,500', date: '2 hours ago' },
                        { name: 'Marcus Vance', company: 'Nexus Labs', status: 'Proposal Sent', value: '$8,000', date: '1 day ago' },
                        { name: 'Elena Rostova', company: 'Starlight Media', status: 'Active', value: '$15,400', date: '3 days ago' },
                        { name: 'David Kim', company: 'Apex Digital', status: 'Lead', value: '$5,000', date: '5 days ago' },
                      ].map((client, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-white">{client.name}</td>
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
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
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
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  <Plus className="w-4 h-4" /> Create Proposal
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Brand Redesign & Web App', client: 'Acme Corp', amount: '$12,500', status: 'Accepted', date: 'Aug 24, 2026' },
                  { title: 'Growth Marketing Retainer', client: 'Nexus Labs', amount: '$4,500/mo', status: 'Viewed', date: 'Aug 22, 2026' },
                  { title: 'E-Commerce Checkout Flow', client: 'Starlight Media', amount: '$9,200', status: 'Draft', date: 'Aug 20, 2026' },
                ].map((prop, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
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
                      <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all">
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
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  <Plus className="w-4 h-4" /> New Form
                </button>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 text-center">
                <FormInput className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No custom forms created yet</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">Build interactive intake forms to capture client requirements and automatically feed them into your CRM pipeline.</p>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  Create First Intake Form
                </button>
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
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  <Plus className="w-4 h-4" /> New Automation
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { trigger: 'When Proposal is Accepted', action: 'Create Contract & Send Invoice', status: 'Active' },
                  { trigger: 'When Invoice is Paid', action: 'Create Onboarding Task & Send Welcome Email', status: 'Active' },
                ].map((wf, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
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
    </div>
  );
}
export default App;
