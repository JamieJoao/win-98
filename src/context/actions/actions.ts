import { Dispatch } from 'redux'

import { SET_WINDOWS, SET_ACTIVE_WINDOW, TRootAction } from '../types/types.actions'
import { ERootStateLabels } from '../types/types.state'
import { IWindow } from 'types'

export const storeWindows = (newWindow: IWindow) => (dispatch: Dispatch, getState: any) => {
  const { windows } = getState()
  const newWindows = [...windows, newWindow]

  dispatch(setWindows(newWindows))
}

// POR MIENTRAS
export const setWindows = (newWindows: IWindow[]): TRootAction => ({ type: SET_WINDOWS, payload: newWindows, key: ERootStateLabels.windows })

export const setActiveWindow = (window: IWindow): TRootAction => ({ type: SET_ACTIVE_WINDOW, payload: window, key: ERootStateLabels.activeWindow })
