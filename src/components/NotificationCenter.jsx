"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function NotificationCenter({ lang, content }) {
  const [alerts, setAlerts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const previousAlertCountRef = useRef(0);
  const pathname = usePathname();

  // Close modal when navigating to profile
  useEffect(() => {
    if (pathname.includes('/profile')) {
      setShowModal(false);
    }
  }, [pathname]);

  // Function to fetch alerts
  const fetchAlerts = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        const userAlerts = data.user?.alerts || [];
        
        // Check if we have new alerts compared to previous count
        if (userAlerts.length > previousAlertCountRef.current) {
          // New alerts arrived
          setAlerts(userAlerts);
          setShowModal(true);
          previousAlertCountRef.current = userAlerts.length;
        } else if (userAlerts.length > 0 && previousAlertCountRef.current === 0) {
          // First time loading alerts
          const hasShown = sessionStorage.getItem('alertsNotificationShown');
          if (!hasShown) {
            setAlerts(userAlerts);
            setShowModal(true);
            sessionStorage.setItem('alertsNotificationShown', 'true');
            previousAlertCountRef.current = userAlerts.length;
          } else {
            previousAlertCountRef.current = userAlerts.length;
          }
        } else {
          // Update alert count even if modal not shown
          previousAlertCountRef.current = userAlerts.length;
        }
      }
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch alerts on mount and set up interval (runs once)
  useEffect(() => {
    fetchAlerts();
    
    // Poll every 30 seconds (reasonable for notifications)
    const interval = setInterval(fetchAlerts, 30000);

    return () => clearInterval(interval);
  }, []);

  // Severity color mapping
  const severityColors = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    danger: 'bg-red-500/10 border-red-500/30 text-red-300',
  };

  const severityIcons = {
    info: 'ℹ️',
    warning: '⚠️',
    danger: '🚨',
  };

  const severityLabels = {
    info: content?.alert_severity?.info || 'Information',
    warning: content?.alert_severity?.warning || 'Warning',
    danger: content?.alert_severity?.danger || 'Danger',
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

  if (!showModal || loading || alerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-secondary border border-border rounded-3xl max-w-2xl w-full p-8 md:p-10 shadow-2xl animate-in fade-in scale-in-95 duration-300 max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-600/20 flex items-center justify-center">
              <span className="text-3xl">🔔</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {content?.alerts || 'Alerts'}
              </h2>
              <p className="text-sm text-muted mt-1">
                {alerts.length} {alerts.length === 1 ? (lang === 'ar' ? 'تنبيه' : 'Alert') : (lang === 'ar' ? 'تنبيهات' : 'Alerts')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white font-bold text-lg">
              {alerts.length}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-10 h-10 rounded-full bg-tertiary hover:bg-white/10 text-muted hover:text-foreground transition-all flex items-center justify-center text-xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
          {[...alerts].reverse().map((alert, i) => (
            <div
              key={i}
              className={`border rounded-2xl p-5 transition-all hover:border-opacity-100 ${
                i === 0 
                  ? `${severityColors[alert.severity] || severityColors.info} scale-105 shadow-lg shadow-red-500/20 ring-2 ring-red-500/40 animate-pulse` 
                  : severityColors[alert.severity] || severityColors.info
              }`}
            >
              <div className="flex gap-4">
                <span className="text-3xl flex-shrink-0">
                  {severityIcons[alert.severity] || severityIcons.info}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold uppercase tracking-wider opacity-80">
                      {severityLabels[alert.severity] || alert.severity}
                    </span>
                    <span className="text-xs opacity-60">
                      {formatDate(alert.timestamp)}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed break-words text-foreground">
                    {alert.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-border/50">
          <button
            onClick={() => setShowModal(false)}
            className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-foreground font-bold rounded-xl transition-all text-center"
          >
            {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
