import { NavigationTabSlice } from './slices/NavigationTabSlice';
import { configureStore } from '@reduxjs/toolkit'
import { LoadingSlice } from './slices/LoadingSlice'
import { ToastSlice } from './slices/ToastSlice'
import { StatusSlice } from './slices/StatusSlice';

export const store = configureStore({
    reducer: {
        Toast: ToastSlice.reducer,
        Loading: LoadingSlice.reducer,
        NavigationTab: NavigationTabSlice.reducer,
        Status: StatusSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
