import { configureStore } from '@reduxjs/toolkit';
import focusTrackerReducer from './features/focusTracker/focusTrackerSlice';
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    focusTracker: focusTrackerReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

