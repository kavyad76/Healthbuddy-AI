
import React from 'react';
import { Icons } from '../constants';

const Sidebar: React.FC = () => {
  const categories = [
    { name: "Symptom Checker", icon: "🤒", description: "Learn about your symptoms" },
    { name: "Medication Info", icon: "💊", description: "Common usage & side effects" },
    { name: "Preventive Care", icon: "🛡️", description: "Tips for staying healthy" },
    { name: "Healthy Lifestyle", icon: "🍏", description: "Nutrition and exercise" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-slate-200 h-full overflow-y-auto">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-sky-600 p-2 rounded-lg">
            <Icons.Heart />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Healio</h1>
        </div>
        <p className="text-xs text-slate-500 font-medium">Your empathetic health companion</p>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Insights</h2>
          <div className="space-y-3">
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                className="w-full text-left p-3 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all duration-200 group"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 group-hover:text-sky-600 transition-colors">{cat.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{cat.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
          <div className="flex items-center space-x-2 mb-2">
            <Icons.Emergency />
            <h3 className="text-sm font-bold text-rose-700">Emergencies</h3>
          </div>
          <p className="text-xs text-rose-600 leading-relaxed mb-3">
            If you're experiencing life-threatening symptoms, please call emergency services immediately.
          </p>
          <a 
            href="tel:911" 
            className="block text-center bg-rose-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-rose-700 transition-colors shadow-sm"
          >
            CALL EMERGENCY
          </a>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-sm font-bold mb-1">Health Tip of the Day</h3>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "Stay hydrated! Aim for at least 8 glasses of water a day to keep your body functioning at its best."
            </p>
          </div>
          <div className="absolute -bottom-2 -right-2 opacity-10">
            <Icons.Heart />
          </div>
        </div>
      </div>

      <div className="mt-auto p-6 text-[10px] text-slate-400 italic leading-snug border-t border-slate-100">
        Disclaimer: Healio provides information, not medical diagnosis or treatment. Always consult a physician.
      </div>
    </aside>
  );
};

export default Sidebar;
