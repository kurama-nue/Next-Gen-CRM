import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function NotificationBar() {
  const [message, setMessage] = useState('');
  const { leads, activities } = useSelector(state => ({
    leads: state.leads.leads,
    activities: state.activities.activities,
  }));

  useEffect(() => {
    if (leads.length > 0) {
      setMessage('Lead list updated!');
      const timer = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [leads]);

  useEffect(() => {
    if (activities.length > 0) {
      setMessage('Activity timeline updated!');
      const timer = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [activities]);

  if (!message) return null;
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="backdrop-blur-md bg-blue-600/80 text-white px-6 py-2 rounded-xl shadow-lg border border-white/20">
        {message}
      </div>
    </div>
  );
}
