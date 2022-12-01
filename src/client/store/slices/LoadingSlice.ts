import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../index'

interface LoadingState {
    open: boolean
}

const initialState: LoadingState = {
    open: false,
}

export const LoadingSlice = createSlice({
    name: 'Loading',
    initialState,
    reducers: {
        show: (state) => { state.open = true; },
        hide: (state) => { state.open = false; }
    }
})

export const { show, hide } = LoadingSlice.actions

export const selectLoading = (state: RootState) => state.Loading

export default LoadingSlice.reducer
