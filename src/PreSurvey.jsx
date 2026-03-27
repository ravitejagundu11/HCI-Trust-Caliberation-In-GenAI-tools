import { useState } from 'react';

function LikertRow({ statement, field, value, onChange }) {
  return (
    <div className="py-4 border-b border-slate-100 last:border-0">
      <p className="text-sm text-slate-700 font-medium mb-3">{statement}</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className="flex-1 cursor-pointer">
            <input
              type="radio"
              name={field}
              value={n}
              checked={value === n}
              onChange={() => onChange(field, n)}
              className="sr-only"
            />
            <div className={`text-center py-2 rounded-lg border-2 text-sm font-bold transition-all ${
              value === n
                ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                : 'border-slate-200 text-slate-500 hover:border-teal-300 hover:bg-teal-50'
            }`}>
              {n}
            </div>
          </label>
        ))}
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-1 px-1">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
    </div>
  );
}

const AI_TOOLS = ['ChatGPT', 'GitHub Copilot', 'Google Gemini', 'Grammarly AI'];

export default function PreSurvey({ onSubmit }) {
  const [form, setForm] = useState({
    academicYear: '',
    fieldOfStudy: '',
    aiUsageFrequency: '',
    toolsUsed: [],
    likert_trust: null,
    likert_confident: null,
    likert_benefit: null,
  });

  const setField = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const toggleTool = (tool) => {
    setForm(f => ({
      ...f,
      toolsUsed: f.toolsUsed.includes(tool)
        ? f.toolsUsed.filter(t => t !== tool)
        : [...f.toolsUsed, tool],
    }));
  };

  const isValid =
    form.academicYear &&
    form.fieldOfStudy.trim() &&
    form.aiUsageFrequency &&
    form.likert_trust &&
    form.likert_confident &&
    form.likert_benefit;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-4 py-12 flex justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-white p-10">
          <div className="mb-8">
            <div className="w-12 h-12 bg-gradient-to-tr from-[#12887a] to-[#20b2a3] rounded-xl flex items-center justify-center text-2xl shadow-md mb-5">
              📋
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Background Survey</h1>
            <p className="text-slate-500 text-sm mt-1">
              Before we begin the tasks, please answer a few questions about yourself. This takes about 4–5 minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Academic Year */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Academic Year</label>
              <select
                value={form.academicYear}
                onChange={e => setField('academicYear', e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-slate-50"
              >
                <option value="">Select...</option>
                {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'Other'].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Field of Study</label>
              <input
                type="text"
                value={form.fieldOfStudy}
                onChange={e => setField('fieldOfStudy', e.target.value)}
                placeholder="e.g. Computer Science, English Literature..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-slate-50"
              />
            </div>

            {/* AI Usage Frequency */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                How often do you use AI writing tools per week?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Never', '1–2 times', '3–5 times', 'Daily'].map(freq => (
                  <label key={freq} className="cursor-pointer">
                    <input
                      type="radio"
                      name="frequency"
                      value={freq}
                      checked={form.aiUsageFrequency === freq}
                      onChange={() => setField('aiUsageFrequency', freq)}
                      className="sr-only"
                    />
                    <div className={`text-center py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                      form.aiUsageFrequency === freq
                        ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                        : 'border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50'
                    }`}>
                      {freq}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Tools Used */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Which AI writing tools have you used?{' '}
                <span className="text-slate-400 font-normal">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {AI_TOOLS.map(tool => (
                  <label key={tool} className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.toolsUsed.includes(tool)}
                      onChange={() => toggleTool(tool)}
                      className="sr-only"
                    />
                    <div className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all flex items-center gap-2 ${
                      form.toolsUsed.includes(tool)
                        ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                        : 'border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50'
                    }`}>
                      <span className="w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold border-current">
                        {form.toolsUsed.includes(tool) ? '✓' : ''}
                      </span>
                      {tool}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Likert Section */}
            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">
                Rate your agreement with each statement{' '}
                <span className="text-slate-400 font-normal">(1 = Strongly Disagree, 5 = Strongly Agree)</span>
              </p>
              <div className="border border-slate-200 rounded-2xl px-5 py-2 mt-3">
                <LikertRow
                  statement="I usually trust AI writing suggestions without verifying them."
                  field="likert_trust"
                  value={form.likert_trust}
                  onChange={setField}
                />
                <LikertRow
                  statement="I feel confident evaluating the accuracy of AI-generated text."
                  field="likert_confident"
                  value={form.likert_confident}
                  onChange={setField}
                />
                <LikertRow
                  statement="I would benefit from knowing how confident an AI is in its output."
                  field="likert_benefit"
                  value={form.likert_benefit}
                  onChange={setField}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 ${
                isValid
                  ? 'bg-gradient-to-b from-[#12887a] to-[#0d695e] text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 active:scale-95'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Begin Tasks →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
