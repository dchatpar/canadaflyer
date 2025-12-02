
import React, { useState } from 'react';
import { MOCK_REPORTS, MOCK_REPORT_SCHEDULES } from '../constants';
import { ReportSchedule } from '../types';
import { Button } from '../components/Button';
import { FileText, Download, PieChart, Clock, Plus, Trash2, Mail, Calendar, CheckCircle, X } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const [schedules, setSchedules] = useState<ReportSchedule[]>(MOCK_REPORT_SCHEDULES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Schedule Form State
  const [newSchedule, setNewSchedule] = useState<Partial<ReportSchedule>>({
    reportType: 'FINANCIAL',
    frequency: 'MONTHLY',
    recipients: [],
    active: true
  });
  const [recipientInput, setRecipientInput] = useState('');

  const handleAddRecipient = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && recipientInput.trim()) {
      e.preventDefault();
      if (newSchedule.recipients?.includes(recipientInput.trim())) {
          setRecipientInput('');
          return;
      }
      setNewSchedule({
        ...newSchedule,
        recipients: [...(newSchedule.recipients || []), recipientInput.trim()]
      });
      setRecipientInput('');
    }
  };

  const removeRecipient = (email: string) => {
    setNewSchedule({
      ...newSchedule,
      recipients: newSchedule.recipients?.filter(r => r !== email)
    });
  };

  const handleSaveSchedule = () => {
    if (!newSchedule.reportType || !newSchedule.frequency || (newSchedule.recipients?.length || 0) === 0) {
      alert('Please fill in all fields and add at least one recipient.');
      return;
    }

    const schedule: ReportSchedule = {
      id: `sch-${Date.now()}`,
      reportType: newSchedule.reportType as any,
      frequency: newSchedule.frequency as any,
      recipients: newSchedule.recipients || [],
      nextRun: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0], // Mock next run
      active: true
    };

    setSchedules([...schedules, schedule]);
    setIsModalOpen(false);
    setNewSchedule({ reportType: 'FINANCIAL', frequency: 'MONTHLY', recipients: [], active: true });
    setRecipientInput('');
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6 relative">
       <div className="flex justify-between items-end">
          <div>
             <h1 className="text-2xl font-bold text-slate-900">Reports & BI</h1>
             <p className="text-slate-500">Operational intelligence and data exports.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Left Column: Standard Reports */}
         <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm h-fit">
            <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-slate-700 flex items-center">
              <FileText className="w-4 h-4 mr-2" /> Standard Reports Library
            </div>
            <div className="divide-y divide-slate-100">
               {MOCK_REPORTS.map(rep => (
                  <div key={rep.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                     <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                          rep.type === 'FINANCIAL' ? 'bg-green-50 text-green-600' : 
                          rep.type === 'SLA' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                           {rep.type === 'FINANCIAL' ? <PieChart className="w-5 h-5" /> : 
                            rep.type === 'SLA' ? <CheckCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-900">{rep.title}</h4>
                           <p className="text-xs text-slate-500">Generated: {rep.generatedAt} • Format: {rep.format}</p>
                        </div>
                     </div>
                     <button className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg flex items-center transition-colors">
                        <Download className="w-4 h-4 mr-2" /> Download
                     </button>
                  </div>
               ))}
            </div>
         </div>

         {/* Right Column: Scheduled Automation */}
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-fit">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
               <span className="font-bold text-slate-700 flex items-center">
                 <Clock className="w-4 h-4 mr-2" /> Scheduled Automation
               </span>
               <button onClick={() => setIsModalOpen(true)} className="p-1 hover:bg-slate-200 rounded text-slate-600">
                 <Plus className="w-4 h-4" />
               </button>
            </div>
            <div className="p-4 space-y-4">
               {schedules.length === 0 ? (
                 <div className="text-center py-8 text-slate-400 text-sm">No active schedules.</div>
               ) : (
                 schedules.map(schedule => (
                   <div key={schedule.id} className="border border-slate-200 rounded-lg p-3 hover:shadow-sm transition-shadow bg-slate-50/50">
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide mr-2 ${
                              schedule.reportType === 'FINANCIAL' ? 'bg-green-100 text-green-700' :
                              schedule.reportType === 'SLA' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                               {schedule.reportType}
                            </span>
                            <span className="text-xs font-bold text-slate-600">{schedule.frequency}</span>
                         </div>
                         <button onClick={() => handleDeleteSchedule(schedule.id)} className="text-slate-400 hover:text-red-500">
                            <Trash2 className="w-3 h-3" />
                         </button>
                      </div>
                      
                      <div className="space-y-1">
                         <div className="flex items-center text-xs text-slate-500">
                            <Mail className="w-3 h-3 mr-1.5" /> {schedule.recipients.length} Recipients
                         </div>
                         <div className="flex items-center text-xs text-slate-500">
                            <Calendar className="w-3 h-3 mr-1.5" /> Next: {schedule.nextRun}
                         </div>
                      </div>
                   </div>
                 ))
               )}
               
               <Button variant="outline" onClick={() => setIsModalOpen(true)} className="w-full text-xs border-dashed border-slate-300 text-slate-500">
                 Schedule New Report
               </Button>
            </div>
         </div>
       </div>

       {/* Modal */}
       {isModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-bounce-in">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-lg text-slate-900">Schedule Report</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                     <X className="w-5 h-5" />
                  </button>
               </div>
               
               <div className="p-6 space-y-5">
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Report Type</label>
                     <select 
                       className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                       value={newSchedule.reportType}
                       onChange={(e) => setNewSchedule({...newSchedule, reportType: e.target.value as any})}
                     >
                        <option value="FINANCIAL">Financial Summary</option>
                        <option value="OPERATIONAL">Operational Overview</option>
                        <option value="SLA">SLA Performance</option>
                     </select>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Frequency</label>
                     <div className="flex space-x-2">
                        {['WEEKLY', 'MONTHLY'].map(freq => (
                           <button
                             key={freq}
                             onClick={() => setNewSchedule({...newSchedule, frequency: freq as any})}
                             className={`flex-1 py-2 text-sm font-medium rounded-lg border ${
                               newSchedule.frequency === freq 
                                 ? 'bg-blue-50 border-blue-500 text-blue-700' 
                                 : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                             }`}
                           >
                              {freq}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Recipients</label>
                     <div className="border border-slate-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
                        <div className="flex flex-wrap gap-2 mb-2">
                           {newSchedule.recipients?.map(email => (
                              <span key={email} className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded flex items-center">
                                 {email}
                                 <button onClick={() => removeRecipient(email)} className="ml-1 text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                              </span>
                           ))}
                        </div>
                        <input 
                          className="w-full text-sm outline-none placeholder:text-slate-400"
                          placeholder="Type email and press Enter..."
                          value={recipientInput}
                          onChange={(e) => setRecipientInput(e.target.value)}
                          onKeyDown={handleAddRecipient}
                        />
                     </div>
                     <p className="text-[10px] text-slate-400 mt-1">Press Enter to add multiple recipients.</p>
                  </div>
               </div>

               <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-sm">Cancel</Button>
                  <Button onClick={handleSaveSchedule} className="text-sm">Save Schedule</Button>
               </div>
            </div>
         </div>
       )}
    </div>
  );
};
