
import React from 'react';
import { UserRole } from '../types';
import { Layout as LayoutIcon, PlusCircle, Map, MessageSquare, Settings, Truck, Users, FileText, CreditCard, Image as ImageIcon, Cpu, BarChart, AlertTriangle } from 'lucide-react';

interface LayoutProps {
  role: UserRole;
  currentView: string;
  onChangeView: (view: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ role, currentView, onChangeView, onLogout, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const getMenuItems = () => {
    switch (role) {
      case 'CUSTOMER':
        return [
          { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutIcon },
          { id: 'NEW_ORDER', label: 'New Order', icon: PlusCircle },
          { id: 'MY_ORDERS', label: 'My Campaigns', icon: FileText },
          { id: 'CUSTOMER_PROOF', label: 'Proof Gallery', icon: ImageIcon },
          { id: 'CUSTOMER_BILLING', label: 'Billing & Wallet', icon: CreditCard },
          { id: 'CUSTOMER_REPORTS', label: 'Reports', icon: BarChart },
          { id: 'MESSAGES', label: 'Support Chat', icon: MessageSquare },
          { id: 'CUSTOMER_PROFILE', label: 'Settings', icon: Settings },
        ];
      case 'ADMIN':
        return [
          { id: 'ADMIN_DASH', label: 'Dashboard', icon: LayoutIcon },
          { id: 'ADMIN_ORDERS', label: 'Orders & Campaigns', icon: FileText },
          { id: 'ADMIN_CUSTOMERS', label: 'Customers', icon: Users },
          { id: 'ADMIN_DRIVERS', label: 'Drivers & Field', icon: Truck },
          { id: 'ADMIN_DISPATCH', label: 'Dispatch Center', icon: Map },
          { id: 'ADMIN_EXCEPTIONS', label: 'Exceptions', icon: AlertTriangle },
          { id: 'ADMIN_BILLING', label: 'Billing & Finance', icon: CreditCard },
          { id: 'ADMIN_MEDIA', label: 'Media & Proof', icon: ImageIcon },
          { id: 'ADMIN_AI', label: 'AI Automation', icon: Cpu },
          { id: 'ADMIN_REPORTS', label: 'Reports & BI', icon: BarChart },
          { id: 'ADMIN_SETTINGS', label: 'Settings', icon: Settings },
        ];
      case 'DRIVER':
        return [
          { id: 'DRIVER_HOME', label: 'My Tasks', icon: Truck },
          { id: 'DRIVER_HISTORY', label: 'History', icon: FileText },
          { id: 'DRIVER_PROFILE', label: 'Profile', icon: Users },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-white fixed h-full z-10 transition-all duration-300 shadow-2xl">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800 bg-slate-950">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white">CanFlyer</h1>
            <p className="text-[10px] text-blue-400 uppercase tracking-wider font-bold">{role} PORTAL</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          {getMenuItems().map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                currentView === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 border-l-4 border-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <button onClick={onLogout} className="flex items-center space-x-3 text-slate-400 hover:text-red-400 transition-colors w-full px-4 py-2 rounded-lg hover:bg-slate-900">
            <Settings className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white z-50 px-4 py-3 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
           <Truck className="w-5 h-5 text-blue-500" />
           <span className="font-bold">CanFlyer</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <LayoutIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/95 z-40 flex flex-col pt-20 px-6 space-y-4 md:hidden overflow-y-auto">
           {getMenuItems().map((item) => (
            <button
              key={item.id}
              onClick={() => { onChangeView(item.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-4 p-4 rounded-xl text-lg font-medium ${
                currentView === item.id ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-800'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span>{item.label}</span>
            </button>
          ))}
          <button onClick={onLogout} className="w-full flex items-center space-x-4 p-4 rounded-xl text-lg font-medium text-red-400 bg-slate-800 mt-auto mb-8">
            <Settings className="w-6 h-6" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen transition-all duration-300 bg-slate-50/50">
        <div className="p-4 md:p-8 max-w-full mx-auto animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
};
