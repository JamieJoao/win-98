import { useRef, useState, useEffect, useMemo, useLayoutEffect } from 'react'

import { CommonStyles, Window } from 'types'
import { useDragDrop, useFakeWindow } from 'hooks'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import { changePositionWindow, putFocusOnWindow, updateWindow } from 'redux-tk/slice'

const PADDING_PROGRAM = 2
  , PADDING_CONTENT = 2

export const useProgram = (window: Window, indexInStack: number) => {
  const { size, lastCoords, uid, focused } = window

  const dispatch = useAppDispatch()
  const { windowsStack } = useAppSelector(state => state)

  const [stylesAfterDrag, setStylesAfterDrag] = useState<CommonStyles>({})
  const windowRef = useRef<HTMLDivElement>(null)

  const { applyStyles } = useFakeWindow()
  const { startRef } = useDragDrop({
    endOnScreen: true,
    onDragEnd(left, top, startLeft, startTop) {
      const coordinates = calculateCoordinates(left, top, startLeft, startTop)

      applyStyles({ display: 'none' })
      setStylesAfterDrag(coordinates)

      /**
       * SAVE COORDINATES EN REDUX
       */
      dispatch(updateWindow({
        uid,
        lastCoords: coordinates
      }))
    },
    onDragging(left, top, startLeft, startTop) {
      const coordinates = calculateCoordinates(left, top, startLeft, startTop)

      applyStyles({ ...coordinates, display: 'block' })
    }
  })

  useLayoutEffect(() => {
    if (windowRef.current) {
      windowRef.current.focus()
    }
  }, [])

  useEffect(() => {
    setStylesAfterDrag(
      size === 'fullscreen'
        ? { width: undefined, height: undefined }
        : lastCoords
    )
  }, [size])

  const stylesForWindow = useMemo(() => {
    return {
      ...stylesAfterDrag,
      zIndex: windowsStack.length - indexInStack,
    }
  }, [windowsStack, indexInStack, stylesAfterDrag])

  /**
   * ESTAS VARIABLES SE CALCULAN REPETITIVAMENTE
   */
  const calculateCoordinates = (left: number, top: number, startLeft: number, startTop: number) => {
    const fix = PADDING_PROGRAM + PADDING_CONTENT
      , x = left - startLeft - fix
      , y = top - startTop - fix
      , width = windowRef.current?.clientWidth
      , height = windowRef.current?.clientHeight

    return {
      left: x,
      top: y,
      width,
      height,
    }
  }

  const handleResized = (coordinates: CommonStyles) => {
    /**
     * SAVE COORDINATES EN REDUX
     */
    dispatch(updateWindow({
      uid,
      lastCoords: coordinates
    }))
  }

  const handleMouseDown = () => {
    if (!focused) {
      dispatch(putFocusOnWindow(uid))
    }
  }

  return {
    headerRef: startRef,
    windowRef,
    stylesForWindow,
    focused,

    handleResized,
    handleMouseDown,
  }
}
