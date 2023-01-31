import { Action, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook } from 'react-redux'

import { IProgram, IWindow, ITaskBarButton, IContextMenuItem } from 'types'
import store from './store'

export interface IState {
  directsAccess: IProgram[]
  windowsStack: IWindow[]
  taskBarButtonsStack: ITaskBarButton[]
  contextMenu: IContextMenuStore
  outOfFocus: boolean
}

export interface IContextMenuStore {
  position: { left: number, top: number, offsetX: number, offsetY: number }
  items: IContextMenuItem[]
}

export type TAction =
  | { key: 'directsAccess', value: IProgram[] }
  | { key: 'windowsStack', value: IWindow[] }
  | { key: 'taskBarButtonsStack', value: ITaskBarButton[] }
  | { key: 'contextMenu', value: IContextMenuStore }
  | { key: 'outOfFocus', value: boolean }

export type TDispatch = () => typeof store.dispatch
export type TSelector = TypedUseSelectorHook<ReturnType<typeof store.getState>>
export type TReturnThunk<ReturnType = void> = ThunkAction<ReturnType, IState, unknown, Action<TAction>>
