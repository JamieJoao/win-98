import { ERootStateLabels } from './types.state'
import { IWindow } from 'types'

export type setWindowsType = 'SET_WINDOWS'
export type setActiveWindowType = 'SET_ACTIVE_WINDOW'

export const SET_WINDOWS: setWindowsType = 'SET_WINDOWS'
export const SET_ACTIVE_WINDOW: setActiveWindowType = 'SET_ACTIVE_WINDOW'

export type TRootAction =
  | { type: setWindowsType, payload: IWindow[], key: ERootStateLabels }
  | { type: setActiveWindowType, payload: IWindow, key: ERootStateLabels }
