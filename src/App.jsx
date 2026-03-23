import { useState } from 'react';
import { tasks } from './data';

function App() {
  const [indicatorType, setIndicatorType] = useState(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [actions, setActions] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  if (!indicatorType) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">AI Writing Assistant Study</h1>
          <p className="text-gray-600 mb-6 text-center">Select the UI Indicator Type to test:</p>
          <div className="flex flex-col gap-4">
            <button onClick={() => setIndicatorType('none')} className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-md font-medium text-gray-800 transition">Control - No Indicator</button>
            <button onClick={() => setIndicatorType('numeric')} className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md font-medium transition">Numeric Confidence Score</button>
            <button onClick={() => setIndicatorType('qualitative')} className="px-4 py-3 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-md font-medium transition">Qualitative Uncertainty Label</button>
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Study Completed</h1>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Summary of User Actions:</h2>
          
          <div className="space-y-4">
            {actions.map((action, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">{action.taskTitle}</span>
                  <span className={`px-2 py-1 text-sm rounded ${
                    action.decision === 'Accept & Insert' ? 'bg-green-100 text-green-800' : 
                    action.decision === 'Accept & Edit' ? 'bg-blue-100 text-blue-800' :
                    action.decision === 'Reject' ? 'bg-red-100 text-red-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {action.decision}
                  </span>
                </div>
                <div className="text-sm text-gray-500">Indicator shown: {indicatorType}</div>
              </div>
            ))}
            {actions.length === 0 && <p className="text-gray-500 italic">No actions recorded.</p>}
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => {
                setIndicatorType(null);
                setCurrentTaskIndex(0);
                setActions([]);
                setIsFinished(false);
              }}
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
            >
              Restart Simulation
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
    <div className="min-h-screen bg-[#f8f9fa] flex justify-center py-10 px-4">
      <div className="max-w-4xl w-full">
        {/* Header Ribbon */}
        <div className={`rounded-t-xl px-6 py-4 flex justify-between items-center text-white shadow-sm ${
          indicatorType === 'none' ? 'bg-[#3b4b5e]' : 
          indicatorType === 'numeric' ? 'bg-[#0f8a7e]' : 
          'bg-[#d57022]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center text-xl shadow-inner">✨</div>
            <div>
              <h1 className="font-bold text-lg leading-tight">AI Writing Assistant</h1>
              <p className="text-xs opacity-90 font-medium">Research Study Interface</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm px-4 py-1.5 bg-black/20 rounded-full font-medium shadow-inner border border-white/10">
              {indicatorType === 'none' ? 'Control — No Indicator' : 
               indicatorType === 'numeric' ? 'Numeric Confidence Score' : 
               'Qualitative Uncertainty Label'}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-b-xl shadow-md border border-gray-200 border-t-0 p-8 space-y-6">
          <div className="flex justify-end text-sm text-gray-500 font-medium tracking-wide">
            Task {currentTaskIndex + 1}/{tasks.length}
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xs font-bold text-[#d57022] tracking-wider uppercase mb-3">Writing Task</h3>
            <p className="text-gray-700 leading-relaxed text-[15px]">{task.taskDesc}</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50/50 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3 text-shadow-sm">Your Draft</h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed border border-gray-200 bg-white p-4 rounded-md shadow-inner text-[15px]">{task.draft}</p>
          </div>

          <div className="border border-[#e5e7eb] rounded-xl p-6 bg-[#fcfcfc] shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">AI-Generated Continuation</h3>
              <span className="text-xs font-bold text-[#d57022] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#d57022]"></span> Generated
              </span>
            </div>
            
            <div className="bg-[#fcfbf7] border border-orange-100 rounded-md p-5 shadow-sm mb-6">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-[15px]">{task.aiResponse}</p>
            </div>

            {indicatorType === 'numeric' && (
               <div className="border border-green-200 bg-green-50 rounded-lg p-5 mb-6 shadow-sm">
                 <div className="flex items-center mb-4">
                   <span className="text-xs font-bold text-green-800 tracking-wider uppercase mr-auto mt-1">Model Confidence Score</span>
                   <span className="text-2xl font-bold text-green-600 tracking-tight">{task.confidenceNumeric}%</span>
                 </div>
                 <div className="w-full bg-green-200/50 rounded-full h-3 mb-4 overflow-hidden">
                   <div className="bg-green-500 h-3 rounded-full shadow-inner" style={{ width: `${task.confidenceNumeric}%` }}></div>
                 </div>
                 <div className="flex flex-col gap-1 text-sm text-green-700">
                    <span className="font-semibold">{task.confidenceLabel}</span>
                    <span className="opacity-80">{task.confidenceTip}</span>
                 </div>
               </div>
            )}

            {indicatorType === 'qualitative' && (
              <div className="border border-yellow-400 rounded-lg overflow-hidden mb-6 shadow-sm">
                <div className="bg-[#fff9e6] p-5 flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#d57022] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm mt-0.5">!</div>
                  <div>
                    <h4 className="text-[#8c4611] font-bold text-lg mb-1">{task.confidenceLabel}</h4>
                    <p className="text-[#b25712] text-sm leading-relaxed">{task.confidenceTip}</p>
                  </div>
                </div>
                <div className="bg-[#fff4cc] px-5 py-3 text-sm text-[#8c4611] border-t border-yellow-300 gap-2 flex items-center">
                  <strong className="tracking-wide">Tip:</strong> Review each claim carefully before accepting. Consider editing or verifying statements independently.
                </div>
              </div>
            )}

            {indicatorType === 'none' && <div className="mb-6"></div>}

            <div className="flex justify-end gap-3 mt-4 pt-6 text-sm">
              <button onClick={() => handleAction('End')} className="px-5 py-2.5 mr-auto text-gray-500 bg-white hover:bg-gray-50 rounded-md font-medium transition shadow-sm border border-transparent hover:border-gray-200">End Early</button>
              
              <button onClick={() => handleAction('Reject')} className="px-5 py-2.5 text-gray-600 border border-gray-300 bg-white hover:bg-gray-50 rounded-md font-semibold transition shadow-sm">Reject</button>
              <button onClick={() => handleAction('Accept & Edit')} className="px-5 py-2.5 text-gray-700 border border-gray-400 bg-white hover:bg-gray-50 rounded-md font-semibold transition shadow-sm">Accept & Edit</button>
              <button onClick={() => handleAction('Accept & Insert')} className="px-5 py-2.5 bg-[#12887a] text-white hover:bg-[#0e7468] rounded-md font-semibold transition shadow-sm">Accept & Insert</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
