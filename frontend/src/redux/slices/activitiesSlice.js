import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activities: [],
  loading: false,
  error: null,
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    fetchActivitiesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchActivitiesSuccess: (state, action) => {
      state.loading = false;
      state.activities = action.payload;
    },
    fetchActivitiesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addActivity: (state, action) => {
      state.activities.push(action.payload);
    },
  },
});

export const {
  fetchActivitiesStart,
  fetchActivitiesSuccess,
  fetchActivitiesFailure,
  addActivity,
} = activitiesSlice.actions;
export default activitiesSlice.reducer;
