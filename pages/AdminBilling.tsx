import React from 'react';
import { MOCK_INVOICES } from '../constants';
import { Button } from '../components/Button';
import { DollarSign, Download, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export const AdminBilling: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end">
          <div>
             <h1 className="text-2xl font-bold text-slate-900">Billing & Invoices</h1>
             <p className="text-slate-500">Manage payments, receipts, and tax reporting.</p>
          </div>
          <Button variant="secondary"><Download className="w-4 h-4 mr-2" /> Export Tax Report</Button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
             { label: 'Total Outstanding', val: '$14,230.00', color: 'text-red-600', icon: AlertCircle },
             { label: 'Collected This Month', val: '$45,980.50', color: 'text-green-600', icon: CheckCircle },
             { label: 'Pending Invoices', val: '12', color: 'text-blue-600', icon: FileText },
          ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                   <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                   <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.val}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color.replace('text', 'bg').replace('600', '100')} p-1.5 rounded-lg`} />
             </div>
          ))}
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                   <th className="px-6 py-3">Invoice ID</th>
                   <th className="px-6 py-3">Customer</th>
                   <th className="px-6 py-3">Issue Date</th>
                   <th className="px-6 py-3">Due Date</th>
                   <th className="px-6 py-3">Amount</th>
                   <th className="px-6 py-3">Status</th>
                   <th className="px-6 py-3 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {MOCK_INVOICES.map(inv => (
                   <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono font-medium text-slate-700">{inv.id}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{inv.customerName}</td>
                      <td className="px-6 py-4 text-slate-600">{inv.issueDate}</td>
                      <td className="px-6 py-4 text-slate-600">{inv.dueDate}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">${inv.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                            inv.status === 'PAID' ? 'bg-green-100 text-green-700' :
                            inv.status === 'OVERDUE' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                         }`}>
                            {inv.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-blue-600 hover:underline">Download PDF</button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};