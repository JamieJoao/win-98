import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IWindow } from 'types'
import { IState, TAction } from './types'
import { transformImageKeys } from 'utils/transform'

import DirectsAccess from 'models/directsAccess.json'

const initialState: IState = {
  directsAccess: transformImageKeys(DirectsAccess),
  windowsStack: [],
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
        ...state.windowsStack.map(obj => ({ ...obj, focused: false })),
        action.payload
      ]

      return { ...state, windowsStack: newWindows, activeWindow: action.payload }
    },
    removeWindow(state, action: PayloadAction<number>) {
      const newWindows = state.windowsStack.filter(obj => obj.uid !== action.payload)

      return { ...state, windowsStack: newWindows, activeWindow: newWindows[newWindows.length - 1] ?? null }
    },
    updateWindow(state, action: PayloadAction<IWindow>) {
      const index = state.windowsStack.findIndex(obj => obj.uid === action.payload.uid)
      const newWindows = [
        ...state.windowsStack.slice(0, index),
        action.payload,
        ...state.windowsStack.slice(index + 1)
      ]

      return { ...state, windowsStack: newWindows }
    },
  }
})

export const { setKeyValue, addWindow, updateWindow, removeWindow } = slice.actions

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
