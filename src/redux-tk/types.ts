import { Action, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook } from 'react-redux'

import { IProgram, Window, ITaskBarButton, IContextMenuItem } from 'types'
import { DiskModel } from 'types/interfaces'
import store from './store'

export interface IState {
  directsAccess: IProgram[]
  windowsStack: Window[]
  taskBarButtonsStack: ITaskBarButton[]
  contextMenu: IContextMenuStore
  hardDisk: DiskModel[]
}

export interface IContextMenuStore {
  position: { left: number, top: number, offsetX: number, offsetY: number }
  items: IContextMenuItem[]
}

export type TAction =
  | { key: 'directsAccess', value: IProgram[] }
  | { key: 'windowsStack', value: Window[] }
  | { key: 'taskBarButtonsStack', value: ITaskBarButton[] }
  | { key: 'contextMenu', value: IContextMenuStore }
  | { key: 'hardDisk', value: DiskModel[] }

export type TDispatch = () => typeof store.dispatch
export type TSelector = TypedUseSelectorHook<ReturnType<typeof store.getState>>
export type TReturnThunk<ReturnType = void> = ThunkAction<ReturnType, IState, unknown, Action<TAction>>
