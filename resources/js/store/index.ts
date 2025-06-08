import { configureStore } from '@reduxjs/toolkit'
import { LoadingSlice } from './slices/loading_slide'
import { UpdateStatusSlice } from './slices/update_status_slide'

export const store = configureStore({
   reducer: {
      Loading: LoadingSlice.reducer,
      UpdateStatus: UpdateStatusSlice.reducer,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
