
import React from 'react';
import { Button } from '../components/Button';
import { Download, TrendingUp, Map, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const CAMPAIGN_DATA = [
  { name: 'C-001', delivered: 4000, pending: 240, target: 4500 },
  { name: 'C-002', delivered: 3000, pending: 1398, target: 5000 },
  { name: 'C-003', delivered: 2000, pending: 9800, target: 12000 },
  { name: 'C-004', delivered: 2780, pending: 3908, target: 7000 },
  { name: 'C-005', delivered: 1890, pending: 4800, target: 7000 },
];

const ROI_DATA = [
  { month: 'Jan', spend: 4000, leads: 24 },
  { month: 'Feb', spend: 3000, leads: 22 },
  { month: 'Mar', spend: 5000, leads: 40 },
  { month: 'Apr', spend: 2780, leads: 20 },
  { month: 'May', spend: 1890, leads: 15 },
  { month: 'Jun', spend: 2390, leads: 25 },
];

export const CustomerReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-2xl font-bold text-slate-900">Campaign Analytics</h1>
            <p className="text-slate-500">Performance metrics and ROI analysis.</p>
         </div>
         <div className="flex space-x-2">
            <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
               <option>Last 30 Days</option>
               <option>Last Quarter</option>
               <option>Year to Date</option>
            </select>
            <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export PDF</Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-green-500" /> Delivery Completion Rates</h3>
            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CAMPAIGN_DATA}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                     <YAxis stroke="#94a3b8" fontSize={12} />
                     <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                     <Legend />
                     <Bar dataKey="delivered" fill="#3b82f6" name="Delivered" radius={[4, 4, 0, 0]} stackId="a" />
                     <Bar dataKey="pending" fill="#cbd5e1" name="Pending" radius={[4, 4, 0, 0]} stackId="a" />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-blue-500" /> Cost vs. Engagement</h3>
            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ROI_DATA}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                     <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} />
                     <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} />
                     <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                     <Legend />
                     <Line yAxisId="left" type="monotone" dataKey="spend" stroke="#8884d8" activeDot={{ r: 8 }} name="Ad Spend ($)" />
                     <Line yAxisId="right" type="monotone" dataKey="leads" stroke="#82ca9d" name="Leads Generated" />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
         <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-slate-800 flex items-center"><Map className="w-5 h-5 mr-2 text-slate-400" /> Geographic Performance</h3>
             <span className="text-sm text-slate-500">Heatmap data based on engagement density</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
               { zone: 'Downtown (M5V)', perf: 'High', score: 9.2 },
               { zone: 'North York (M2N)', perf: 'Medium', score: 7.5 },
               { zone: 'Scarborough (M1B)', perf: 'Low', score: 4.1 },
               { zone: 'Etobicoke (M9C)', perf: 'Medium', score: 6.8 },
            ].map((area, i) => (
               <div key={i} className="border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-center bg-slate-50">
                  <div className="font-bold text-slate-900 mb-1">{area.zone}</div>
                  <div className={`text-xs font-bold px-2 py-1 rounded-full uppercase mb-2 ${
                     area.perf === 'High' ? 'bg-green-100 text-green-700' :
                     area.perf === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                     {area.perf} Perf.
                  </div>
                  <div className="text-2xl font-bold text-slate-700">{area.score}</div>
                  <div className="text-[10px] text-slate-400">Engagement Score</div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
