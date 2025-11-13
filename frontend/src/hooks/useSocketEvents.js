import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLead, updateLead } from '../redux/slices/leadsSlice';
import { addActivity } from '../redux/slices/activitiesSlice';
import { getSocket, initSocket } from '../services/socketService';

export default function useSocketEvents(token) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
    const socket = getSocket() || initSocket(token);

    socket.on('leadCreated', ({ lead }) => {
      dispatch(addLead(lead));
    });
    socket.on('leadUpdated', ({ lead }) => {
      dispatch(updateLead(lead));
    });
    socket.on('activityCreated', ({ activity }) => {
      dispatch(addActivity(activity));
    });

    return () => {
      socket.off('leadCreated');
      socket.off('leadUpdated');
      socket.off('activityCreated');
    };
  }, [token, dispatch]);
}
