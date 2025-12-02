
import React from 'react';
import { MOCK_MEDIA, MOCK_ORDERS } from '../constants';
import { Button } from '../components/Button';
import { Image as ImageIcon, CheckCircle, Download, Filter, AlertTriangle } from 'lucide-react';

export const CustomerProof: React.FC = () => {
  // Filter media to only show items belonging to mock customer orders
  const customerOrderIds = MOCK_ORDERS.map(o => o.id);
  const proofItems = MOCK_MEDIA.filter(m => customerOrderIds.includes(m.orderId));

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end">
          <div>
             <h1 className="text-2xl font-bold text-slate-900">Proof of Delivery</h1>
             <p className="text-slate-500">Visual verification for your campaigns.</p>
          </div>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Download All</Button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {proofItems.map(item => (
             <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-all">
                <div className="relative h-48 bg-slate-100 overflow-hidden cursor-pointer">
                   <img src={item.url} alt="Proof" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                   <div className="absolute top-2 right-2">
                      {item.aiFlagged ? (
                         <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" /> Review Needed
                         </span>
                      ) : (
                         <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" /> Verified
                         </span>
                      )}
                   </div>
                </div>
                <div className="p-4">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{item.orderId}</span>
                      <span className="text-[10px] text-slate-400">{new Date(item.timestamp).toLocaleDateString()}</span>
                   </div>
                   <p className="text-xs text-slate-500 flex items-center">
                      <ImageIcon className="w-3 h-3 mr-1" /> Photo Evidence
                   </p>
                </div>
             </div>
          ))}
          {proofItems.length === 0 && (
             <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-slate-400">No proof images available yet.</p>
             </div>
          )}
       </div>
    </div>
  );
};
