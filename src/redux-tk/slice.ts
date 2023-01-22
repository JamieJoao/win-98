import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IWindow } from 'types'
import { IState, TAction, TReturnThunk } from './types'

const initialState: IState = {
  programs: [],
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
      const newWindows = [...state.windows, action.payload]

      return { ...state, windows: newWindows, activeWindow: action.payload }
    }
  }
})

export const { setKeyValue, addWindow } = slice.actions

export const fetchPrograms = (): TReturnThunk => async (dispatch: any) => {
  try {
    const { programs } = await fetch('src/models/programs.json').then(obj => obj.json())

    dispatch(setKeyValue({ key: 'programs', value: programs }))
  } catch (error) {
    console.log(error)
  }
}

export default slice.reducer
