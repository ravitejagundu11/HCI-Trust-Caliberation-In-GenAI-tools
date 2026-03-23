import { useState } from 'react';
import { tasks } from './data';

function App() {
  const [indicatorType, setIndicatorType] = useState(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [actions, setActions] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  // START SCREEN
  if (!indicatorType) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-4 text-slate-800">
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border border-white relative overflow-hidden">
          {/* Decorative blur blob */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#12887a]/10 rounded-full blur-3xl"></div>
          
          <div className="w-16 h-16 bg-gradient-to-tr from-[#12887a] to-[#20b2a3] rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-[#12887a]/30 mb-8 mx-auto transform hover:rotate-6 transition-transform">✨</div>
          <h1 className="text-3xl font-extrabold mb-2 text-center text-slate-800 tracking-tight">Writing Assistant</h1>
          <p className="text-slate-500 mb-8 text-center text-sm font-medium">Select an indicator mode below to begin the user study.</p>
          
          <div className="flex flex-col gap-4 relative z-10">
            <button 
              onClick={() => setIndicatorType('none')} 
              className="group relative px-5 py-4 bg-[#f8f9fa] hover:bg-[#e9ecef] border border-slate-200 rounded-xl font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 text-left flex items-center justify-between"
            >
              Control - No Indicator
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">→</span>
            </button>
            <button 
              onClick={() => setIndicatorType('numeric')} 
              className="group relative px-5 py-4 bg-[#f0fdfa] hover:bg-[#ccfbf1] border border-teal-200 text-teal-900 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-teal-500/10 active:scale-95 text-left flex items-center justify-between"
            >
              Numeric Confidence Score
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-600">→</span>
            </button>
            <button 
              onClick={() => setIndicatorType('qualitative')} 
              className="group relative px-5 py-4 bg-[#fff7ed] hover:bg-[#fef3c7] border border-orange-200 text-orange-900 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-500/10 active:scale-95 text-left flex items-center justify-between"
            >
              Qualitative Uncertainty Label
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-600">→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUMMARY SCREEN
  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-4 py-12">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl w-full border border-white">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-green-500/30 mb-6 mx-auto">🎉</div>
            <h1 className="text-3xl font-extrabold mb-2 text-slate-800 tracking-tight">Study Completed</h1>
            <p className="text-slate-500 font-medium">Thank you for participating! Here is a summary of your actions.</p>
          </div>
          
          <div className="space-y-4 mb-10">
            {actions.map((action, idx) => (
              <div key={idx} className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{action.taskTitle}</h3>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span> 
                    Mode: <span className="font-semibold text-slate-600 capitalize">{indicatorType}</span>
                  </div>
                </div>
                <span className={`px-4 py-2 text-sm font-bold rounded-lg shadow-sm w-fit ${
                  action.decision === 'Accept & Insert' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 
                  action.decision === 'Accept & Edit' ? 'bg-sky-100 text-sky-800 border border-sky-200' :
                  action.decision === 'Reject' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                  'bg-slate-200 text-slate-800 border border-slate-300'
                }`}>
                  {action.decision}
                </span>
              </div>
            ))}
            {actions.length === 0 && <div className="p-8 text-center text-slate-400 font-medium border-2 border-dashed border-slate-200 rounded-2xl">No actions recorded. Session ended early.</div>}
          </div>

          <div className="flex justify-center border-t border-slate-100 pt-8">
            <button 
              onClick={() => {
                setIndicatorType(null);
                setCurrentTaskIndex(0);
                setActions([]);
                setIsFinished(false);
              }}
              className="px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 hover:shadow-lg transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2"
            >
              <span>↺</span> Restart Simulation
            </button>
          </div>
        </div>
      </div>
    );
  }

  const task = tasks[currentTaskIndex];

  const handleAction = (decision) => {
    if (decision === 'End') {
      setIsFinished(true);
      return;
    }

    setActions([...actions, { 
      taskId: task.id, 
      taskTitle: task.title, 
      decision 
    }]);

    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaedf1] flex justify-center py-12 px-4 selection:bg-teal-200">
      <div className="max-w-4xl w-full font-sans transition-all">
        {/* Header Ribbon */}
        <div className={`rounded-t-2xl px-8 py-5 flex justify-between items-center text-white shadow-md transition-colors duration-500 ${
          indicatorType === 'none' ? 'bg-gradient-to-r from-slate-700 to-slate-800' : 
          indicatorType === 'numeric' ? 'bg-gradient-to-r from-[#0f8a7e] to-[#14b8a6]' : 
          'bg-gradient-to-r from-[#d57022] to-[#ea580c]'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-inner border border-white/20">✨</div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight leading-tight drop-shadow-sm">AI Writing Assistant</h1>
              <p className="text-xs text-white/80 font-semibold tracking-wide uppercase mt-0.5">Research Study Interface</p>
            </div>
          </div>
          <div className="flex items-center gap-4 hidden sm:flex">
            <span className="text-sm px-5 py-2 bg-black/20 backdrop-blur-md rounded-full font-bold shadow-inner border border-white/10 uppercase tracking-wider">
              {indicatorType === 'none' ? 'Control — No Indicator' : 
               indicatorType === 'numeric' ? 'Numeric Confidence Score' : 
               'Qualitative Uncertainty Label'}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-b-2xl shadow-2xl shadow-slate-200/50 border border-slate-200 border-t-0 p-8 sm:p-10 space-y-8 relative">
          <div className="absolute top-6 right-8 text-sm text-slate-400 font-bold tracking-widest uppercase py-1 px-3 bg-slate-100 rounded-full">
            Task {currentTaskIndex + 1}/{tasks.length}
          </div>

          <div className="border border-slate-200 rounded-2xl p-7 bg-white shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xs font-bold text-[#d57022] tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d57022]"></span> Writing Task
            </h3>
            <p className="text-slate-700 leading-relaxed text-[16px]">{task.taskDesc}</p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-7 bg-slate-50/50 shadow-inner">
            <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-300"></span> Your Draft
            </h3>
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed border border-slate-200 bg-white p-5 rounded-xl shadow-sm text-[16px] text-justify">{task.draft}</p>
          </div>

          <div className="border-2 border-[#e5e7eb] rounded-2xl p-7 bg-[#fcfcfc] shadow-sm relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-300"></span> AI-Generated Continuation
              </h3>
              <span className="text-xs font-bold text-[#d57022] flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-md border border-orange-100">
                <span className="w-2 h-2 rounded-full bg-[#d57022] animate-pulse"></span> Generated
              </span>
            </div>
            
            <div className="bg-[#fcfbf7] border border-orange-100/60 rounded-xl p-6 shadow-sm mb-8 text-justify">
              <p className="text-slate-800 whitespace-pre-wrap leading-relaxed text-[16px]">{task.aiResponse}</p>
            </div>

            {indicatorType === 'numeric' && (
               <div className="border-2 border-emerald-200 bg-emerald-50 rounded-xl p-6 mb-8 shadow-sm transform hover:scale-[1.01] transition-transform">
                 <div className="flex items-center mb-5">
                   <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase mr-auto mt-1 flex items-center gap-2">
                     📊 Model Confidence Score
                   </span>
                   <span className="text-3xl font-extrabold text-emerald-600 tracking-tight drop-shadow-sm">{task.confidenceNumeric}%</span>
                 </div>
                 <div className="w-full bg-emerald-200/50 rounded-full h-3.5 mb-5 overflow-hidden shadow-inner">
                   <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-3.5 rounded-full shadow-md" style={{ width: `${task.confidenceNumeric}%` }}></div>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-emerald-800 bg-emerald-100/50 p-3 rounded-lg border border-emerald-100">
                    <span className="font-bold flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>{task.confidenceLabel}</span>
                    <span className="opacity-90">{task.confidenceTip}</span>
                 </div>
               </div>
            )}

            {indicatorType === 'qualitative' && (
              <div className="border border-amber-400 bg-[#fff9e6] rounded-xl overflow-hidden mb-8 shadow-md transform hover:scale-[1.01] transition-transform">
                <div className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#d57022] to-orange-600 text-white rounded-full flex items-center justify-center font-extrabold text-2xl shadow-lg ring-4 ring-orange-100">!</div>
                  <div>
                    <h4 className="text-[#8c4611] font-extrabold text-xl mb-1.5 tracking-tight">{task.confidenceLabel}</h4>
                    <p className="text-[#b25712] text-sm leading-relaxed font-medium">The AI system is uncertain about parts of this response. Claims may be inaccurate or unverified.</p>
                  </div>
                </div>
                <div className="bg-[#fff4cc] px-6 py-4 text-sm text-[#8c4611] border-t border-amber-200 gap-2 flex items-center">
                  <strong className="tracking-widest uppercase text-xs opacity-80 mr-2 border border-amber-300 py-1 px-2 rounded bg-amber-100">Tip</strong> <span className="font-medium">Review each claim carefully before accepting. Consider editing or verifying statements independently.</span>
                </div>
              </div>
            )}

            {indicatorType === 'none' && <div className="mb-8"></div>}

            <div className="flex flex-wrap justify-end gap-3 mt-4 pt-8 border-t border-slate-100">
              <button onClick={() => handleAction('End')} className="px-6 py-3 mr-auto text-slate-500 bg-white hover:bg-slate-50 rounded-xl font-bold transition-all duration-200 shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow active:scale-95 flex items-center gap-2">
                End Early
              </button>
              
              <button onClick={() => handleAction('Reject')} className="px-6 py-3 text-slate-700 bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 rounded-xl font-bold transition-all duration-200 shadow-sm border border-slate-300 hover:shadow active:scale-95">
                Reject
              </button>
              <button onClick={() => handleAction('Accept & Edit')} className="px-6 py-3 text-slate-800 bg-white hover:bg-sky-50 hover:text-sky-800 hover:border-sky-300 rounded-xl font-bold transition-all duration-200 shadow-sm border border-slate-300 hover:shadow active:scale-95">
                Accept & Edit
              </button>
              <button onClick={() => handleAction('Accept & Insert')} className="px-8 py-3 bg-gradient-to-b from-[#12887a] to-[#0d695e] text-white hover:from-[#0f7c6e] hover:to-[#0a564d] rounded-xl font-bold transition-all duration-200 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 active:scale-95 border border-teal-800/20 flex items-center gap-2">
                Accept & Insert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
