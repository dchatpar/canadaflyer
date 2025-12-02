import React from 'react';
import { MOCK_MEDIA } from '../constants';
import { Image as ImageIcon, AlertTriangle, CheckCircle, MapPin, Calendar } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end">
          <div>
             <h1 className="text-2xl font-bold text-slate-900">Media & Proof Library</h1>
             <p className="text-slate-500">Review delivery photos, fraud alerts, and audit logs.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_MEDIA.map(item => (
             <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                   <img src={item.url} alt="POD" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute top-2 right-2">
                      {item.aiFlagged ? (
                         <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" /> Fraud Alert
                         </span>
                      ) : (
                         <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" /> Verified
                         </span>
                      )}
                   </div>
                </div>
                <div className="p-4 text-sm space-y-2">
                   <div className="flex justify-between text-slate-500 text-xs">
                      <span>{item.orderId}</span>
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                   </div>
                   <div className="flex items-center text-slate-700 font-medium">
                      <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                      {item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}
                   </div>
                   {item.aiFlagged && (
                      <div className="bg-red-50 text-red-700 p-2 rounded text-xs font-bold border border-red-100">
                         Reason: {item.aiReason}
                      </div>
                   )}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};