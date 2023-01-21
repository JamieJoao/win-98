import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk/es/types'

import { SET_WINDOWS, SET_ACTIVE_WINDOW, TRootAction } from '../types/types.actions'
import { ERootStateLabels, IRootState } from '../types/types.state'
import { IWindow } from 'types'

export const addWindow = (newWindow: IWindow): any => (dispatch: Dispatch<TRootAction>, getState: any) => {
  const { windows } = getState()
  const newWindows = [...windows, newWindow]

  dispatch(setWindows(newWindows))
}

// POR MIENTRAS
export const setWindows = (newWindows: IWindow[]): TRootAction => ({ type: SET_WINDOWS, payload: newWindows, key: ERootStateLabels.windows })

export const setActiveWindow = (window: IWindow): TRootAction => ({ type: SET_ACTIVE_WINDOW, payload: window, key: ERootStateLabels.activeWindow })
