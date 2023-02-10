import { RefObject, useEffect, useLayoutEffect, useMemo, useRef } from 'react'

import { useDragDrop, useFakeWindow, useStateRef } from 'hooks'
import { IWindow, TCoords } from 'types'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import { changePositionWindow, deleteWindow, minimizeWindow, updateWindow } from 'redux-tk/slice'
import { BORDER_BOX, BORDER_CONTENT, PADDING_BOX, SCREEN_CLASS, TASKBAR_HEIGHT } from 'utils/const'
import { removeStyles } from 'utils/functions'

interface IProps {
  position: number
  data: IWindow
}

interface TReturnHook {
  windowRef: RefObject<HTMLDivElement>
  coordsMemo: TCoords
  focused: boolean
  startRef: RefObject<HTMLDivElement>
  handleFocus: () => void
  handleMinimize: () => void
  handleClose: () => void
  handleToggleMaximize: () => void
  handleResizeEnd: (coords: TCoords) => void
}

export const useDraggableWindow = (props: IProps): TReturnHook => {
  const { data, position } = props
    , { size, uid, lastCoords } = data
    , fixErrorBorders = PADDING_BOX + BORDER_BOX + BORDER_CONTENT

  const dispatch = useAppDispatch()
    , { windowsStack, outOfFocus } = useAppSelector(state => state)
    , [coords, setCoords, coordsRef] = useStateRef<TCoords>({})
    , [coordsShadow, setCoordsShadow, coordsShadowRef] = useStateRef<TCoords>({})

  const containerRef = useRef<HTMLDivElement | null>(null)
    , windowRef = useRef<HTMLDivElement | null>(null)
    , lastCoordsRef = useRef<TCoords | null>(null)
    , focused = windowsStack[0].uid === uid && !outOfFocus

  useEffect(() => {
    applyStyles(
      {
        ...coordsShadow,
        display: (Object.keys(coordsShadow).length && size === 'regular')
          ? 'block'
          : 'none'
      }
    )
  }, [coordsShadow])

  useEffect(() => {
    lastCoordsRef.current = lastCoords
  }, [lastCoords])

  useLayoutEffect(() => {
    containerRef.current = document.querySelector(SCREEN_CLASS)

    if (containerRef.current && windowRef.current) {
      const left = containerRef.current.clientWidth / 2 - windowRef.current.clientWidth / 2
        , top = ((containerRef.current.clientHeight - TASKBAR_HEIGHT) / 2 - windowRef.current.clientHeight / 2)

      setCoords({ left, top })
    }
  }, [])

  const coordsMemo = useMemo(() => {
    let auxCoords: TCoords = { zIndex: windowsStack.length - position }

    if (size === 'regular') {
      auxCoords = { ...auxCoords, ...coords }
    }

    return auxCoords
  }, [windowsStack, position, size, coords])

  const { startRef, draggingRef } = useDragDrop({
    endOnScreen: true,
    onDragStart() {
      if (windowRef.current) {
        const { clientWidth, clientHeight } = windowRef.current
        setCoordsShadow({ ...coordsShadowRef.current, width: clientWidth, height: clientHeight })
      }
    },
    onDragEnd(left, top, startLeft, startTop) {
      if (draggingRef.current) {
        setCoordsShadow({})
        setCoords(coords => ({
          ...coords,
          left: left - startLeft - fixErrorBorders,
          top: top - startTop - fixErrorBorders
        }))

        dispatch(updateWindow({
          ...data,
          lastCoords: { ...lastCoordsRef.current, ...coordsRef.current }
        }))
      }
    },
    onDragging(left, top, startLeft, startTop) {
      setCoordsShadow(coordsShadow => ({
        ...coordsShadow,
        left: left - startLeft - fixErrorBorders,
        top: top - startTop - fixErrorBorders
      }))
    },
  })
    , { applyStyles } = useFakeWindow()

  const handleToggleMaximize = () => {
    const toggleSize = size === 'fullscreen' ? 'regular' : 'fullscreen'
    if (toggleSize === 'fullscreen') {
      removeStyles(['width', 'height'], windowRef.current)
    }
    else {
      applyStyles(lastCoordsRef.current ?? {}, windowRef.current)
    }

    dispatch(updateWindow({
      ...data,
      size: toggleSize,
    }))
  }

  const handleMinimize = () => {
    dispatch(minimizeWindow({ ...data }))
  }

  const handleClose = () => {
    dispatch(deleteWindow(uid))
  }

  const handleFocus = () => {
    if (!focused) {
      dispatch(changePositionWindow({ uid, destIndex: 0 }))
    }
  }

  const handleResizeEnd = (auxCoords: TCoords) => {
    dispatch(updateWindow({
      ...data,
      lastCoords: { ...lastCoords, ...auxCoords }
    }))
  }

  return {
    windowRef,
    coordsMemo,
    focused,
    startRef,
    handleFocus,
    handleMinimize,
    handleClose,
    handleToggleMaximize,
    handleResizeEnd,
  }
}