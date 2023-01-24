import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IWindow } from 'types'
import { IState, TAction } from './types'

import DirectsAccess from 'models/directsAccess.json'

const initialState: IState = {
  directsAccess: DirectsAccess,
  windows: [],
  activeWindow: null,
}

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setKeyValue(state, action: PayloadAction<TAction>) {
      const payload = action.payload

      return { ...state, [payload.key]: payload.value }
    },
    addWindow(state, action: PayloadAction<IWindow>) {
      const newWindows = [
        ...state.windows.map(obj => ({ ...obj, focused: false })),
        action.payload
      ]

      return { ...state, windows: newWindows, activeWindow: action.payload }
    },
    updateWindow(state, action: PayloadAction<IWindow>) {
      const index = state.windows.findIndex(obj => obj.uid === action.payload.uid)
      const newWindows = [
        ...state.windows.slice(0, index),
        action.payload,
        ...state.windows.slice(index + 1)
      ]

      return { ...state, windows: newWindows }
    },
  }
})

export const { setKeyValue, addWindow, updateWindow } = slice.actions

/*
export const fetchPrograms = (): TReturnThunk => async (dispatch: any) => {
  try {
    const { programs } = await fetch('src/models/programs.json').then(obj => obj.json())

    dispatch(setKeyValue({ key: 'programs', value: programs }))
  } catch (error) {
    console.log(error)
  }
}
*/

export default slice.reducer
