
import React, { useState } from 'react';
import { MOCK_ORDERS } from '../constants';
import { Button } from '../components/Button';
import { Search, Calendar, MapPin, FileText, CheckCircle, Clock, ChevronRight, Filter } from 'lucide-react';

export const CustomerOrders: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = MOCK_ORDERS.filter(order => {
    if (filter !== 'ALL' && order.status !== filter) return false;
    if (searchTerm && !order.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Campaigns</h1>
          <p className="text-slate-500">Track distribution progress and history.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID..." 
              className="w-full pl-10 p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['ALL', 'IN_PROGRESS', 'COMPLETED'].map(status => (
               <button
                 key={status}
                 onClick={() => setFilter(status)}
                 className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                    filter === status ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                 }`}
               >
                 {status.replace('_', ' ')}
               </button>
            ))}
          </div>
        </div>

        {/* Order List */}
        <div className="divide-y divide-slate-100">
          {filteredOrders.map(order => (
            <div key={order.id} className="p-6 hover:bg-slate-50 transition-colors group">
               <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  {/* Left Info */}
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">{order.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                           order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                           order.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                           {order.status.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                     </div>
                     <h3 className="font-bold text-slate-900 text-lg mb-1">{order.flyerDetails.size} Distribution</h3>
                     <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-3">
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {order.selectedAreas.length} Zones</span>
                        <span className="flex items-center"><FileText className="w-4 h-4 mr-1" /> {order.flyerDetails.quantity.toLocaleString()} Flyers</span>
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {order.flyerDetails.distributionDate}</span>
                     </div>
                  </div>

                  {/* Middle Progress */}
                  <div className="w-full md:w-48">
                     <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                        <span>Progress</span>
                        <span>{order.progress}%</span>
                     </div>
                     <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${order.progress}%` }}></div>
                     </div>
                     {order.status === 'IN_PROGRESS' && (
                        <p className="text-[10px] text-blue-600 mt-1 flex items-center justify-end">
                           <Clock className="w-3 h-3 mr-1" /> Est. Finish: 4h
                        </p>
                     )}
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2">
                     <Button variant="outline" className="text-xs">View Proof</Button>
                     <button className="p-2 hover:bg-slate-200 rounded-full text-slate-400 group-hover:text-blue-600 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
          ))}
          {filteredOrders.length === 0 && (
             <div className="p-12 text-center text-slate-400">
                <p>No orders found matching your criteria.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
