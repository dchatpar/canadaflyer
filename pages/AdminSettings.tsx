import React from 'react';
import { Settings, Lock, Users, Globe, Bell } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8">
       <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
          <p className="text-slate-500">Configuration, roles, and integrations.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-2">
             {[
                { icon: Users, label: 'Users & Roles', active: true },
                { icon: Lock, label: 'Security & MFA' },
                { icon: Globe, label: 'API & Integrations' },
                { icon: Bell, label: 'Notifications' },
             ].map((item, i) => (
                <button key={i} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${item.active ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}>
                   <item.icon className="w-4 h-4" />
                   <span>{item.label}</span>
                </button>
             ))}
          </div>

          <div className="col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
             <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Role-Based Access Control</h3>
             
             <div className="space-y-4">
                {['Super Admin', 'Finance Manager', 'Dispatch Lead', 'Customer Support'].map((role, i) => (
                   <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                      <div>
                         <p className="font-bold text-slate-800">{role}</p>
                         <p className="text-xs text-slate-500">12 Active Users</p>
                      </div>
                      <button className="text-blue-600 text-sm font-bold hover:underline">Edit Permissions</button>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};