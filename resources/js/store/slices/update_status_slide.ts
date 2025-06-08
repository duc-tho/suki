import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface UpdateStatusState {
   inUpdateProcess: boolean
}

const initialState: UpdateStatusState = {
   inUpdateProcess: false,
}

export const UpdateStatusSlice = createSlice({
   name: 'UpdateSatus',
   initialState,
   reducers: {
      updateProcessing: (state) => {
         state.inUpdateProcess = true
      },
      updateIdle: (state) => {
         state.inUpdateProcess = false
      },
   },
})

export const { updateProcessing, updateIdle } = UpdateStatusSlice.actions

export const selectUpdateStatus = (state: RootState) => state.UpdateStatus

export default UpdateStatusSlice.reducer
