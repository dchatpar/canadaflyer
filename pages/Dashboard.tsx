import React, { useState } from 'react';
import { MOCK_ORDERS, MOCK_AREAS } from '../constants';
import { Order, OrderTimelineEvent } from '../types';
import { Button } from '../components/Button';
import { Package, Search, Clock, CheckCircle, MapPin, Truck, FileText, Image as ImageIcon, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onNewOrder: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNewOrder }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(MOCK_ORDERS[0]);

  // Helper to render status badge
  const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
      'COMPLETED': 'bg-green-100 text-green-800',
      'IN_PROGRESS': 'bg-blue-100 text-blue-800',
      'PENDING_PAYMENT': 'bg-amber-100 text-amber-800',
      'DISPATCHED': 'bg-purple-100 text-purple-800',
      'PRINTING': 'bg-indigo-100 text-indigo-800'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Campaign Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your active distribution campaigns.</p>
        </div>
        <Button onClick={onNewOrder} className="shadow-lg shadow-blue-200">+ New Campaign</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Order List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
              <div className="relative">
                <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
              {MOCK_ORDERS.map(order => (
                <div 
                  key={order.id} 
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 cursor-pointer border-b border-slate-50 transition-all hover:bg-slate-50 ${selectedOrder?.id === order.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-900 text-sm">{order.customerName}</span>
                    <span className="text-[10px] text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">{order.flyerDetails.size} • {order.flyerDetails.quantity} units</span>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Order Details (Timeline, Map, POD) */}
        <div className="lg:col-span-8">
          {selectedOrder ? (
            <div className="space-y-6">
              
              {/* Header Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <div className="flex items-center space-x-3 mb-1">
                          <h2 className="text-2xl font-bold text-slate-900">Order {selectedOrder.id}</h2>
                          <StatusBadge status={selectedOrder.status} />
                       </div>
                       <p className="text-slate-500 text-sm">
                          {selectedOrder.flyerDetails.serviceType === 'PRINT_AND_DISTRIBUTE' ? 'Printing & Distribution' : 'Distribution Only'} • {selectedOrder.flyerDetails.slaTier.replace('_', ' ')}
                       </p>
                    </div>
                    <div className="text-right">
                       <p className="text-2xl font-bold text-slate-900">${selectedOrder.costBreakdown.total.toFixed(2)}</p>
                       <Button variant="outline" className="text-xs h-8 px-3 mt-2">Download Invoice</Button>
                    </div>
                 </div>
                 
                 {/* Progress Bar */}
                 <div className="mt-6">
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                       <span>Progress</span>
                       <span>{selectedOrder.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                       <div className="bg-green-500 h-3 rounded-full transition-all duration-1000 relative overflow-hidden" style={{ width: `${selectedOrder.progress}%` }}>
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 {/* Timeline Column */}
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center"><Clock className="w-5 h-5 mr-2 text-blue-600" /> Live Timeline</h3>
                    <div className="space-y-6 relative">
                       {/* Connector Line */}
                       <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-100"></div>
                       
                       {selectedOrder.timeline.map((event, i) => (
                          <div key={i} className="relative flex items-start pl-10 group">
                             <div className={`absolute left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white z-10 transition-all ${event.completed ? 'border-blue-600 text-blue-600' : 'border-slate-200 text-slate-300'}`}>
                                {event.completed ? <CheckCircle className="w-4 h-4" /> : <div className="w-2 h-2 bg-slate-300 rounded-full" />}
                             </div>
                             <div>
                                <p className={`text-sm font-bold ${event.completed ? 'text-slate-900' : 'text-slate-400'}`}>{event.status.replace('_', ' ')}</p>
                                <p className="text-xs text-slate-500">{event.description}</p>
                                {event.completed && <p className="text-[10px] text-slate-400 mt-1 font-mono">{new Date(event.timestamp).toLocaleString()}</p>}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* Map & POD Column */}
                 <div className="space-y-6">
                    
                    {/* Mini Map Visualization */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-64 relative">
                       <div className="absolute top-3 left-3 z-10 bg-white/90 px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                          {selectedOrder.selectedAreas.length} Zones Active
                       </div>
                       <div className="absolute inset-0 bg-slate-100">
                          {/* Reuse Map Logic but Simplified/Static */}
                          <svg className="w-full h-full opacity-50" viewBox="0 0 300 200" preserveAspectRatio="none">
                             {MOCK_AREAS.map(area => (
                               <path 
                                 key={area.id} 
                                 d={area.coordinates} 
                                 fill={selectedOrder.selectedAreas.includes(area.id) ? '#3b82f6' : '#cbd5e1'} 
                                 stroke="white" 
                                 strokeWidth="2"
                               />
                             ))}
                          </svg>
                          {/* Animated Driver Dot if In Progress */}
                          {selectedOrder.status === 'IN_PROGRESS' && (
                             <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-ping"></div>
                          )}
                       </div>
                       <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur p-3 border-t border-slate-200 flex justify-between items-center">
                          <div className="flex items-center text-xs font-bold text-slate-700">
                             <Truck className="w-4 h-4 mr-2 text-blue-600" /> Driver: Mike D.
                          </div>
                          <Button variant="secondary" className="text-[10px] h-6 px-2">Full Map</Button>
                       </div>
                    </div>

                    {/* POD Gallery */}
                    {selectedOrder.proofOfDelivery ? (
                       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                          <h3 className="font-bold text-slate-900 mb-4 flex items-center"><ImageIcon className="w-5 h-5 mr-2 text-blue-600" /> Proof of Delivery</h3>
                          <div className="grid grid-cols-3 gap-2">
                             {selectedOrder.proofOfDelivery.images.map((img, idx) => (
                                <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-slate-200 relative group cursor-pointer">
                                   <img src={img} alt="POD" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                </div>
                             ))}
                             <div className="aspect-square rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-xs text-slate-400 font-medium cursor-pointer hover:bg-slate-100">
                                + View All
                             </div>
                          </div>
                          <div className="mt-4 bg-green-50 p-3 rounded-lg flex items-start text-xs text-green-800 border border-green-100">
                             <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                             <div>
                                <span className="font-bold">AI Verified:</span> 100% of sample images contain visible flyers at doorstep.
                             </div>
                          </div>
                       </div>
                    ) : (
                       <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center">
                          <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">Proof of delivery will appear here once distribution begins.</p>
                       </div>
                    )}

                 </div>
              </div>

            </div>
          ) : (
             <div className="h-full flex items-center justify-center text-slate-400">
                Select an order to view details.
             </div>
          )}
        </div>

      </div>
    </div>
  );
};