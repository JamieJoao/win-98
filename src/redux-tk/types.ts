import { Action, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook } from 'react-redux'

import { IProgram, IWindow } from 'types'
import store from './store'

export interface IState {
  programs: IProgram[]
  windows: IWindow[]
  activeWindow: IWindow | null
}

export type TAction =
  | { key: 'programs', value: IProgram[] }
  | { key: 'windows', value: IWindow[] }
  | { key: 'activeWindow', value: IWindow }

export type TDispatch = () => typeof store.dispatch
export type TSelector = TypedUseSelectorHook<ReturnType<typeof store.getState>>
export type TReturnThunk<ReturnType = void> = ThunkAction<ReturnType, IState, unknown, Action<TAction>>
