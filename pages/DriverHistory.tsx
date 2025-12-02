
import React from 'react';
import { ClipboardList } from 'lucide-react';
import { MOCK_SHIFT_HISTORY } from '../constants';

interface DriverHistoryProps {
  onBack: () => void;
}

export const DriverHistory: React.FC<DriverHistoryProps> = ({ onBack }) => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <h2 className="text-xl font-bold mb-6 flex items-center text-slate-900">
        <ClipboardList className="w-6 h-6 mr-2 text-blue-600" /> Shift History
      </h2>
      <div className="space-y-4">
        {MOCK_SHIFT_HISTORY.map(shift => (
          <div key={shift.id} className="p-5 border border-slate-200 rounded-xl shadow-sm">
            <div className="flex justify-between font-bold text-slate-900 mb-1">
                <span>{shift.date}</span>
                <span className="text-green-600">${shift.earnings.toFixed(2)}</span>
            </div>
            <div className="text-xs text-slate-500 flex justify-between items-center">
                <span>{shift.duration} • {shift.flyersDelivered} Flyers</span>
                <span className="flex items-center text-amber-500 font-bold">★ {shift.rating}</span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onBack} className="mt-8 w-full p-4 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold transition-colors">
        Back to Active Job
      </button>
    </div>
  );
};
