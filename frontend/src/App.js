import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FileText, BarChart3, Database, MessageSquare, LayoutDashboard } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import Dashboard from './pages/Dashboard';
import DocumentUpload from './pages/DocumentUpload';
import DocumentManagement from './pages/DocumentManagement';
import RAGQuery from './pages/RAGQuery';
import Telemetry from './pages/Telemetry';
import './App.css';

const Sidebar = () => {
  const location = useLocation();
  
  const links = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/upload', icon: FileText, label: 'Upload' },
    { path: '/query', icon: MessageSquare, label: 'Query' },
    { path: '/documents', icon: Database, label: 'Documents' },
    { path: '/telemetry', icon: BarChart3, label: 'Analytics' },
  ];
  
  return (
    <div className="sidebar w-64 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="font-heading text-2xl font-bold text-primary tracking-tight" data-testid="app-title">
          RAG Assistant
        </h1>
        <p className="text-xs text-muted-foreground mt-1">AI-Powered Document Search</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              data-testid={`nav-${link.label.toLowerCase()}`}
              className={`sidebar-link flex items-center gap-3 px-4 py-3 rounded-sm text-sm ${
                isActive ? 'active text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <div className="glass-card p-3 rounded-sm">
          <p className="text-xs text-muted-foreground">Powered by</p>
          <p className="text-sm font-mono text-primary">GPT-5.1 + LangChain</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <div className="grain-overlay" />
      <BrowserRouter>
        <Sidebar />
        <main className="ml-64 p-8 md:p-12 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<DocumentUpload />} />
            <Route path="/query" element={<RAGQuery />} />
            <Route path="/documents" element={<DocumentManagement />} />
            <Route path="/telemetry" element={<Telemetry />} />
          </Routes>
        </main>
        <Toaster position="top-right" theme="dark" />
      </BrowserRouter>
    </div>
  );
}

export default App;