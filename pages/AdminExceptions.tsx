
import React, { useState } from 'react';
import { MOCK_EXCEPTIONS } from '../constants';
import { ExceptionReport } from '../types';
import { Button } from '../components/Button';
import { AlertTriangle, CheckCircle, MapPin, Clock, Filter, Search, ChevronDown } from 'lucide-react';

export const AdminExceptions: React.FC = () => {
  const [exceptions, setExceptions] = useState<ExceptionReport[]>(MOCK_EXCEPTIONS);

  const resolveException = (id: string) => {
    setExceptions(prev => prev.map(ex => 
      ex.id === id ? { ...ex, status: 'RESOLVED' } : ex
    ));
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end">
          <div>
             <h1 className="text-2xl font-bold text-slate-900 text-red-600 flex items-center">
                <AlertTriangle className="w-8 h-8 mr-2" /> Field Exceptions
             </h1>
             <p className="text-slate-500">Manage delivery blocks, hazards, and access issues.</p>
          </div>
          <div className="flex space-x-2">
             <div className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold text-sm border border-red-200">
                {exceptions.filter(e => e.status === 'OPEN').length} Open Issues
             </div>
          </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input placeholder="Search by Order ID or Driver..." className="w-full pl-10 p-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-500" />
             </div>
             <Button variant="outline" className="bg-white"><Filter className="w-4 h-4 mr-2" /> Severity</Button>
          </div>

          {/* List */}
          <div className="divide-y divide-slate-100">
             {exceptions.map(ex => (
                <div key={ex.id} className={`p-6 hover:bg-slate-50 transition-colors border-l-4 ${ex.status === 'OPEN' ? 'border-l-red-500' : 'border-l-green-500'}`}>
                   <div className="flex justify-between items-start">
                      <div className="flex-1">
                         <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                               ex.severity === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                               {ex.severity} Priority
                            </span>
                            <span className="text-sm font-bold text-slate-900">{ex.type.replace('_', ' ')}</span>
                            <span className="text-xs text-slate-400 font-mono">{ex.id}</span>
                         </div>
                         <p className="text-slate-800 font-medium mb-2">{ex.description}</p>
                         <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {ex.location.lat.toFixed(4)}, {ex.location.lng.toFixed(4)}</span>
                            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {new Date(ex.timestamp).toLocaleString()}</span>
                            <span className="font-bold text-slate-600">Driver: {ex.driverId}</span>
                         </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                         {ex.status === 'OPEN' ? (
                            <Button onClick={() => resolveException(ex.id)} className="bg-green-600 hover:bg-green-700 h-8 text-xs">
                               <CheckCircle className="w-3 h-3 mr-2" /> Mark Resolved
                            </Button>
                         ) : (
                            <span className="flex items-center text-green-600 font-bold text-sm">
                               <CheckCircle className="w-5 h-5 mr-2" /> Resolved
                            </span>
                         )}
                         <button className="text-slate-400 hover:text-blue-600 text-xs font-medium">View Order Details</button>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};
