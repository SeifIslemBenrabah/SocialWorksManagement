import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { AuthData } from '../Auth/AuthWrapper';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const STATUS_COLORS = {
  Waiting: 'text-orange-600',
  Accepted: 'text-green-600',
  Complet: 'text-blue-600',
  Incomplet: 'text-red-600',
};

const timeAgo = (date) => {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const NotificationBell = () => {
  const { User } = AuthData();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/notifications`, {
        headers: { Authorization: `Bearer ${User?.token}` },
      });
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch {
      // silently fail — bell is non-critical
    }
  }, [User?.token]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleOpen = async () => {
    setOpen(o => !o);
    if (!open && unread > 0) {
      try {
        await axios.put(`${API}/notifications/read-all`, {}, {
          headers: { Authorization: `Bearer ${User?.token}` },
        });
        setNotifications(n => n.map(x => ({ ...x, isRead: true })));
      } catch {
        // ignore
      }
    }
  };

  const unread = notifications.filter(n => !n.isRead).length;

  const statusFromMessage = (msg) => {
    for (const s of ['Waiting', 'Accepted', 'Complet', 'Incomplet']) {
      if (msg.includes(`"${s}"`)) return s;
    }
    return null;
  };

  return (
    <div className="relative px-6" ref={ref}>
      <button
        onClick={handleOpen}
        className="flex flex-row gap-3 w-full py-2.5 rounded-xl transition-colors text-gray-400 hover:bg-gray-50 hover:text-gray-700 relative"
        aria-label="Notifications"
      >
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </div>
        <p className="hidden md:block">Notifications</p>
      </button>

      {open && (
        <div className="absolute left-full ml-2 bottom-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <p className="font-bold text-dblue text-sm">Notifications</p>
            {unread === 0 && <p className="text-xs text-gray-400">All caught up</p>}
          </div>
          <div className="flex flex-col max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">No notifications yet.</p>
            ) : notifications.map(n => {
              const status = statusFromMessage(n.message);
              return (
                <div
                  key={n.id}
                  className={`flex gap-3 px-4 py-3 border-b border-gray-50 last:border-0 ${!n.isRead ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="w-2 h-2 rounded-full bg-pblue mt-1.5 flex-shrink-0" style={{ opacity: n.isRead ? 0 : 1 }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {n.message.split('"').map((part, i) => {
                        if (i % 2 === 1) {
                          const isStatus = ['Waiting', 'Accepted', 'Complet', 'Incomplet'].includes(part);
                          return (
                            <span key={i} className={`font-semibold ${isStatus && status ? STATUS_COLORS[status] : 'text-dblue'}`}>
                              {part}
                            </span>
                          );
                        }
                        return part;
                      })}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">{timeAgo(n.createdAt)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
