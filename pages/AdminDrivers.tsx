import React from 'react';
import { MOCK_DRIVERS } from '../constants';
import { Button } from '../components/Button';
import { Truck, Star, MapPin, MoreVertical, UserPlus, CheckCircle } from 'lucide-react';

export const AdminDrivers: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end">
          <div>
             <h1 className="text-2xl font-bold text-slate-900">Field Team & Drivers</h1>
             <p className="text-slate-500">Manage roster, onboarding, and performance.</p>
          </div>
          <Button>
             <UserPlus className="w-4 h-4 mr-2" /> Onboard Driver
          </Button>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                   <th className="px-6 py-3">Driver Name</th>
                   <th className="px-6 py-3">Status</th>
                   <th className="px-6 py-3">Vehicle</th>
                   <th className="px-6 py-3">Rating</th>
                   <th className="px-6 py-3">Completed Jobs</th>
                   <th className="px-6 py-3">SLA Score</th>
                   <th className="px-6 py-3 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {MOCK_DRIVERS.map(driver => (
                   <tr key={driver.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                         <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 mr-3">
                               {driver.name.charAt(0)}
                            </div>
                            <div>
                               <div className="font-bold text-slate-900">{driver.name}</div>
                               <div className="text-xs text-slate-500">{driver.phone}</div>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded text-xs font-bold ${
                            driver.status === 'BUSY' ? 'bg-green-100 text-green-700' :
                            driver.status === 'IDLE' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                         }`}>
                            {driver.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 flex items-center">
                         <Truck className="w-4 h-4 mr-2 text-slate-400" /> {driver.vehicleType}
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-medium flex items-center">
                         <Star className="w-4 h-4 text-amber-400 mr-1 fill-current" /> {driver.rating}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{driver.completedJobs}</td>
                      <td className="px-6 py-4">
                         <div className="flex items-center">
                            <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                               <div className="bg-green-500 h-2 rounded-full" style={{ width: `${driver.slaScore}%` }}></div>
                            </div>
                            <span className="text-xs font-bold">{driver.slaScore}%</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};