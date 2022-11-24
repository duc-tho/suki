import { AlertColor } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

interface ToastState {
    open: boolean,
    message: string,
    type: AlertColor
}

const initialState: ToastState = {
    open: false,
    message: '',
    type: 'success'
}

export const ToastSlice = createSlice({
    name: 'Toast',
    initialState,
    reducers: {
        show: (state, action: PayloadAction<{ message: string, type?: AlertColor }>) => {
            state.open = true;
            state.message = action.payload.message;
            state.type = action.payload?.type ?? 'success';
        },
        hide: (state) => { state.open = false; }
    }
})

export const { show, hide } = ToastSlice.actions

export const selectToast = (state: RootState) => state.Toast

export default ToastSlice.reducer
