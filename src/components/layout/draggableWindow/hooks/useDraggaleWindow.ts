import { RefObject, useEffect, useLayoutEffect, useMemo, useRef } from 'react'

import { useDragDrop, useFakeWindow, useStateRef } from 'hooks'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import { BORDER_BOX, BORDER_CONTENT, PADDING_BOX, SCREEN_CLASS, TASKBAR_HEIGHT } from 'utils/const'
import { changePositionWindow, deleteWindow, minimizeWindow, updateWindow } from 'redux-tk/slice'
import { IWindow, TCoordinates } from 'types'

interface IProps {
  position: number
  data: IWindow
}

interface ICoords {
  left?: number
  top?: number
  width?: number
  height?: number
}

interface TReturnHook {
  windowRef: RefObject<HTMLDivElement>
  coordsMemo: { zIndex: number, left?: number, top?: number },
  focused: boolean,
  startRef: RefObject<HTMLDivElement>,
  // endRef: RefObject<HTMLDivElement>,
  // shadowStyles: { display: string, width?: number, height?: number, top?: number, left?: number },
  handleFocus: () => void,
  // handleRezise: (coordinate: TCoordinates, variation: number) => void,
  // handleResized: () => void,
  handleMinimize: () => void,
  handleClose: () => void,
  handleToggleMaximize: () => void,
}

export const useDraggableWindow = (props: IProps): TReturnHook => {
  const { data, position } = props
    , { size, uid } = data
    , fixErrorBorders = PADDING_BOX + BORDER_BOX + BORDER_CONTENT

  const dispatch = useAppDispatch()
    , { windowsStack, outOfFocus } = useAppSelector(state => state)
    , [coords, setCoords, coordsRef] = useStateRef<ICoords>({})
    , [coordsShadow, setCoordsShadow, coordsShadowRef] = useStateRef<ICoords>({})

  const containerRef = useRef<HTMLDivElement | null>(null)
    , windowRef = useRef<HTMLDivElement | null>(null)
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

  useLayoutEffect(() => {
    containerRef.current = document.querySelector(SCREEN_CLASS)

    if (containerRef.current && windowRef.current) {
      const left = containerRef.current.clientWidth / 2 - windowRef.current.clientWidth / 2
        , top = ((containerRef.current.clientHeight - TASKBAR_HEIGHT) / 2 - windowRef.current.clientHeight / 2)

      setCoords({ left, top })
    }
  }, [])

  const coordsMemo = useMemo(() => {
    let auxCoords: { zIndex: number, left?: number, top?: number } = { zIndex: windowsStack.length - position }

    if (size === 'regular') {
      auxCoords = { ...auxCoords, ...coords }
    }

    return auxCoords
  }, [windowsStack, position, size, coords])

  const { startRef, draggingRef } = useDragDrop({
    endOnScreen: true,
    onDragStart() {
      if (windowRef.current) {
        handleFocus()

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
    const finalSize = size === 'fullscreen' ? 'regular' : 'fullscreen'

    dispatch(updateWindow({
      ...data,
      size: finalSize,
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
      console.log('[focus]')
      dispatch(changePositionWindow({ uid, destIndex: 0 }))
    }
  }

  const handleResized = () => { }

  return {
    windowRef,
    coordsMemo,
    focused,
    startRef,
    // endRef,
    // shadowStyles,
    handleFocus,
    // handleResized,
    // handleRezise,
    handleMinimize,
    handleClose,
    handleToggleMaximize,
  }
}