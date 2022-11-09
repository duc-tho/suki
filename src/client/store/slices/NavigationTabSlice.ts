import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../index'

interface NavigationTabState {
  tab: string
}

const initialState: NavigationTabState = {
  tab: '/',
}

export const NavigationTabSlice = createSlice({
  name: 'NavigationTab',
  initialState,
  reducers: {
    setTab: (state, action) => { state.tab = action.payload; }
  }
})

export const { setTab } = NavigationTabSlice.actions

export const selectNavigationTab = (state: RootState) => state.NavigationTab

export default NavigationTabSlice.reducer
