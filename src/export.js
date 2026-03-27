export function exportJSON(sessionData) {
  const blob = new Blob([JSON.stringify(sessionData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `session_${sessionData.sessionId}_${sessionData.condition}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportCSV(sessionData) {
  const { sessionId, timestamp, condition, preSurvey, tasks } = sessionData;

  const headers = [
    'sessionId', 'timestamp', 'condition',
    'pre_academicYear', 'pre_fieldOfStudy', 'pre_aiUsageFrequency', 'pre_toolsUsed',
    'pre_likert_trust', 'pre_likert_confident', 'pre_likert_benefit',
    'taskNumber', 'taskId', 'taskTitle', 'decision',
    'post_reviewTime', 'post_likert_trusted', 'post_likert_accurate',
    'post_likert_indicatorInfluenced', 'post_likert_confident', 'post_openEnded',
  ];

  function q(val) {
    if (val === null || val === undefined) return '';
    return `"${String(val).replace(/"/g, '""')}"`;
  }

  const rows = tasks.map((t, i) => [
    q(sessionId),
    q(timestamp),
    q(condition),
    q(preSurvey?.academicYear),
    q(preSurvey?.fieldOfStudy),
    q(preSurvey?.aiUsageFrequency),
    q((preSurvey?.toolsUsed ?? []).join('; ')),
    preSurvey?.likert_trust ?? '',
    preSurvey?.likert_confident ?? '',
    preSurvey?.likert_benefit ?? '',
    i + 1,
    t.taskId,
    q(t.taskTitle),
    q(t.decision),
    q(t.postSurvey?.reviewTime),
    t.postSurvey?.likert_trusted ?? '',
    t.postSurvey?.likert_accurate ?? '',
    t.postSurvey?.likert_indicatorInfluenced ?? '',
    t.postSurvey?.likert_confident ?? '',
    q(t.postSurvey?.openEnded),
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `session_${sessionId}_${condition}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
