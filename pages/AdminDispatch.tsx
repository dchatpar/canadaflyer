import React from 'react';
import { MOCK_DRIVERS, MOCK_AREAS } from '../constants';
import { Truck, Map as MapIcon } from 'lucide-react';

export const AdminDispatch: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
       
       {/* Control Bar */}
       <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="flex items-center space-x-2">
             <MapIcon className="w-5 h-5 text-slate-500" />
             <h2 className="font-bold text-slate-800">Live Fleet Overview</h2>
          </div>
          <div className="flex space-x-2 text-sm">
             <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                {MOCK_DRIVERS.filter(d => d.status !== 'OFFLINE').length} Active
             </div>
             <div className="flex items-center px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                {MOCK_DRIVERS.filter(d => d.status === 'OFFLINE').length} Offline
             </div>
          </div>
       </div>

       <div className="flex-1 relative bg-slate-100 overflow-hidden">
          {/* Map Grid Background */}
          <div className="absolute inset-0" 
               style={{ 
                 backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', 
                 backgroundSize: '40px 40px',
                 opacity: 0.4 
               }}>
          </div>

          {/* Render SVG Map Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
             {MOCK_AREAS.map(area => (
                <path key={area.id} d={area.coordinates} fill="none" stroke="#94a3b8" strokeWidth="2" transform="scale(3) translate(50,50)" />
             ))}
          </svg>

          {/* Simulated Drivers */}
          {MOCK_DRIVERS.map((driver) => (
             <div 
               key={driver.id}
               className="absolute transition-all duration-1000 group cursor-pointer"
               style={{ 
                 left: `${(Math.abs(driver.currentLocation.lng) - 79.2) * 300}%`, 
                 top: `${(driver.currentLocation.lat - 43.6) * 400}%` 
               }}
             >
               {/* Ping Effect */}
               {driver.status !== 'OFFLINE' && (
                  <div className="absolute -inset-4 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
               )}
               
               {/* Icon */}
               <div className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md ${
                  driver.status === 'BUSY' ? 'bg-green-500' :
                  driver.status === 'IDLE' ? 'bg-blue-500' : 'bg-slate-500'
               }`}>
                  <Truck className="w-4 h-4 text-white" />
               </div>

               {/* Tooltip */}
               <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {driver.name} ({driver.status})
               </div>
             </div>
          ))}

       </div>

       {/* Driver List Panel */}
       <div className="h-48 border-t border-slate-200 bg-white overflow-y-auto">
          <table className="w-full text-sm text-left">
             <thead className="bg-slate-50 text-slate-500 sticky top-0">
                <tr>
                   <th className="px-6 py-3 font-medium">Driver</th>
                   <th className="px-6 py-3 font-medium">Status</th>
                   <th className="px-6 py-3 font-medium">Current Job</th>
                   <th className="px-6 py-3 font-medium">Rating</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {MOCK_DRIVERS.map(driver => (
                   <tr key={driver.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3 font-medium text-slate-900">{driver.name}</td>
                      <td className="px-6 py-3">
                         <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            driver.status === 'BUSY' ? 'bg-green-100 text-green-700' :
                            driver.status === 'IDLE' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                         }`}>
                           {driver.status}
                         </span>
                      </td>
                      <td className="px-6 py-3 text-slate-500">{driver.assignedOrderId || '-'}</td>
                      <td className="px-6 py-3 text-slate-700">⭐ {driver.rating}</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};
