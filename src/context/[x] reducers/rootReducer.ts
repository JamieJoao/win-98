import { SET_WINDOWS, SET_ACTIVE_WINDOW, TRootAction } from '../types/types.actions'
import { IRootState } from '../types/types.state'

const initialState: IRootState = {
  activeWindow: null,
  windows: []
}

export const rootReducer = (state = initialState, action: TRootAction): IRootState => {
  switch (action.type) {
    case SET_WINDOWS:
    case SET_ACTIVE_WINDOW:
      return { ...state, [action.key]: action.payload }

    default:
      return state
  }
}
