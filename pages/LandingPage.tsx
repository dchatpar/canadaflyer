import React from 'react';
import { Button } from '../components/Button';
import { Map, Truck, ShieldCheck, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-blue-600 mr-2" />
              <span className="font-bold text-xl tracking-tight text-slate-900">CanFlyer</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-blue-600">Features</a>
              <a href="#pricing" className="hover:text-blue-600">Pricing</a>
              <a href="#enterprise" className="hover:text-blue-600">Enterprise</a>
              <a href="#contact" className="hover:text-blue-600">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={onEnterApp} className="text-slate-600 font-medium hover:text-blue-600">Log in</button>
              <Button onClick={onEnterApp}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeIn">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Now Live in 150+ Canadian Cities
            </div>
            <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
              Smart Flyer Delivery for <span className="text-blue-600">Modern Brands</span>.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Launch targeted door-to-door campaigns with real-time tracking, AI-validated proof of delivery, and heat-mapped analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onEnterApp} className="px-8 py-4 text-lg">
                Launch Campaign <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg">
                Calculate Costs
              </Button>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> No Minimums</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> GPS Tracking</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Canada Post Compatible</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1586864387789-628af9fea44a?auto=format&fit=crop&w=800&q=80" 
              alt="Dashboard Preview" 
              className="relative rounded-2xl shadow-2xl border border-slate-200"
            />
            {/* Floating UI Elements */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 animate-bounce-slow">
               <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                     <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                     <p className="text-xs text-slate-500 uppercase font-bold">Delivery Verified</p>
                     <p className="font-bold text-slate-900">14,205 Households</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Enterprise-Grade Distribution</h2>
            <p className="text-lg text-slate-600">Everything you need to manage nationwide campaigns from a single dashboard.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Map,
                title: "Precision Targeting",
                desc: "Select areas by postal code, neighborhood, or draw custom polygons. See household density and demographics instantly."
              },
              {
                icon: ShieldCheck,
                title: "AI-Verified Proof",
                desc: "Our Gemini AI analyzes every delivery photo to ensure flyers are visible, placed correctly, and not dumped."
              },
              {
                icon: BarChart3,
                title: "Live Analytics",
                desc: "Track cost-per-acquisition, delivery speeds, and coverage heatmaps in real-time."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badge Section */}
      <section className="py-16 bg-white">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-400 font-semibold uppercase tracking-widest text-sm mb-8">Trusted by Canadian Industry Leaders</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
               {/* Simple Text Placeholders for Logos */}
               <span className="text-2xl font-bold text-slate-800">RE/MAX</span>
               <span className="text-2xl font-bold text-slate-800">TIM HORTONS</span>
               <span className="text-2xl font-bold text-slate-800">CANADIAN TIRE</span>
               <span className="text-2xl font-bold text-slate-800">ROGERS</span>
               <span className="text-2xl font-bold text-slate-800">H&R BLOCK</span>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
               <div className="flex items-center text-white font-bold text-xl mb-2">
                  <Truck className="w-6 h-6 mr-2" /> CanFlyer
               </div>
               <p className="text-sm">© 2025 CanFlyer Logistics Inc. Toronto, ON.</p>
            </div>
            <div className="flex space-x-6 text-sm">
               <a href="#" className="hover:text-white">Privacy (PIPEDA)</a>
               <a href="#" className="hover:text-white">Terms</a>
               <a href="#" className="hover:text-white">Accessibility</a>
               <a href="#" className="hover:text-white">Français</a>
            </div>
         </div>
      </footer>
    </div>
  );
};