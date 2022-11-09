import { NavigationTabSlice } from './slices/NavigationTabSlice';
import { configureStore } from '@reduxjs/toolkit'
import { LoadingSlice } from './slices/LoadingSlice'
import { ToastSlice } from './slices/ToastSlice'

export const store = configureStore({
  reducer: {
    Toast: ToastSlice.reducer,
    Loading: LoadingSlice.reducer,
    NavigationTab: NavigationTabSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
