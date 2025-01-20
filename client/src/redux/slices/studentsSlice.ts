export interface JobCount {
  _id: string;
  count: number;
}

export interface providerCount {
  name: string;
  description: string;
}

export interface JobState {
  jobCounts: JobCount[];
  providerCounts: providerCount[];
  loading: boolean;
  error: string | null;
}

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';
import endPoint from '@/lib/endPoint';

// Thunks
export const fetchJobCounts = createAsyncThunk<JobCount[], void, { rejectValue: string }>(
  'jobs/fetchJobCounts',
  async (_, { rejectWithValue }) => {
      try {
          const response = await axiosInstance.get(endPoint.STUDENT.JOB_COUNT);
          console.log(response.data.jobCounts);
          return response.data.jobCounts;
      } catch (error: any) {
          console.error(error);
          return rejectWithValue(error.response?.data?.message || 'Failed to fetch job counts');
      }
  }
);

export const fetchProviderCount = createAsyncThunk<providerCount[], void, { rejectValue: string }>(
  'jobs/fetchProviderCount',
  async (_, { rejectWithValue }) => {
      try {
          const response = await axiosInstance.get(endPoint.STUDENT.PROVIDER_COUNT);
          console.log(response.data.providerCount);
          return response.data.providerCount;
      } catch (error: any) {
          console.error(error);
          return rejectWithValue(error.response?.data?.message || 'Failed to fetch provider counts');
      }
  }
);

// Initial state
const initialState: JobState = {
  jobCounts: [],
  providerCounts: [],
  loading: false,
  error: null,
};

// Slice
const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(fetchJobCounts.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(fetchJobCounts.fulfilled, (state, action: PayloadAction<JobCount[]>) => {
              state.loading = false;
              state.jobCounts = action.payload;
              console.log('Job Counts Updated:', state.jobCounts);
          })
          .addCase(fetchJobCounts.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload || 'Failed to fetch job counts';
          })
          .addCase(fetchProviderCount.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(fetchProviderCount.fulfilled, (state, action: PayloadAction<providerCount[]>) => {
              state.loading = false;
              state.providerCounts = action.payload;
              console.log('Provider Counts Updated:', state.providerCounts);
          })
          .addCase(fetchProviderCount.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload || 'Failed to fetch provider counts';
          });
  },
});

export default jobSlice.reducer;
