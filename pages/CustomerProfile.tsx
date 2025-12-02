
import React from 'react';
import { MOCK_TEAM } from '../constants';
import { Button } from '../components/Button';
import { User, Bell, Shield, Users, Mail, Save } from 'lucide-react';

export const CustomerProfile: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8">
         <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
         <p className="text-slate-500">Manage your business profile and team access.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
         <h3 className="font-bold text-slate-900 mb-6 flex items-center border-b border-slate-100 pb-2">
            <User className="w-5 h-5 mr-2 text-blue-600" /> Business Profile
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
               <input type="text" className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" defaultValue="Pizza Nova" />
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Business Number (BN)</label>
               <input type="text" className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" defaultValue="88219 3921 RT0001" />
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
               <input type="text" className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" defaultValue="Mario Rossi" />
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
               <input type="text" className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" defaultValue="416-555-1111" />
            </div>
         </div>
         <div className="mt-6 flex justify-end">
            <Button>
               <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
         </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
         <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-2">
             <h3 className="font-bold text-slate-900 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" /> Team Management
             </h3>
             <Button variant="outline" className="text-xs">Invite Member</Button>
         </div>
         <div className="space-y-4">
            {MOCK_TEAM.map(member => (
               <div key={member.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                  <div className="flex items-center">
                     <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                        {member.name.charAt(0)}
                     </div>
                     <div>
                        <p className="font-bold text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-500 flex items-center"><Mail className="w-3 h-3 mr-1" /> {member.email}</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-4">
                     <span className={`text-xs font-bold px-2 py-1 rounded ${member.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-600'}`}>
                        {member.role}
                     </span>
                     <span className={`text-xs ${member.status === 'ACTIVE' ? 'text-green-600' : 'text-amber-600'}`}>
                        {member.status}
                     </span>
                     <button className="text-slate-400 hover:text-blue-600 text-sm font-medium">Edit</button>
                  </div>
               </div>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
               <Bell className="w-5 h-5 mr-2 text-blue-600" /> Notification Preferences
            </h3>
            <div className="space-y-3">
               {['Campaign Started', 'Delivery Completed', 'Invoice Generated', 'Marketing Updates'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <span className="text-sm text-slate-600">{item}</span>
                     <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle" id={`toggle-${i}`} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-colors duration-200 checked:right-0 checked:border-green-400" defaultChecked />
                        <label htmlFor={`toggle-${i}`} className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer checked:bg-green-400"></label>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
               <Shield className="w-5 h-5 mr-2 text-blue-600" /> Security
            </h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <div>
                     <p className="text-sm font-bold text-slate-800">Two-Factor Auth</p>
                     <p className="text-xs text-slate-500">Secure your account with SMS.</p>
                  </div>
                  <Button variant="outline" className="text-xs h-8">Enable</Button>
               </div>
               <div className="flex justify-between items-center">
                  <div>
                     <p className="text-sm font-bold text-slate-800">Password</p>
                     <p className="text-xs text-slate-500">Last changed 3 months ago.</p>
                  </div>
                  <Button variant="outline" className="text-xs h-8">Update</Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
