import React from 'react';
import { MOCK_CUSTOMERS } from '../constants';
import { Button } from '../components/Button';
import { Search, Mail, Phone, MoreHorizontal, ShieldCheck, CreditCard } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end">
          <div>
             <h1 className="text-2xl font-bold text-slate-900">Customer Management</h1>
             <p className="text-slate-500">Directory, KYC status, and credit limits.</p>
          </div>
          <Button>+ Add Customer</Button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_CUSTOMERS.map(cust => (
             <div key={cust.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                   <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                      {cust.companyName.charAt(0)}
                   </div>
                   <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-1">{cust.companyName}</h3>
                <p className="text-sm text-slate-500 mb-4">{cust.contactName}</p>

                <div className="space-y-3 text-sm mb-6">
                   <div className="flex items-center text-slate-600">
                      <Mail className="w-4 h-4 mr-2 text-slate-400" /> {cust.email}
                   </div>
                   <div className="flex items-center text-slate-600">
                      <Phone className="w-4 h-4 mr-2 text-slate-400" /> {cust.phone}
                   </div>
                   <div className="flex items-center text-slate-600">
                      <ShieldCheck className="w-4 h-4 mr-2 text-green-500" /> KYC Verified
                   </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs">
                   <div>
                      <span className="text-slate-400 block">Credit Limit</span>
                      <span className="font-bold text-slate-900">${cust.creditLimit.toLocaleString()}</span>
                   </div>
                   <div className="text-right">
                      <span className="text-slate-400 block">Balance</span>
                      <span className={`font-bold ${cust.currentBalance > 0 ? 'text-amber-600' : 'text-green-600'}`}>${cust.currentBalance.toLocaleString()}</span>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};