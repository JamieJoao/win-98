import { createSlice } from '@reduxjs/toolkit'

import { IWindow } from 'types'
import { IRootState, TRootAction } from '../types'

const initialState: IRootState = {
  activeWindow: null,
  windows: []
}

const rootSlice = createSlice({
  name: 'rootSlice',
  initialState,
  reducers: {
    storeData(state, action: any) {
      return { ...state, [action.key]: action.payload }
    },
  }
})

export const { storeData } = rootSlice.actions

export const addWindow = (newWindow: IWindow): any => (dispatch: any, getState: any) => {
  const { windows } = getState()
  const newWindows = [...windows, newWindow]

  // dispatch(storeData(newWindows))                                    
}

export default rootSlice.reducer
