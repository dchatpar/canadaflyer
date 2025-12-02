
import React, { useState } from 'react';
import { MOCK_AI_MODULES, MOCK_DECISION_LOGS, MOCK_RULES } from '../constants';
import { Button } from '../components/Button';
import { Cpu, Activity, ShieldCheck, Settings, Play, Pause, RefreshCw, FileText, Zap } from 'lucide-react';

export const AdminAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MODULES' | 'LOGS' | 'RULES'>('MODULES');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center">
               <Cpu className="w-6 h-6 mr-2 text-purple-600" /> AI Orchestration
            </h1>
            <p className="text-slate-500">Manage automated agents, decision rules, and audit logs.</p>
         </div>
         <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg">
            {['MODULES', 'RULES', 'LOGS'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                    activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                 }`}
               >
                  {tab}
               </button>
            ))}
         </div>
      </div>

      {/* Modules Dashboard */}
      {activeTab === 'MODULES' && (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {MOCK_AI_MODULES.map(mod => (
               <div key={mod.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                     <div className={`p-3 rounded-xl ${
                        mod.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                     }`}>
                        <Activity className="w-6 h-6" />
                     </div>
                     <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        mod.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                     }`}>
                        {mod.status}
                     </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{mod.name}</h3>
                  <p className="text-xs text-slate-500 mb-6 h-8">{mod.description}</p>
                  
                  <div className="space-y-3 border-t border-slate-100 pt-4">
                     <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Confidence Threshold</span>
                        <span className="font-bold text-slate-900">{(mod.confidenceThreshold * 100).toFixed(0)}%</span>
                     </div>
                     <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${mod.confidenceThreshold * 100}%` }}></div>
                     </div>
                     <div className="flex justify-between text-xs text-slate-400 pt-1">
                        <span>Last Active: {mod.lastActive}</span>
                        <button className="text-blue-600 font-bold hover:underline">Configure</button>
                     </div>
                  </div>
               </div>
            ))}
            
            {/* Global Stats */}
            <div className="lg:col-span-3 bg-slate-900 text-white rounded-xl p-8 flex items-center justify-between">
               <div>
                  <h3 className="text-xl font-bold mb-1">System Health</h3>
                  <p className="text-slate-400 text-sm">All orchestration agents are running within operational parameters.</p>
               </div>
               <div className="flex space-x-8 text-center">
                  <div>
                     <div className="text-3xl font-bold text-green-400">99.9%</div>
                     <div className="text-xs text-slate-500 uppercase tracking-wider">Uptime</div>
                  </div>
                  <div>
                     <div className="text-3xl font-bold text-blue-400">14k</div>
                     <div className="text-xs text-slate-500 uppercase tracking-wider">Daily Decisions</div>
                  </div>
                  <div>
                     <div className="text-3xl font-bold text-purple-400">0.2s</div>
                     <div className="text-xs text-slate-500 uppercase tracking-wider">Latency</div>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Automation Rules */}
      {activeTab === 'RULES' && (
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
               <h3 className="font-bold text-slate-800 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-amber-500" /> Active Triggers
               </h3>
               <Button className="h-8 text-xs">Create Rule</Button>
            </div>
            <div className="divide-y divide-slate-100">
               {MOCK_RULES.map(rule => (
                  <div key={rule.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                     <div className="flex-1">
                        <div className="flex items-center mb-1">
                           <span className={`w-2 h-2 rounded-full mr-3 ${rule.enabled ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                           <h4 className="font-bold text-slate-900">{rule.name}</h4>
                        </div>
                        <p className="text-sm text-slate-500 ml-5 mb-2">{rule.description}</p>
                        <div className="flex gap-2 ml-5">
                           <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 font-mono">IF {rule.trigger}</span>
                           <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 font-mono">THEN {rule.action}</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <button className={`p-2 rounded-lg border transition-colors ${rule.enabled ? 'border-green-200 text-green-600 bg-green-50' : 'border-slate-200 text-slate-400'}`}>
                           {rule.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100">
                           <Settings className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )}

      {/* Audit Logs */}
      {activeTab === 'LOGS' && (
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
               <h3 className="font-bold text-slate-800 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-500" /> Decision Audit Trail
               </h3>
            </div>
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                     <th className="px-6 py-3">Timestamp</th>
                     <th className="px-6 py-3">Module</th>
                     <th className="px-6 py-3">Action Taken</th>
                     <th className="px-6 py-3">Reasoning</th>
                     <th className="px-6 py-3">Outcome</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {MOCK_DECISION_LOGS.map(log => (
                     <tr key={log.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                        <td className="px-6 py-4 font-bold text-slate-700">{MOCK_AI_MODULES.find(m => m.id === log.moduleId)?.name}</td>
                        <td className="px-6 py-4 text-blue-600 font-medium">{log.action}</td>
                        <td className="px-6 py-4 text-slate-600">{log.reason}</td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              log.outcome === 'SUCCESS' ? 'bg-green-100 text-green-700' :
                              log.outcome === 'FAILURE' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                           }`}>
                              {log.outcome}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      )}
    </div>
  );
};
