import React from 'react';
import { MOCK_ORDERS } from '../constants';
import { Button } from '../components/Button';
import { Search, Filter, Download, Eye, MoreVertical, Plus } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end">
          <div>
             <h1 className="text-2xl font-bold text-slate-900">Orders & Campaigns</h1>
             <p className="text-slate-500">Manage distribution campaigns and workflows.</p>
          </div>
          <div className="flex space-x-2">
             <Button variant="outline" className="bg-white"><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
             <Button><Plus className="w-4 h-4 mr-2" /> New Campaign</Button>
          </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-slate-100 flex gap-4 items-center bg-slate-50/50">
             <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search order ID, customer, or area..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
             </div>
             <div className="flex space-x-2">
                <button className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center">
                   <Filter className="w-4 h-4 mr-2" /> Status: All
                </button>
                <button className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                   Date Range
                </button>
             </div>
          </div>

          {/* Table */}
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                   <th className="px-6 py-3">Order ID</th>
                   <th className="px-6 py-3">Customer</th>
                   <th className="px-6 py-3">Campaign Details</th>
                   <th className="px-6 py-3">Date</th>
                   <th className="px-6 py-3">Status</th>
                   <th className="px-6 py-3">Total</th>
                   <th className="px-6 py-3 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {MOCK_ORDERS.map(order => (
                   <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4 font-mono font-medium text-blue-600">{order.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{order.customerName}</td>
                      <td className="px-6 py-4 text-slate-600">
                         <div className="flex flex-col">
                            <span>{order.flyerDetails.size} ({order.flyerDetails.quantity.toLocaleString()})</span>
                            <span className="text-xs text-slate-400">{order.selectedAreas.length} Zones</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{order.flyerDetails.distributionDate}</td>
                      <td className="px-6 py-4">
                         <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                            order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                            order.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'PENDING_PAYMENT' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                         }`}>
                            {order.status.replace('_', ' ')}
                         </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">${order.costBreakdown.total.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 hover:bg-blue-50 rounded text-blue-600"><Eye className="w-4 h-4" /></button>
                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><MoreVertical className="w-4 h-4" /></button>
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};