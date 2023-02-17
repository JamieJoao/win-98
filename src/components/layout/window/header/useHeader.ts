import { minimizeWindow, updateWindow, deleteWindow } from "redux-tk/slice"
import { useAppDispatch } from "redux-tk/store"

export const useHeader = (size: 'fullscreen' | 'regular', uid: string) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(deleteWindow(uid))
  }

  const handleToggleMaximize = () => {
    const newSize: typeof size = size === 'regular' ? 'fullscreen' : 'regular'
    dispatch(updateWindow({
      uid,
      size: newSize,
    }))
  }

  const handleMinimize = () => {
    console.log('[minimize]')
    // dispatch(minimizeWindow(uid))
  }

  return {
    handleMinimize,
    handleToggleMaximize,
    handleClose,
  }
}
