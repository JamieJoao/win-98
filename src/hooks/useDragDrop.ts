import { RefObject, useEffect, useRef } from 'react'
import { isMobile } from 'react-device-detect'

import { BORDER_BOX, BORDER_CONTENT, PADDING_BOX, SCREEN_CLASS } from 'utils/const'

interface IProps {
  onDragStart: (left: number, top: number) => void
  onDragEnd: (left: number, top: number) => void
  onDragging: (left: number, top: number) => void
}

export const useDragDrop = (props: IProps) => {
  const { onDragStart, onDragEnd, onDragging } = props

  const startRef = useRef<HTMLDivElement | null>(null)
    , endRef = useRef<HTMLDivElement | null>(null)
    , screenRef = useRef<HTMLDivElement | null>(null)
    , draggingRef = useRef<boolean>(false)
    , pointersRef = useRef({ startTop: 0, startLeft: 0, currentLeft: 0, currentTop: 0 })

  const methodStart = isMobile ? 'touchstart' : 'mousedown'
    , methodEnd = isMobile ? 'touchend' : 'mouseup'
    , methodMove = isMobile ? 'touchmove' : 'mousemove'

  useEffect(() => {
    /**
     * REMOVEMOS DE CUALQUIER MANERA LOS EVENTOS
     */
    addEvents()
    return removeEvents
  }, [])

  const addEvents = () => {
    const startDOM = startRef.current
      , endDOM = endRef.current
      , auxEnd = endDOM ?? startDOM

    startDOM?.addEventListener(methodStart, handleStart)
    startDOM?.addEventListener(methodEnd, handleEnd)
    auxEnd?.addEventListener(methodEnd, handleEnd)

    screenRef.current = document.querySelector(SCREEN_CLASS)
  }

  /**
   * VER PORQUE NO SE QUITA NINGUN EVENTO AL MAXIMIZAR LA PANTALLA
   */
  const removeEvents = () => {
    const startDOM = startRef.current
      , endDOM = endRef.current
      , auxEnd = endDOM ?? startDOM

    startDOM?.removeEventListener(methodStart, handleStart)
    startDOM?.removeEventListener(methodEnd, handleEnd)
    auxEnd?.removeEventListener(methodEnd, handleEnd)
  }

  const handleStart = (e: any) => {
    const startDOM = startRef.current
      , endDOM = endRef.current
      , auxEnd = endDOM ?? startDOM
      , screenDOM = screenRef.current

    screenDOM?.addEventListener(methodMove, handleMove)

    /**
     * GUARDAMOS LOS OFFSETS INICIALES
     */
    const { offsetLeft, offsetTop } = getStartPositions(e)
    pointersRef.current = {
      ...pointersRef.current,
      startLeft: offsetLeft,
      startTop: offsetTop
    }
  }

  const handleEnd = (e: any) => {
    const startDOM = startRef.current
      , endDOM = endRef.current
      , auxEnd = endDOM ?? startDOM
      , screenDOM = screenRef.current
      , { currentLeft, currentTop } = pointersRef.current

    screenDOM?.removeEventListener(methodMove, handleMove)

    if (onDragEnd) onDragEnd(currentLeft, currentTop)
  }

  const handleMove = (e: any) => {
    const startDOM = startRef.current
      , endDOM = endRef.current
      , auxEnd = endDOM ?? startDOM
      , screenDOM = screenRef.current
      , { left, top } = getPositions(e)

    if (onDragging) onDragging(left, top)
  }

  const getPositions = (event: any): { left: number, top: number } => {
    let left = 0
      , top = 0
      , auxEvent = event
      , { startLeft, startTop } = pointersRef.current

    if (screenRef.current) {
      const { offsetLeft, offsetTop } = screenRef.current

      if (isMobile) {
        auxEvent = event.targetTouches[0]
      }

      left = auxEvent.clientX - offsetLeft - startLeft
      top = auxEvent.clientY - offsetTop - startTop

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
      , fixErrorBorders = PADDING_BOX + BORDER_BOX + BORDER_CONTENT

    if (isMobile) {
      const rect = event.target.getBoundingClientRect()
        , auxEvent = event.targetTouches[0]

      offsetLeft = auxEvent.clientX - window.pageXOffset - rect.left
      offsetTop = auxEvent.clientY - window.pageYOffset - rect.top
    }

    return {
      offsetLeft: offsetLeft + fixErrorBorders,
      offsetTop: offsetTop + fixErrorBorders,
    }
  }

  return {
    startRef,
    endRef,
  }
}