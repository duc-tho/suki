import { configureStore } from '@reduxjs/toolkit'
import { LoadingSlice } from './slices/loading_slide.js'

export const store = configureStore({
  reducer: {
    Loading: LoadingSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
