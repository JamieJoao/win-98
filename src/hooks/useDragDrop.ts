import { RefObject, useEffect, useRef } from 'react'
import { isMobile } from 'react-device-detect'

import { BORDER_BOX, BORDER_CONTENT, PADDING_BOX, SCREEN_CLASS } from 'utils/const'

interface IProps {
  endOnScreen?: boolean
  onDragStart?: (left: number, top: number, startLeft: number, startTop: number) => void
  onDragEnd?: (left: number, top: number, startLeft: number, startTop: number) => void
  onDragging?: (left: number, top: number, startLeft: number, startTop: number) => void
}

export const useDragDrop = (props: IProps) => {
  const { onDragStart, onDragEnd, onDragging, endOnScreen } = props

  const startRef = useRef<HTMLDivElement | null>(null)
    , endRef = useRef<HTMLDivElement | null>(null)
    , screenRef = useRef<HTMLDivElement | null>(null)
    , draggingRef = useRef<boolean>(false)
    , pointersRef = useRef({ startTop: 0, startLeft: 0, currentLeft: 0, currentTop: 0 })

  const methodStart = isMobile ? 'touchstart' : 'mousedown'
    , methodEnd = isMobile ? 'touchend' : 'mouseup'
    , methodMove = isMobile ? 'touchmove' : 'mousemove'

  useEffect(() => {
    screenRef.current = document.querySelector(SCREEN_CLASS)
    /**
     * REMOVEMOS DE CUALQUIER MANERA LOS EVENTOS
     */
    addEvents()
    return removeEvents
  }, [])

  const addEvents = () => {
    const startDOM = startRef.current
      , endDOM = endRef.current
      , auxEnd = endOnScreen ? screenRef.current : (endDOM ?? startDOM)

    startDOM?.addEventListener(methodStart, handleStart)
    startDOM?.addEventListener(methodEnd, handleEnd)
    auxEnd?.addEventListener(methodEnd, handleEnd)
  }

  const removeEvents = () => {
    const startDOM = startRef.current
      , endDOM = endRef.current
      , auxEnd = endOnScreen ? screenRef.current : (endDOM ?? startDOM)

    startDOM?.removeEventListener(methodStart, handleStart)
    startDOM?.removeEventListener(methodEnd, handleEnd)
    auxEnd?.removeEventListener(methodEnd, handleEnd)
  }

  const handleStart = (e: any) => {
    e.stopPropagation()
    
    const startDOM = startRef.current
      , endDOM = endRef.current
      , auxEnd = endDOM ?? startDOM
      , screenDOM = screenRef.current

    screenDOM?.addEventListener(methodMove, handleMove)
    
    const { offsetLeft, offsetTop } = getStartPositions(e)
    pointersRef.current = {
      ...pointersRef.current,
      startLeft: offsetLeft,
      startTop: offsetTop
    }
  }

  const handleEnd = (e: any) => {
    e.stopPropagation()

    const startDOM = startRef.current
      , endDOM = endRef.current
      , auxEnd = endDOM ?? startDOM
      , screenDOM = screenRef.current
      , { startLeft, startTop } = pointersRef.current
      , { currentLeft, currentTop } = pointersRef.current

    screenDOM?.removeEventListener(methodMove, handleMove)

    if (onDragEnd) onDragEnd(currentLeft, currentTop, startLeft, startTop)
    draggingRef.current = false
  }

  const handleMove = (e: any) => {
    const startDOM = startRef.current
      , endDOM = endRef.current
      , auxEnd = endDOM ?? startDOM
      , screenDOM = screenRef.current
      , { startLeft, startTop } = pointersRef.current
      , { left, top } = getPositions(e)

    if (!draggingRef.current) {
      if (onDragStart) onDragStart(left, top, startLeft, startTop)
      draggingRef.current = true
    }
    if (onDragging) onDragging(left, top, startLeft, startTop)
  }

  const getPositions = (event: any) => {
    let left = 0
      , top = 0
      , auxEvent = event

    if (screenRef.current) {
      const { offsetLeft, offsetTop } = screenRef.current

      if (isMobile) {
        auxEvent = event.targetTouches[0]
      }

      left = auxEvent.clientX - offsetLeft
      top = auxEvent.clientY - offsetTop

      pointersRef.current = {
        ...pointersRef.current,
        currentLeft: left,
        currentTop: top
      }
    }

    return { left, top }
  }

  const getStartPositions = (event: any) => {
    let offsetLeft = event.offsetX
      , offsetTop = event.offsetY

    if (isMobile) {
      const rect = event.target.getBoundingClientRect()
        , auxEvent = event.targetTouches[0]

      offsetLeft = auxEvent.clientX - window.pageXOffset - rect.left
      offsetTop = auxEvent.clientY - window.pageYOffset - rect.top
    }

    return {
      offsetLeft,
      offsetTop,
    }
  }

  return {
    startRef,
    endRef,
    draggingRef,
  }
}