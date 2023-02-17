import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { FileModel, FolderModel, ITaskBarButton, Window } from 'types'
import { IContextMenuStore, IState, TAction, TReturnThunk } from './types'

type AnyFileModel = FileModel | FolderModel
interface ChangePositonPayload {
  uid: string,
  destIndex: number,
  additional?: { [key in keyof Window]?: any }
}

const initialState: IState = {
  windowsStack: [],
  taskBarButtonsStack: [],
  contextMenu: {
    position: { left: 0, top: 0, offsetX: 0, offsetY: 0 },
    items: [],
  },
  hardDisk: []
}

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setKeyValue(state, action: PayloadAction<TAction>) {
      const payload = action.payload

      return { ...state, [payload.key]: payload.value }
    },
    createWindow(state, action: PayloadAction<AnyFileModel>) {
      const newWindow: Window = {
        uid: uuidv4(),
        file: action.payload,
        size: 'regular',
        lastCoords: {},
        minimized: false,
        focused: true,
      }
      const newWindowsStack: Window[] = [
        newWindow,
        ...state.windowsStack.map(obj => ({ ...obj, focused: false })),
      ]
      const newTaskBarButtonsStack: ITaskBarButton[] = [
        ...state.taskBarButtonsStack,
        {
          uid: uuidv4(),
          window: newWindow,
        },
      ]

      return { ...state, windowsStack: newWindowsStack, taskBarButtonsStack: newTaskBarButtonsStack }
    },
    deleteWindow(state, action: PayloadAction<string>) {
      const newWindowsStack = state.windowsStack.filter(obj => obj.uid !== action.payload)
      const newTaskBarButtonsStack = state.taskBarButtonsStack.filter(obj => obj.window.uid !== action.payload)

      return { ...state, windowsStack: newWindowsStack, taskBarButtonsStack: newTaskBarButtonsStack }
    },
    updateWindow(state, action: PayloadAction<{ [key in keyof Window]?: any }>) {
      const newWindowsStack = state.windowsStack.map(obj => {
        if (obj.uid !== action.payload.uid) return obj

        return {
          ...obj,
          ...action.payload
        }
      })

      return { ...state, windowsStack: newWindowsStack }
    },
    changePositionWindow(state, action: PayloadAction<ChangePositonPayload>) {
      const { uid, destIndex, additional } = action.payload
        , cloneWindowsStack = state.windowsStack.map(obj => ({ ...obj, focused: false }))
        , windowsIndex = cloneWindowsStack.findIndex(obj => obj.uid === uid)
        , windowRemoved = cloneWindowsStack.splice(windowsIndex, 1)

      cloneWindowsStack.splice(destIndex, 0, { ...windowRemoved[0], ...additional })

      return { ...state, windowsStack: cloneWindowsStack }
    },
    reorderTaskBarsStack(state, action: PayloadAction<Window>) {

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

/**
 * ACCIONES PRECONFIGURADAS
 */
export const minimizeWindow = (uid: string): TReturnThunk => (dispatch: any, getState) => {
  const state = getState()

  dispatch(updateWindow({ minimized: true }))
  dispatch(changePositionWindow({ uid: uid, destIndex: state.windowsStack.length - 1 }))
}

export const removeWindowFocus = (): TReturnThunk => (dispatch: any, getState) => {
  const { windowsStack } = getState()

  if (Boolean(windowsStack.length)) {
    dispatch(updateWindow({
      uid: windowsStack[0].uid,
      focused: false,
    }))
  }
}

export const putFocusOnWindow = (uid: string): TReturnThunk => (dispatch: any, getState) => {
  dispatch(changePositionWindow({
    uid,
    destIndex: 0,
    additional: { focused: true }
  }))
}

export const openContextMenu = createAsyncThunk(
  'slice/openContextMenu',
  (payload: IContextMenuStore, { dispatch }) => {
    dispatch(setKeyValue({ key: 'contextMenu', value: payload }))

    return Promise.resolve()
  }
)

export default slice.reducer
