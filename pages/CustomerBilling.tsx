
import React from 'react';
import { MOCK_INVOICES, MOCK_TRANSACTIONS } from '../constants';
import { Button } from '../components/Button';
import { Download, CreditCard, Plus, DollarSign, History } from 'lucide-react';

export const CustomerBilling: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-2xl font-bold text-slate-900">Billing & Wallet</h1>
            <p className="text-slate-500">Manage payment methods, invoices, and credits.</p>
         </div>
         <Button><Plus className="w-4 h-4 mr-2" /> Add Funds</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg text-white p-6 relative overflow-hidden">
            <div className="relative z-10">
               <p className="text-blue-200 text-sm font-medium mb-1">Current Wallet Balance</p>
               <h3 className="text-3xl font-bold">$4,092.53</h3>
               <div className="mt-6 flex space-x-2">
                  <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold backdrop-blur">Auto-Refill On</button>
                  <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold backdrop-blur">Top Up</button>
               </div>
            </div>
            <DollarSign className="absolute -right-6 -bottom-6 w-40 h-40 text-blue-500/20" />
         </div>

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center"><CreditCard className="w-5 h-5 mr-2 text-slate-400" /> Payment Methods</h3>
            <div className="space-y-3">
               <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50">
                  <div className="flex items-center">
                     <div className="w-8 h-5 bg-slate-800 rounded flex items-center justify-center text-[10px] text-white font-bold mr-3">VISA</div>
                     <span className="text-sm text-slate-600">•••• 4242</span>
                  </div>
                  <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">Default</span>
               </div>
               <button className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:bg-slate-50 font-medium">
                  + Add New Card
               </button>
            </div>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
             <h3 className="font-bold text-slate-800 mb-2">Quick Stats</h3>
             <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                   <span className="text-slate-500">Next Invoice</span>
                   <span className="font-medium text-slate-900">Nov 01, 2023</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-slate-500">Unpaid Amount</span>
                   <span className="font-medium text-amber-600">$0.00</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-slate-500">Total Spent YTD</span>
                   <span className="font-medium text-slate-900">$12,450.00</span>
                </div>
             </div>
         </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center"><History className="w-4 h-4 mr-2" /> Transaction History</h3>
         </div>
         <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
               <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Receipt</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {MOCK_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50">
                     <td className="px-6 py-4 text-slate-600">{tx.date}</td>
                     <td className="px-6 py-4 font-medium text-slate-900">{tx.description}</td>
                     <td className="px-6 py-4">
                        <span className={`text-xs font-bold uppercase ${tx.type === 'CREDIT' ? 'text-green-600' : 'text-slate-600'}`}>
                           {tx.type}
                        </span>
                     </td>
                     <td className="px-6 py-4 font-mono text-slate-700">
                        {tx.type === 'DEBIT' ? '-' : '+'}${tx.amount.toFixed(2)}
                     </td>
                     <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">{tx.status}</span>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded"><Download className="w-4 h-4" /></button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};
