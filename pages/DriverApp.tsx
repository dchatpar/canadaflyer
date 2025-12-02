import React, { useState, useEffect } from 'react';
import { Driver, Order } from '../types';
import { MOCK_DRIVERS, MOCK_ORDERS } from '../constants';
import { Button } from '../components/Button';
import { MapPin, Navigation, Camera, CheckCircle, AlertTriangle, Phone, User } from 'lucide-react';
import { analyzePODImage } from '../services/geminiService';

export const DriverApp: React.FC = () => {
  const [currentDriver] = useState<Driver>(MOCK_DRIVERS[0]);
  const [activeOrder, setActiveOrder] = useState<Order | undefined>(
    MOCK_ORDERS.find(o => o.id === currentDriver.assignedOrderId)
  );
  const [isShiftActive, setIsShiftActive] = useState(true);
  const [viewMode, setViewMode] = useState<'MAP' | 'POD' | 'PROFILE'>('MAP');
  const [simulatedLocation, setSimulatedLocation] = useState(currentDriver.currentLocation);
  
  // POD State
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [podStatus, setPodStatus] = useState<'IDLE' | 'VALID' | 'INVALID'>('IDLE');
  const [podReason, setPodReason] = useState('');

  // Simulate Movement
  useEffect(() => {
    if (!isShiftActive) return;
    const interval = setInterval(() => {
      setSimulatedLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [isShiftActive]);

  const handleCapturePOD = () => {
    // Simulate camera capture
    setCapturedImage('https://picsum.photos/400/600?random=' + Date.now());
    setPodStatus('IDLE');
  };

  const handleSubmitPOD = async () => {
    if (!capturedImage) return;
    setAnalyzing(true);
    const result = await analyzePODImage(capturedImage);
    setAnalyzing(false);
    
    if (result.isValid) {
      setPodStatus('VALID');
      setPodReason(result.reason);
      // Simulate update
      if (activeOrder) {
          // In a real app, we'd update the backend here
      }
    } else {
      setPodStatus('INVALID');
      setPodReason(result.reason);
    }
  };

  if (!isShiftActive) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6">
           <User className="w-10 h-10 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold mb-2">You are Offline</h1>
        <p className="text-slate-400 mb-8">Start your shift to receive delivery assignments.</p>
        <Button onClick={() => setIsShiftActive(true)} className="w-full py-4 bg-green-600 hover:bg-green-700">
          Start Shift
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden flex flex-col relative">
      
      {/* Driver Header */}
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center z-20 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold">MD</div>
          <div>
            <h2 className="font-bold text-sm">Mike D.</h2>
            <p className="text-xs text-green-400 flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span> Online</p>
          </div>
        </div>
        <button onClick={() => setIsShiftActive(false)} className="text-xs bg-slate-800 px-3 py-1 rounded hover:bg-red-900 hover:text-red-200 transition-colors">End Shift</button>
      </div>

      {/* Main Content Layer */}
      <div className="flex-1 relative bg-slate-100">
        
        {viewMode === 'MAP' && activeOrder && (
          <>
            {/* Map Simulation */}
            <div className="absolute inset-0 bg-slate-200">
               <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               {/* Route Line */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none">
                 <path d="M150,200 Q200,300 300,400" stroke="#3b82f6" strokeWidth="4" fill="none" strokeDasharray="8,4" />
               </svg>
               {/* Driver Dot */}
               <div className="absolute transition-all duration-1000 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                    style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
               </div>
               {/* Destination Pin */}
               <div className="absolute top-2/3 left-2/3 -mt-8 -ml-4 text-red-600">
                  <MapPin className="w-8 h-8 fill-current" />
               </div>
            </div>

            {/* Floating Job Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-4 border border-slate-100">
               <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900">Delivery: {activeOrder.customerName}</h3>
                    <p className="text-xs text-slate-500">Ref: {activeOrder.id}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">
                    {activeOrder.flyerDetails.quantity} units
                  </span>
               </div>
               <div className="flex space-x-2">
                  <Button className="flex-1 text-sm" onClick={() => setViewMode('POD')}>
                    <Camera className="w-4 h-4 mr-2" /> Verify Drop
                  </Button>
                  <Button variant="secondary" className="px-3">
                    <Navigation className="w-4 h-4" />
                  </Button>
               </div>
            </div>
          </>
        )}

        {viewMode === 'POD' && (
           <div className="p-6 flex flex-col h-full bg-white">
              <h2 className="text-xl font-bold mb-4">Proof of Delivery</h2>
              
              <div className="flex-1 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative mb-6">
                 {capturedImage ? (
                    <img src={capturedImage} alt="POD" className="w-full h-full object-cover" />
                 ) : (
                    <button onClick={handleCapturePOD} className="flex flex-col items-center text-slate-400 hover:text-blue-500">
                       <Camera className="w-12 h-12 mb-2" />
                       <span className="font-medium">Tap to Capture</span>
                    </button>
                 )}
              </div>

              {capturedImage && podStatus === 'IDLE' && (
                 <Button onClick={handleSubmitPOD} isLoading={analyzing} className="w-full py-4 mb-2">
                    Analyze & Submit
                 </Button>
              )}
              
              {capturedImage && podStatus !== 'IDLE' && (
                 <div className={`p-4 rounded-lg mb-4 border ${podStatus === 'VALID' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    <div className="flex items-center font-bold mb-1">
                       {podStatus === 'VALID' ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertTriangle className="w-5 h-5 mr-2" />}
                       {podStatus === 'VALID' ? 'Verified by AI' : 'Rejected'}
                    </div>
                    <p className="text-sm">{podReason}</p>
                    {podStatus === 'VALID' && (
                       <Button onClick={() => { setViewMode('MAP'); setCapturedImage(null); setPodStatus('IDLE'); }} className="w-full mt-3 bg-green-600 hover:bg-green-700">
                          Complete Drop
                       </Button>
                    )}
                     {podStatus === 'INVALID' && (
                       <Button onClick={() => { setCapturedImage(null); setPodStatus('IDLE'); }} variant="outline" className="w-full mt-3 border-red-200 text-red-600 hover:bg-red-50">
                          Retake Photo
                       </Button>
                    )}
                 </div>
              )}

              <Button variant="outline" onClick={() => setViewMode('MAP')} disabled={analyzing}>Cancel</Button>
           </div>
        )}

      </div>

      {/* Bottom Tab Bar (Mobile) */}
      <div className="bg-white border-t border-slate-200 p-2 grid grid-cols-3 gap-2 pb-6">
         <button onClick={() => setViewMode('MAP')} className={`flex flex-col items-center p-2 rounded-lg ${viewMode === 'MAP' ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}>
            <Navigation className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold uppercase">Route</span>
         </button>
         <button onClick={() => setViewMode('POD')} className={`flex flex-col items-center p-2 rounded-lg ${viewMode === 'POD' ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}>
            <Camera className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold uppercase">Capture</span>
         </button>
         <button className="flex flex-col items-center p-2 rounded-lg text-slate-400">
            <Phone className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold uppercase">Support</span>
         </button>
      </div>
    </div>
  );
};