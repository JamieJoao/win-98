import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { IProgram, ITaskBarButton, IWindow } from 'types'
import { IContextMenuStore, IState, TAction, TReturnThunk } from './types'
import { transformImageKeys } from 'utils/transform'

import DirectsAccess from 'models/directsAccess.json'

const initialState: IState = {
  directsAccess: transformImageKeys(DirectsAccess),
  windowsStack: [],
  taskBarButtonsStack: [],
  contextMenu: {
    position: { left: 0, top: 0, offsetX: 0, offsetY: 0 },
    items: [],
  },
  outOfFocus: false,
}

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setKeyValue(state, action: PayloadAction<TAction>) {
      const payload = action.payload

      return { ...state, [payload.key]: payload.value }
    },
    createWindow(state, action: PayloadAction<IProgram>) {
      const newWindow: IWindow = {
        uid: uuidv4(),
        program: action.payload,
        size: 'regular',
        lastCoords: {},
        minimized: false,
      }
      const newWindowsStack: IWindow[] = [
        newWindow,
        ...state.windowsStack,
      ]
      const newTaskBarButtonsStack: ITaskBarButton[] = [
        ...state.taskBarButtonsStack,
        {
          uid: uuidv4(),
          window: newWindow,
        },
      ]

      return { ...state, outOfFocus: false, windowsStack: newWindowsStack, taskBarButtonsStack: newTaskBarButtonsStack }
    },
    deleteWindow(state, action: PayloadAction<string>) {
      const newWindowsStack = state.windowsStack.filter(obj => obj.uid !== action.payload)
      const newTaskBarButtonsStack = state.taskBarButtonsStack.filter(obj => obj.window.uid !== action.payload)

      return { ...state, windowsStack: newWindowsStack, taskBarButtonsStack: newTaskBarButtonsStack }
    },
    updateWindow(state, action: PayloadAction<IWindow>) {
      const newWindowsStack = state.windowsStack.map(obj => {
        if (obj.uid !== action.payload.uid) return obj

        return action.payload
      })

      return { ...state, outOfFocus: false, windowsStack: newWindowsStack }
    },
    changePositionWindow(state, action: PayloadAction<{ uid: string, destIndex: number }>) {
      const cloneWindowsStack = [...state.windowsStack]
        , { uid, destIndex } = action.payload
        , windowsIndex = cloneWindowsStack.findIndex(obj => obj.uid === uid)
        , windowRemoved = cloneWindowsStack.splice(windowsIndex, 1)

      cloneWindowsStack.splice(destIndex, 0, windowRemoved[0])

      return { ...state, outOfFocus: false, windowsStack: cloneWindowsStack }
    },
    reorderTaskBarsStack(state, action: PayloadAction<IWindow>) {

    },
    closeContextMenu(state) {
      return {
        ...state,
        contextMenu: {
          position: { left: 0, top: 0, offsetX: 0, offsetY: 0 },
          items: [],
        }
      }
    },
  }
})

export const {
  setKeyValue,
  createWindow,
  updateWindow,
  deleteWindow,
  reorderTaskBarsStack,
  changePositionWindow,
  closeContextMenu,
} = slice.actions

export const minimizeWindow = (window: IWindow): TReturnThunk => (dispatch: any, getState) => {
  const state = getState()

  dispatch(updateWindow({ ...window, minimized: true }))
  dispatch(changePositionWindow({ uid: window.uid, destIndex: state.windowsStack.length - 1 }))
}

export const openContextMenu = createAsyncThunk(
  'slice/openContextMenu',
  (payload: IContextMenuStore, { dispatch }) => {
    dispatch(setKeyValue({ key: 'contextMenu', value: payload }))

    return Promise.resolve()
  }
)

export default slice.reducer
