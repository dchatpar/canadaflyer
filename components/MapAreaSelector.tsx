import React, { useState } from 'react';
import { Area } from '../types';
import { MOCK_AREAS } from '../constants';
import { MapPin, Info, Layers } from 'lucide-react';

interface MapAreaSelectorProps {
  selectedAreaIds: string[];
  onToggleArea: (areaId: string) => void;
}

export const MapAreaSelector: React.FC<MapAreaSelectorProps> = ({ selectedAreaIds, onToggleArea }) => {
  const [hoveredArea, setHoveredArea] = useState<Area | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const getFillColor = (area: Area, isSelected: boolean) => {
    if (showHeatmap) {
      if (area.density === 'High') return '#ef4444'; // Red
      if (area.density === 'Medium') return '#f59e0b'; // Orange
      return '#22c55e'; // Green
    }
    return isSelected ? '#3b82f6' : '#cbd5e1';
  };

  const getOpacity = (isSelected: boolean) => {
    if (showHeatmap) return 0.4;
    return isSelected ? 1 : 1;
  };

  return (
    <div className="relative w-full h-[500px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner group">
      
      {/* Map Background Grid Simulation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10">
         <button 
           onClick={() => setShowHeatmap(!showHeatmap)}
           className={`flex items-center space-x-2 px-3 py-2 rounded-lg shadow-sm text-xs font-bold transition-all ${showHeatmap ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
         >
           <Layers className="w-4 h-4" />
           <span>Density Heatmap</span>
         </button>
      </div>

      {/* Interactive SVG Layer */}
      <svg className="w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="none">
        {MOCK_AREAS.map((area) => {
          const isSelected = selectedAreaIds.includes(area.id);
          return (
            <g key={area.id} onClick={() => onToggleArea(area.id)} className="cursor-pointer transition-all duration-200 hover:opacity-80">
              <path
                d={area.coordinates}
                className={`stroke-slate-400 stroke-1 transition-colors duration-300`}
                style={{ 
                  fill: getFillColor(area, isSelected),
                  fillOpacity: isSelected || showHeatmap ? 0.6 : 0.3,
                  strokeWidth: isSelected ? 2 : 1,
                  stroke: isSelected ? '#2563eb' : '#94a3b8'
                }}
                onMouseEnter={() => setHoveredArea(area)}
                onMouseLeave={() => setHoveredArea(null)}
              />
              {/* Centered Label */}
              <text 
                x={area.center.lng}
                y={area.center.lat} 
                className="text-[3px] fill-slate-800 font-bold pointer-events-none"
                textAnchor="middle"
              >
                {isSelected ? '✓' : ''}
              </text>
            </g>
          );
        })}
        
        {/* Labels Layer */}
        {MOCK_AREAS.map((area) => {
             const coords = area.coordinates.match(/(\d+),(\d+)/);
             const x = coords ? parseInt(coords[1]) + 20 : 50; 
             const y = coords ? parseInt(coords[2]) + 20 : 50;

             return (
                 <text 
                    key={`label-${area.id}`}
                    x={x} 
                    y={y} 
                    className="text-[4px] fill-slate-600 font-bold pointer-events-none select-none uppercase tracking-widest opacity-70"
                    textAnchor="middle"
                 >
                    {area.postalCodePrefix}
                 </text>
             )
        })}

      </svg>

      {/* Floating Info Card */}
      <div className="absolute top-4 right-4 w-64">
        <div className="bg-white/95 backdrop-blur rounded-lg shadow-xl p-4 border border-slate-100 transition-all duration-200">
          <div className="flex items-center space-x-2 text-slate-500 mb-2">
            <Info className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Area Insights</span>
          </div>
          
          {hoveredArea ? (
            <div className="animate-fadeIn">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900">{hoveredArea.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  hoveredArea.density === 'High' ? 'bg-red-100 text-red-700' : 
                  hoveredArea.density === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                }`}>
                  {hoveredArea.density} Density
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-3">{hoveredArea.postalCodePrefix} Region</p>
              
              <div className="space-y-2 text-sm border-t border-slate-100 pt-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Households:</span>
                  <span className="font-mono font-medium">{hoveredArea.households.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Avg. Income:</span>
                  <span className="font-mono font-medium">{hoveredArea.householdIncome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Est. Cost/Flyer:</span>
                  <span className="font-mono font-medium">${hoveredArea.baseCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">Hover over an area to see demographic data.</p>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-3 py-2 rounded-lg border border-slate-200 text-xs shadow-sm">
        {!showHeatmap ? (
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-300 rounded-sm border border-slate-400"></div>
              <span>Available Zone</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-sm border border-blue-600"></div>
              <span>Selected Zone</span>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
             <p className="font-bold mb-1 text-[10px] uppercase text-slate-500">Population Density</p>
             <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              <span>High</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span>Low</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};