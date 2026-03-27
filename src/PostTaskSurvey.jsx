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

const REVIEW_TIMES = ['< 15 seconds', '15–30 seconds', '30–60 seconds', '> 60 seconds'];

const DECISION_STYLES = {
  'Accept & Insert': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  'Accept & Edit': 'bg-sky-100 text-sky-800 border border-sky-200',
  'Reject': 'bg-rose-100 text-rose-800 border border-rose-200',
};

export default function PostTaskSurvey({ task, decision, indicatorType, taskNumber, totalTasks, onSubmit }) {
  const [form, setForm] = useState({
    reviewTime: '',
    likert_trusted: null,
    likert_accurate: null,
    likert_indicatorInfluenced: null,
    likert_confident: null,
    openEnded: '',
  });

  const setField = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const showIndicatorQuestion = indicatorType !== 'none';

  const isValid =
    form.reviewTime &&
    form.likert_trusted &&
    form.likert_accurate &&
    (!showIndicatorQuestion || form.likert_indicatorInfluenced) &&
    form.likert_confident;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    const data = { ...form };
    if (!showIndicatorQuestion) delete data.likert_indicatorInfluenced;
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-4 py-12 flex justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-white p-10">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase bg-slate-100 px-3 py-1 rounded-full">
                Task {taskNumber}/{totalTasks} — Reflection
              </span>
              <span className={`px-3 py-1 text-xs font-bold rounded-lg ${DECISION_STYLES[decision] ?? 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                {decision}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Quick Reflection</h1>
            <p className="text-slate-500 text-sm mt-1">
              A few quick questions about the task you just completed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Review Time */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                How long did you spend reviewing the AI suggestion before deciding?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {REVIEW_TIMES.map(t => (
                  <label key={t} className="cursor-pointer">
                    <input
                      type="radio"
                      name="reviewTime"
                      value={t}
                      checked={form.reviewTime === t}
                      onChange={() => setField('reviewTime', t)}
                      className="sr-only"
                    />
                    <div className={`text-center py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                      form.reviewTime === t
                        ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                        : 'border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50'
                    }`}>
                      {t}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Likert Section */}
            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">
                Rate your agreement{' '}
                <span className="text-slate-400 font-normal">(1 = Strongly Disagree, 5 = Strongly Agree)</span>
              </p>
              <div className="border border-slate-200 rounded-2xl px-5 py-2 mt-3">
                <LikertRow
                  statement="I trusted this AI suggestion."
                  field="likert_trusted"
                  value={form.likert_trusted}
                  onChange={setField}
                />
                <LikertRow
                  statement="I believe the AI's response was factually accurate."
                  field="likert_accurate"
                  value={form.likert_accurate}
                  onChange={setField}
                />
                {showIndicatorQuestion && (
                  <LikertRow
                    statement="The confidence indicator influenced my decision."
                    field="likert_indicatorInfluenced"
                    value={form.likert_indicatorInfluenced}
                    onChange={setField}
                  />
                )}
                <LikertRow
                  statement="I felt confident in my ability to evaluate this AI response."
                  field="likert_confident"
                  value={form.likert_confident}
                  onChange={setField}
                />
              </div>
            </div>

            {/* Open-Ended */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Did anything about the suggestion or confidence indicator affect your decision?{' '}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={form.openEnded}
                onChange={e => setField('openEnded', e.target.value)}
                rows={3}
                placeholder="Share your thoughts..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-slate-50 resize-none"
              />
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
              {taskNumber < totalTasks ? `Continue to Task ${taskNumber + 1} →` : 'View Summary →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
