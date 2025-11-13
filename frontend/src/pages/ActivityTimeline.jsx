import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../services/apiClient';
import { fetchActivitiesStart, fetchActivitiesSuccess, fetchActivitiesFailure } from '../redux/slices/activitiesSlice';

export default function ActivityTimeline({ leadId }) {
  const dispatch = useDispatch();
  const { activities, loading } = useSelector((state) => state.activities);

  useEffect(() => {
    if (!leadId) return;
    const fetchActivities = async () => {
      dispatch(fetchActivitiesStart());
      try {
        const res = await apiClient.get(`/activities/lead/${leadId}`);
        dispatch(fetchActivitiesSuccess(res.data.data || []));
      } catch (err) {
        dispatch(fetchActivitiesFailure(err.message));
      }
    };
    fetchActivities();
  }, [dispatch, leadId]);

  if (loading) return <div className="p-4 text-slate-500 dark:text-slate-300">Loading timeline...</div>;
  if (!activities.length) return <div className="p-4 text-slate-500 dark:text-slate-300">No activities yet.</div>;

  return (
    <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4 mt-4">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Activity Timeline</h3>
      <ul className="space-y-2">
        {activities.map((a) => (
          <li key={a.id} className="border-l-4 pl-2 border-blue-500">
            <span className="font-semibold text-slate-900 dark:text-slate-100">[{a.type}]</span> <span className="text-slate-700 dark:text-slate-300">{a.content}</span> <span className="text-xs text-slate-400">{new Date(a.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
