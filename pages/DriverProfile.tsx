
import React from 'react';
import { User, Shield, Truck } from 'lucide-react';

interface DriverProfileProps {
  onBack: () => void;
}

export const DriverProfile: React.FC<DriverProfileProps> = ({ onBack }) => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen flex flex-col">
       <div className="text-center mb-8 pt-8">
          <div className="w-28 h-28 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg">
             <User className="w-14 h-14 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Mike D.</h2>
          <p className="text-slate-500 font-medium">Senior Driver • ID #8821</p>
       </div>

       <div className="bg-slate-50 p-6 rounded-2xl space-y-4 mb-8 border border-slate-100">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">Overall Rating</span> 
            <span className="font-bold text-lg text-slate-900">4.9 ⭐</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">Total Drops</span> 
            <span className="font-bold text-lg text-slate-900">45,200</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">On-Time Rate</span> 
            <span className="font-bold text-lg text-green-600">99.4%</span>
          </div>
       </div>

       <div className="space-y-3 mb-auto">
          <button className="w-full p-4 bg-white border border-slate-200 rounded-xl flex items-center text-slate-700 font-medium hover:bg-slate-50">
             <Truck className="w-5 h-5 mr-3 text-slate-400" /> Vehicle Information
          </button>
          <button className="w-full p-4 bg-white border border-slate-200 rounded-xl flex items-center text-slate-700 font-medium hover:bg-slate-50">
             <Shield className="w-5 h-5 mr-3 text-slate-400" /> Safety & Compliance
          </button>
       </div>

       <button onClick={onBack} className="w-full p-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 mt-8 hover:bg-blue-700 transition-colors">
         Back to Dashboard
       </button>
    </div>
  );
};
