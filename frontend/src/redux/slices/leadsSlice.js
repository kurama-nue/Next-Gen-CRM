import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leads: [],
  loading: false,
  error: null,
  selectedLead: null,
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    fetchLeadsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLeadsSuccess: (state, action) => {
      state.loading = false;
      state.leads = action.payload;
    },
    fetchLeadsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectLead: (state, action) => {
      state.selectedLead = action.payload;
    },
    addLead: (state, action) => {
      state.leads.push(action.payload);
    },
    updateLead: (state, action) => {
      const index = state.leads.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.leads[index] = action.payload;
      }
    },
    deleteLead: (state, action) => {
      state.leads = state.leads.filter((l) => l.id !== action.payload);
    },
  },
});

export const {
  fetchLeadsStart,
  fetchLeadsSuccess,
  fetchLeadsFailure,
  selectLead,
  addLead,
  updateLead,
  deleteLead,
} = leadsSlice.actions;
export default leadsSlice.reducer;
