import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../index'

interface StatusState {
    isFetching: boolean,
    isProcessing: boolean
}

const initialState: StatusState = {
    isFetching: false,
    isProcessing: false
}

export const StatusSlice = createSlice({
    name: 'Status',
    initialState,
    reducers: {
        fetching: (state) => { state.isFetching = true; },
        fetched: (state) => { state.isFetching = false; },
        processing: (state) => { state.isProcessing = true; },
        processed: (state) => { state.isProcessing = false; }
    }
})

export const { fetching, fetched, processing, processed } = StatusSlice.actions

export const selectStatus = (state: RootState) => state.Status

export default StatusSlice.reducer
