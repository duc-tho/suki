import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface LoadingState {
   open: boolean
   requireOpen: boolean
}

const initialState: LoadingState = {
   open: true,
   requireOpen: false,
}

export const LoadingSlice = createSlice({
   name: 'Loading',
   initialState,
   reducers: {
      show: (state) => {
         state.open = true
      },
      hide: (state) => {
         if (state.requireOpen) return

         state.open = false
      },
      enableRequireLoading: (state) => {
         state.requireOpen = true
      },
      disableRequireLoading: (state) => {
         state.requireOpen = false
      },
   },
})

export const { show, hide, enableRequireLoading, disableRequireLoading } = LoadingSlice.actions

export const selectLoading = (state: RootState) => state.Loading

export default LoadingSlice.reducer
