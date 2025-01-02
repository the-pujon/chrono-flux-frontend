import { configureStore } from '@reduxjs/toolkit';
import focusTrackerReducer from './features/focusTracker/focusTrackerSlice';

const store = configureStore({
  reducer: {
    focusTracker: focusTrackerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

