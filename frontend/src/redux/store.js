import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import leadsReducer from './slices/leadsSlice';

import notificationsReducer from './slices/notificationsSlice';
import activitiesReducer from './slices/activitiesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    leads: leadsReducer,
  notifications: notificationsReducer,
  activities: activitiesReducer,
  },
});

export default store;
