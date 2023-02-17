import { updateWindow, manageWindow } from "redux-tk/slice"
import { useAppDispatch } from "redux-tk/store"

export const useHeader = (size: 'fullscreen' | 'regular', uid: string) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(manageWindow('close', uid))
  }

  const handleToggleMaximize = () => {
    const newSize: typeof size = size === 'regular' ? 'fullscreen' : 'regular'
    dispatch(updateWindow({
      uid,
      size: newSize,
    }))
  }

  const handleMinimize = () => {
    dispatch(manageWindow('minimize', uid))
  }

  return {
    handleMinimize,
    handleToggleMaximize,
    handleClose,
  }
}
