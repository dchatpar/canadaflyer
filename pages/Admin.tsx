import React from 'react';
import { MOCK_ORDERS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Truck, TrendingUp, DollarSign } from 'lucide-react';

const data = [
  { name: 'Mon', orders: 4, amt: 2400 },
  { name: 'Tue', orders: 3, amt: 1398 },
  { name: 'Wed', orders: 9, amt: 9800 },
  { name: 'Thu', orders: 6, amt: 3908 },
  { name: 'Fri', orders: 8, amt: 4800 },
  { name: 'Sat', orders: 12, amt: 7800 },
  { name: 'Sun', orders: 5, amt: 2300 },
];

const pieData = [
  { name: 'Delivered', value: 65 },
  { name: 'Pending', value: 25 },
  { name: 'Issues', value: 10 },
];

const COLORS = ['#22c55e', '#3b82f6', '#ef4444'];

export const Admin: React.FC = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Overview</h1>
        <p className="text-slate-500">Operations & Financial Analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Revenue", val: "$45,231", icon: DollarSign, color: "text-green-600" },
          { title: "Active Orders", val: "24", icon: Truck, color: "text-blue-600" },
          { title: "Customers", val: "156", icon: Users, color: "text-indigo-600" },
          { title: "Growth", val: "+12.5%", icon: TrendingUp, color: "text-purple-600" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.val}</h3>
              </div>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
          <h3 className="font-bold text-slate-800 mb-4">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
              <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="amt" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
          <h3 className="font-bold text-slate-800 mb-4">Delivery Status</h3>
          <div className="flex">
             <div className="w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="w-1/2 flex flex-col justify-center space-y-4">
               {pieData.map((entry, index) => (
                 <div key={index} className="flex items-center">
                   <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                   <span className="text-sm text-slate-600">{entry.name}: {entry.value}%</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* Dispatch Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
           <h3 className="font-bold text-slate-800">Live Dispatch Monitor</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-medium">Order ID</th>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Area</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Driver</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_ORDERS.map(order => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                <td className="px-6 py-4 text-slate-600">{order.customerName}</td>
                <td className="px-6 py-4 text-slate-600">{order.selectedAreas.length} Zones</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                    order.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm">
                  {!order.assignedDriverId ? 'Unassigned' : 'Mike D.'}
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};