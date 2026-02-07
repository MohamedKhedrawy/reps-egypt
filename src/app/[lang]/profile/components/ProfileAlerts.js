"use client";

export default function ProfileAlerts({ user, content, lang }) {
  const alerts = user.alerts || [];
  const notes = user.activityNotes || [];

  // Severity color mapping
  const severityColors = {
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    warning: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    danger: 'bg-red-500/10 border-red-500/20 text-red-400',
  };

  const severityIcons = {
    info: 'ℹ️',
    warning: '⚠️',
    danger: '🚨',
  };

  const severityLabels = {
    info: content.alert_severity?.info || 'Information',
    warning: content.alert_severity?.warning || 'Warning',
    danger: content.alert_severity?.danger || 'Danger',
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Alerts Section */}
      <div className="bg-secondary/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="p-1.5 bg-tertiary rounded-lg">🔔</span>
            {content.alerts || 'Alerts'}
            {alerts.length > 0 && (
              <span className="ml-2 px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm font-bold">
                {alerts.length}
              </span>
            )}
          </h2>
        </div>

        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted">
            <p className="text-sm">{content.no_alerts || 'No alerts at the moment'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className={`border rounded-xl p-4 ${severityColors[alert.severity] || severityColors.info}`}
              >
                <div className="flex gap-3">
                  <span className="text-xl flex-shrink-0">
                    {severityIcons[alert.severity] || severityIcons.info}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase opacity-75">
                        {severityLabels[alert.severity] || alert.severity}
                      </span>
                      <span className="text-xs opacity-60">
                        {formatDate(alert.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed break-words">
                      {alert.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Notes Section */}
      <div className="bg-secondary/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="p-1.5 bg-tertiary rounded-lg">📋</span>
            {content.activity_log || 'Activity Log'}
            {notes.length > 0 && (
              <span className="ml-2 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-bold">
                {notes.length}
              </span>
            )}
          </h2>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-8 text-muted">
            <p className="text-sm">{content.no_notes || 'No activity notes yet'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note, i) => (
              <div
                key={i}
                className="border border-border/50 rounded-xl p-4 bg-tertiary/30 hover:bg-tertiary/40 transition-colors"
              >
                <div className="flex gap-3">
                  <span className="text-lg flex-shrink-0">📝</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed break-words text-foreground">
                      {note.message}
                    </p>
                    <p className="text-xs text-muted mt-2 opacity-75">
                      {formatDate(note.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
