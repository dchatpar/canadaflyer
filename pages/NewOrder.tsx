import React, { useState, useEffect } from 'react';
import { FlyerDetails, Area, AIInsight } from '../types';
import { MOCK_AREAS, FLYER_SIZES, DISTRIBUTION_TYPES, PRICING, FINISH_TYPES } from '../constants';
import { MapAreaSelector } from '../components/MapAreaSelector';
import { Button } from '../components/Button';
import { CheckCircle, CreditCard, ChevronRight, ChevronLeft, Sparkles, UploadCloud, Info, ShieldCheck, Printer, Truck, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { generateCampaignInsights } from '../services/geminiService';

interface NewOrderProps {
  onOrderComplete: () => void;
}

const STEPS = [
  { num: 1, label: 'Area' },
  { num: 2, label: 'Service' },
  { num: 3, label: 'Specs' },
  { num: 4, label: 'Schedule' },
  { num: 5, label: 'Upload' },
  { num: 6, label: 'Review' },
  { num: 7, label: 'Payment' }
];

export const NewOrder: React.FC<NewOrderProps> = ({ onOrderComplete }) => {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState<FlyerDetails>({
    size: 'Rack Card',
    finish: 'Standard',
    quantity: 5000,
    type: 'Door-to-Door',
    distributionDate: new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0], // Default 10 days out
    targetAudience: 'Residential',
    serviceType: 'PRINT_AND_DISTRIBUTE',
    slaTier: 'STANDARD'
  });
  const [selectedAreaIds, setSelectedAreaIds] = useState<string[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // --- Cost Calculation Logic ---
  const selectedAreas = MOCK_AREAS.filter(a => selectedAreaIds.includes(a.id));
  const totalHouseholds = selectedAreas.reduce((acc, curr) => acc + curr.households, 0);
  
  // Base Distribution Cost
  let distCost = selectedAreas.reduce((acc, curr) => acc + (details.quantity * curr.baseCost), 0);
  
  // Print Cost
  const printRate = PRICING.printingBaseRate * (PRICING.finishMultipliers[details.finish] || 1);
  const printCost = details.serviceType === 'PRINT_AND_DISTRIBUTE' ? details.quantity * printRate : 0;
  
  // SLA Multiplier
  const slaMult = PRICING.slaMultipliers[details.slaTier];
  const subtotalBeforeSLA = distCost + printCost;
  const rushFee = (subtotalBeforeSLA * slaMult) - subtotalBeforeSLA;
  
  // Fuel Surcharge
  const fuelSurcharge = (distCost + rushFee) * PRICING.fuelSurchargePercent;
  
  const subtotal = distCost + printCost + rushFee + fuelSurcharge;
  const tax = subtotal * PRICING.taxRate;
  const total = subtotal + tax;

  const handleToggleArea = (id: string) => {
    setSelectedAreaIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleFileUpload = () => {
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setUploadProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setDetails(prev => ({ ...prev, uploadedFile: 'campaign_artwork_v1.pdf' }));
      }
    }, 50);
  };

  const fetchInsights = async () => {
    if (selectedAreas.length === 0) return;
    setLoadingInsights(true);
    const results = await generateCampaignInsights(selectedAreas, details);
    setInsights(results);
    setLoadingInsights(false);
  };

  // Wizard Navigation
  const nextStep = () => setStep(prev => Math.min(STEPS.length, prev + 1));
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Progress Header */}
      <div className="mb-8 pt-4">
        <div className="flex items-center justify-between relative px-4">
          <div className="absolute left-4 right-4 top-1/2 h-1 bg-slate-200 -z-10 rounded-full"></div>
          <div className="absolute left-4 top-1/2 h-1 bg-blue-600 -z-10 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}></div>
          
          {STEPS.map((s) => (
            <div key={s.num} className="flex flex-col items-center bg-slate-50 px-2 z-10">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 
                ${step >= s.num ? 'bg-blue-600 text-white scale-110 shadow-lg' : 'bg-white border-2 border-slate-300 text-slate-400'}`}
              >
                {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
              </div>
              <span className={`text-[10px] font-bold uppercase mt-2 tracking-wider ${step >= s.num ? 'text-blue-700' : 'text-slate-400'}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 min-h-[600px] flex flex-col overflow-hidden">
        
        {/* Step Content */}
        <div className="flex-1 p-8">
          
          {/* STEP 1: TARGETING */}
          {step === 1 && (
             <div className="animate-fadeIn h-full flex flex-col">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Target Audience</h2>
                    <p className="text-slate-500">Select geographic zones for distribution. Darker areas indicate higher density.</p>
                  </div>
                  <div className="text-right bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                     <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Selected Reach</p>
                     <p className="text-2xl font-bold text-blue-600 leading-none">{totalHouseholds.toLocaleString()} <span className="text-sm font-medium text-slate-500">Households</span></p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row gap-8">
                  <div className="w-full lg:w-3/4">
                     <MapAreaSelector selectedAreaIds={selectedAreaIds} onToggleArea={handleToggleArea} />
                  </div>
                  <div className="w-full lg:w-1/4 space-y-4">
                     <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                       <h4 className="font-bold text-blue-800 mb-2 flex items-center"><Sparkles className="w-4 h-4 mr-2" /> Gemini Insights</h4>
                       <p className="text-xs text-blue-600 mb-4 leading-relaxed">AI-powered analysis of your selected demographics and terrain difficulty.</p>
                       <Button variant="secondary" onClick={fetchInsights} isLoading={loadingInsights} className="w-full text-xs">
                          Analyze Selection
                       </Button>
                     </div>
                     
                     <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
                       {insights.map((insight, i) => (
                         <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-sm">
                           <div className="flex justify-between mb-2">
                             <span className="font-bold text-slate-800">{insight.title}</span>
                             <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${insight.recommendationLevel === 'High' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{insight.recommendationLevel} Priority</span>
                           </div>
                           <p className="text-slate-600 text-xs leading-relaxed">{insight.content}</p>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
             </div>
          )}

          {/* STEP 2: SERVICE TYPE */}
          {step === 2 && (
            <div className="animate-fadeIn max-w-3xl mx-auto py-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Choose Service Level</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div 
                    onClick={() => setDetails({...details, serviceType: 'PRINT_AND_DISTRIBUTE'})}
                    className={`cursor-pointer p-8 rounded-2xl border-2 transition-all ${details.serviceType === 'PRINT_AND_DISTRIBUTE' ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-500/20' : 'border-slate-200 hover:border-blue-300 hover:shadow-lg'}`}
                 >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${details.serviceType === 'PRINT_AND_DISTRIBUTE' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                       <Printer className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Print & Distribute</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">All-in-one service. We print your flyers at our local depots and distribute them directly.</p>
                    <ul className="text-sm space-y-2">
                       <li className="flex items-center text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Professional Printing</li>
                       <li className="flex items-center text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Quality Check Included</li>
                       <li className="flex items-center text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Automatic Logistics</li>
                    </ul>
                 </div>

                 <div 
                    onClick={() => setDetails({...details, serviceType: 'DISTRIBUTION_ONLY'})}
                    className={`cursor-pointer p-8 rounded-2xl border-2 transition-all ${details.serviceType === 'DISTRIBUTION_ONLY' ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-500/20' : 'border-slate-200 hover:border-blue-300 hover:shadow-lg'}`}
                 >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${details.serviceType === 'DISTRIBUTION_ONLY' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                       <Truck className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Distribution Only</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">You provide the flyers. Ship them to our designated warehouse for distribution.</p>
                    <ul className="text-sm space-y-2">
                       <li className="flex items-center text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Lower Cost</li>
                       <li className="flex items-center text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Flexible Scheduling</li>
                       <li className="flex items-center text-slate-700"><AlertCircle className="w-4 h-4 text-amber-500 mr-2" /> Requires Shipping to Depot</li>
                    </ul>
                 </div>
              </div>
            </div>
          )}

          {/* STEP 3: SPECS */}
          {step === 3 && (
            <div className="animate-fadeIn max-w-4xl mx-auto py-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Campaign Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-6">
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Quantity</label>
                       <input 
                         type="number" 
                         value={details.quantity}
                         onChange={(e) => setDetails({...details, quantity: Math.max(1000, parseInt(e.target.value) || 0)})}
                         className="w-full p-4 border border-slate-300 rounded-xl text-lg font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                         step="500"
                       />
                       <p className="text-xs text-slate-400 mt-2">Minimum 1,000 units.</p>
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Distribution Method</label>
                       <div className="space-y-3">
                          {DISTRIBUTION_TYPES.map(type => (
                             <div key={type} onClick={() => setDetails({...details, type: type as any})} className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between ${details.type === type ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                                <span className="font-medium text-slate-700">{type}</span>
                                {details.type === type && <CheckCircle className="w-5 h-5 text-blue-600" />}
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Paper Format</label>
                       <div className="grid grid-cols-2 gap-3">
                          {FLYER_SIZES.map(size => (
                             <button key={size} onClick={() => setDetails({...details, size: size as any})} className={`p-3 rounded-xl border text-sm font-medium text-left ${details.size === size ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600'}`}>
                                {size}
                             </button>
                          ))}
                       </div>
                    </div>
                    
                    {details.serviceType === 'PRINT_AND_DISTRIBUTE' && (
                       <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">Paper Finish</label>
                         <select 
                           value={details.finish}
                           onChange={(e) => setDetails({...details, finish: e.target.value as any})}
                           className="w-full p-4 border border-slate-300 rounded-xl bg-white"
                         >
                           {FINISH_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
                         </select>
                       </div>
                    )}
                 </div>
              </div>
            </div>
          )}

          {/* STEP 4: SCHEDULE & SLA */}
          {step === 4 && (
             <div className="animate-fadeIn max-w-4xl mx-auto py-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Schedule & Priority</h2>
                
                <div className="mb-8">
                   <label className="block text-sm font-bold text-slate-700 mb-2">Target Start Date</label>
                   <div className="relative">
                      <Calendar className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                      <input 
                        type="date" 
                        value={details.distributionDate}
                        onChange={(e) => setDetails({...details, distributionDate: e.target.value})}
                        className="w-full pl-12 p-4 border border-slate-300 rounded-xl text-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="block text-sm font-bold text-slate-700">Service Level Agreement (SLA)</label>
                   
                   {[
                     { id: 'STANDARD', label: 'Standard Delivery', days: '3-5 Days', mult: '1x', desc: 'Best value. Flexible delivery window.' },
                     { id: 'EXPRESS', label: 'Express Priority', days: '1-2 Days', mult: '1.5x', desc: 'Guaranteed start date. Dedicated team.' },
                     { id: 'PRIORITY_SAME_DAY', label: 'Rush Same Day', days: '24 Hours', mult: '2.5x', desc: 'Immediate dispatch. Premium courier service.' }
                   ].map((tier) => (
                      <div 
                        key={tier.id}
                        onClick={() => setDetails({...details, slaTier: tier.id as any})}
                        className={`cursor-pointer p-5 rounded-xl border-2 flex items-center justify-between transition-all ${details.slaTier === tier.id ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-slate-200 hover:bg-slate-50'}`}
                      >
                         <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${details.slaTier === tier.id ? 'border-blue-600' : 'border-slate-300'}`}>
                               {details.slaTier === tier.id && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                            </div>
                            <div>
                               <h4 className="font-bold text-slate-900">{tier.label}</h4>
                               <p className="text-xs text-slate-500">{tier.desc}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <span className="block font-bold text-slate-900">{tier.days}</span>
                            {tier.id !== 'STANDARD' && <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Surcharge Applies</span>}
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {/* STEP 5: UPLOAD */}
          {step === 5 && (
             <div className="animate-fadeIn max-w-2xl mx-auto text-center pt-10">
               <h2 className="text-2xl font-bold text-slate-800 mb-2">Upload Assets</h2>
               <p className="text-slate-500 mb-8">Upload your flyer design. We check for bleed and resolution automatically.</p>

               <div className={`border-2 border-dashed rounded-3xl p-16 transition-all ${details.uploadedFile ? 'border-green-400 bg-green-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}`}>
                  {details.uploadedFile ? (
                    <div className="flex flex-col items-center animate-bounce-in">
                       <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 shadow-sm">
                          <CheckCircle className="w-10 h-10" />
                       </div>
                       <h3 className="font-bold text-green-800 text-xl mb-1">File Verified</h3>
                       <p className="text-green-600 font-mono bg-green-100 px-3 py-1 rounded text-sm">{details.uploadedFile}</p>
                       <button onClick={() => setDetails({...details, uploadedFile: undefined})} className="mt-6 text-sm text-red-500 hover:text-red-700 font-medium">Remove & Re-upload</button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-500">
                         <UploadCloud className="w-10 h-10" />
                      </div>
                      {uploadProgress > 0 && uploadProgress < 100 ? (
                        <div className="w-full max-w-xs">
                           <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                           </div>
                           <div className="w-full bg-slate-200 rounded-full h-3">
                              <div className="bg-blue-600 h-3 rounded-full transition-all duration-75" style={{ width: `${uploadProgress}%` }}></div>
                           </div>
                        </div>
                      ) : (
                         <>
                           <Button onClick={handleFileUpload} className="mb-4">Select Artwork (PDF/AI)</Button>
                           <p className="text-xs text-slate-400">Max 50MB. CMYK preferred.</p>
                         </>
                      )}
                    </div>
                  )}
               </div>
             </div>
          )}

          {/* STEP 6: REVIEW & COSTING */}
          {step === 6 && (
             <div className="animate-fadeIn max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Review & Pricing</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-fit">
                      <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Order Summary</h3>
                      <div className="space-y-4 text-sm">
                         <div className="flex justify-between">
                            <span className="text-slate-500">Service Type</span>
                            <span className="font-medium text-slate-900">{details.serviceType.replace(/_/g, ' ')}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-slate-500">Quantity</span>
                            <span className="font-medium text-slate-900">{details.quantity.toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-slate-500">Format</span>
                            <span className="font-medium text-slate-900">{details.size} ({details.finish})</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-slate-500">Target Areas</span>
                            <span className="font-medium text-slate-900">{selectedAreaIds.length} Zones ({totalHouseholds.toLocaleString()} HH)</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-slate-500">SLA Tier</span>
                            <span className="font-medium text-blue-600">{details.slaTier.replace(/_/g, ' ')}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-slate-500">Date</span>
                            <span className="font-medium text-slate-900">{details.distributionDate}</span>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-lg">
                      <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2 flex items-center">
                         <DollarSign className="w-5 h-5 mr-1 text-green-600" /> Cost Breakdown
                      </h3>
                      <div className="space-y-3 text-sm">
                         <div className="flex justify-between">
                            <span className="text-slate-600">Distribution Base</span>
                            <span className="font-medium">${distCost.toFixed(2)}</span>
                         </div>
                         {printCost > 0 && (
                           <div className="flex justify-between">
                              <span className="text-slate-600">Printing Services</span>
                              <span className="font-medium">${printCost.toFixed(2)}</span>
                           </div>
                         )}
                         {rushFee > 0 && (
                           <div className="flex justify-between text-amber-600">
                              <span>Priority Surcharge ({details.slaTier})</span>
                              <span className="font-medium">+${rushFee.toFixed(2)}</span>
                           </div>
                         )}
                         <div className="flex justify-between text-slate-500 text-xs">
                            <span>Fuel Surcharge ({(PRICING.fuelSurchargePercent * 100)}%)</span>
                            <span>${fuelSurcharge.toFixed(2)}</span>
                         </div>
                         <div className="flex justify-between text-slate-500 text-xs">
                            <span>HST ({(PRICING.taxRate * 100)}%)</span>
                            <span>${tax.toFixed(2)}</span>
                         </div>

                         <div className="border-t border-slate-200 my-4"></div>
                         
                         <div className="flex justify-between items-end">
                            <span className="font-bold text-xl text-slate-800">Total</span>
                            <span className="font-extrabold text-3xl text-blue-600">${total.toFixed(2)}</span>
                         </div>
                         <p className="text-xs text-slate-400 text-right mt-1">CAD Currency</p>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* STEP 7: PAYMENT */}
          {step === 7 && (
             <div className="animate-fadeIn max-w-md mx-auto pt-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Secure Checkout</h2>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner mb-6">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-500">Total Amount</span>
                      <span className="font-bold text-xl text-slate-900">${total.toFixed(2)}</span>
                   </div>
                   <div className="flex space-x-2 mt-4">
                      {['visa', 'mastercard', 'amex'].map(c => (
                         <div key={c} className="h-8 w-12 bg-white rounded border border-slate-300 flex items-center justify-center text-[10px] uppercase font-bold text-slate-400">
                            {c}
                         </div>
                      ))}
                   </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setProcessingPayment(true); setTimeout(() => { setProcessingPayment(false); onOrderComplete(); }, 2000); }}>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Name on Card</label>
                        <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="J. Doe" required />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Card Number</label>
                        <div className="relative">
                           <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                           <input type="text" className="w-full p-3 pl-10 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0000 0000 0000 0000" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                           <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Expiry</label>
                           <input type="text" className="w-full p-3 border border-slate-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 outline-none" placeholder="MM / YY" required />
                         </div>
                         <div>
                           <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">CVC</label>
                           <input type="password" className="w-full p-3 border border-slate-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 outline-none" placeholder="***" required />
                         </div>
                      </div>
                    </div>

                    <Button type="submit" isLoading={processingPayment} className="w-full py-4 text-lg shadow-xl shadow-blue-200 mt-8 rounded-xl">
                       Pay & Launch
                    </Button>
                    
                    <div className="text-center mt-4 flex items-center justify-center text-green-600 text-xs font-medium">
                       <ShieldCheck className="w-3 h-3 mr-1" /> 256-bit SSL Encrypted
                    </div>
                </form>
             </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex justify-between items-center">
           <Button variant="outline" onClick={prevStep} disabled={step === 1} className="border-slate-300">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
           </Button>
           
           {step < 7 && (
              <Button 
                onClick={nextStep} 
                disabled={
                  (step === 1 && selectedAreaIds.length === 0) || 
                  (step === 5 && !details.uploadedFile)
                }
                className="px-8"
              >
                {step === 6 ? 'Proceed to Payment' : 'Continue'} <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
           )}
        </div>
      </div>
    </div>
  );
};