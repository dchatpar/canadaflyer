
import React, { useState } from 'react';
import { UserRole } from './types';
import { Dashboard } from './pages/Dashboard';
import { NewOrder } from './pages/NewOrder';
import { Admin } from './pages/Admin';
import { AdminDispatch } from './pages/AdminDispatch';
import { AdminOrders } from './pages/AdminOrders';
import { AdminCustomers } from './pages/AdminCustomers';
import { AdminDrivers } from './pages/AdminDrivers';
import { AdminBilling } from './pages/AdminBilling';
import { AdminMedia } from './pages/AdminMedia';
import { AdminAI } from './pages/AdminAI';
import { AdminReports } from './pages/AdminReports';
import { AdminSettings } from './pages/AdminSettings';
import { AdminExceptions } from './pages/AdminExceptions';
import { CustomerBilling } from './pages/CustomerBilling';
import { CustomerReports } from './pages/CustomerReports';
import { CustomerProfile } from './pages/CustomerProfile';
import { CustomerOrders } from './pages/CustomerOrders';
import { CustomerProof } from './pages/CustomerProof';
import { DriverApp } from './pages/DriverApp';
import { DriverHistory } from './pages/DriverHistory';
import { DriverProfile } from './pages/DriverProfile';
import { Messages } from './pages/Messages';
import { LandingPage } from './pages/LandingPage';
import { Layout } from './components/Layout';

export default function App() {
  // State for "Router" and Auth simulation
  const [role, setRole] = useState<UserRole | null>(null);
  const [currentView, setCurrentView] = useState('LANDING'); // Default to landing

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'CUSTOMER') setCurrentView('DASHBOARD');
    else if (selectedRole === 'ADMIN') setCurrentView('ADMIN_DASH');
    else if (selectedRole === 'DRIVER') setCurrentView('DRIVER_HOME');
  };

  const renderContent = () => {
    switch (currentView) {
      // Public
      case 'LANDING': return <LandingPage onEnterApp={() => setCurrentView('LOGIN_SELECT')} />;
      
      // Auth Simulation
      case 'LOGIN_SELECT':
         return (
           <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-fadeIn">
                 <h1 className="text-3xl font-bold text-slate-900 mb-2">Portal Access</h1>
                 <p className="text-slate-500 mb-8">Select your role to enter the simulation.</p>
                 <div className="space-y-3">
                    <button onClick={() => handleLogin('CUSTOMER')} className="w-full p-4 rounded-xl border border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all font-bold text-slate-700 flex justify-between items-center">
                       <span>Customer Portal</span> <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Enterprise</span>
                    </button>
                    <button onClick={() => handleLogin('ADMIN')} className="w-full p-4 rounded-xl border border-slate-200 hover:bg-purple-50 hover:border-purple-300 hover:shadow-md transition-all font-bold text-slate-700 flex justify-between items-center">
                       <span>Admin Dashboard</span> <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Staff</span>
                    </button>
                    <button onClick={() => handleLogin('DRIVER')} className="w-full p-4 rounded-xl border border-slate-200 hover:bg-green-50 hover:border-green-300 hover:shadow-md transition-all font-bold text-slate-700 flex justify-between items-center">
                       <span>Driver App</span> <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Mobile</span>
                    </button>
                 </div>
                 <button onClick={() => setCurrentView('LANDING')} className="mt-8 text-slate-400 hover:text-slate-600 text-sm">Back to Home</button>
              </div>
           </div>
         );

      // Customer Routes
      case 'DASHBOARD': return <Dashboard onNewOrder={() => setCurrentView('NEW_ORDER')} />;
      case 'NEW_ORDER': return <NewOrder onOrderComplete={() => setCurrentView('DASHBOARD')} />;
      case 'MESSAGES': return <Messages />;
      case 'CUSTOMER_BILLING': return <CustomerBilling />;
      case 'CUSTOMER_REPORTS': return <CustomerReports />;
      case 'CUSTOMER_PROFILE': return <CustomerProfile />;
      case 'MY_ORDERS': return <CustomerOrders />;
      case 'CUSTOMER_PROOF': return <CustomerProof />;

      // Admin Routes
      case 'ADMIN_DASH': return <Admin />;
      case 'ADMIN_DISPATCH': return <AdminDispatch />;
      case 'ADMIN_ORDERS': return <AdminOrders />;
      case 'ADMIN_CUSTOMERS': return <AdminCustomers />;
      case 'ADMIN_DRIVERS': return <AdminDrivers />;
      case 'ADMIN_BILLING': return <AdminBilling />;
      case 'ADMIN_MEDIA': return <AdminMedia />;
      case 'ADMIN_AI': return <AdminAI />;
      case 'ADMIN_REPORTS': return <AdminReports />;
      case 'ADMIN_SETTINGS': return <AdminSettings />;
      case 'ADMIN_EXCEPTIONS': return <AdminExceptions />;
      
      // Driver Routes
      case 'DRIVER_HOME': return <DriverApp />;
      case 'DRIVER_HISTORY': return <DriverHistory onBack={() => setCurrentView('DRIVER_HOME')} />;
      case 'DRIVER_PROFILE': return <DriverProfile onBack={() => setCurrentView('DRIVER_HOME')} />;
      
      default: return <div className="p-10 text-red-500 font-bold">404: Page Not Found ({currentView})</div>;
    }
  };

  // Logic to wrap content in Layout only if logged in and not mobile driver app (except specific views)
  if (!role || currentView === 'LANDING' || currentView === 'LOGIN_SELECT') {
     return renderContent();
  }

  // Driver App usually has its own layout. We allow it to render full screen here.
  if (role === 'DRIVER') {
     return renderContent();
  }

  return (
    <Layout 
      role={role} 
      currentView={currentView} 
      onChangeView={setCurrentView}
      onLogout={() => { setRole(null); setCurrentView('LANDING'); }}
    >
      {renderContent()}
    </Layout>
  );
}
