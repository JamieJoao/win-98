import { useRef, RefObject, useEffect } from 'react'
import { isMobile } from 'react-device-detect';
import {
  PADDING_BOX,
  BORDER_BOX,
  BORDER_CONTENT,
  SCREEN_CLASS,
} from 'utils/const'

interface IProps {
  canDragRef?: RefObject<boolean>
  useShadow?: boolean
  onDragStart: () => void
  onDragEnd: (left: number, top: number) => void
  onDragging: (left: number, top: number) => void
}

const PLATFORM = isMobile ? 'mobile' : 'desktop'
const METHODS_MAPPED = {
  mobile: { start: 'touchstart', end: 'touchend', move: 'touchmove' },
  desktop: { start: 'mousedown', end: 'mouseup', move: 'mousemove' },
}

export const useDrag = (props: IProps) => {
  const { onDragStart, onDragEnd, onDragging, canDragRef, useShadow } = props

  const containerRef = useRef<HTMLDivElement | null>(null)
  // const elementRef = useRef<HTMLDivElement | null>(null)
  // const elementShadowRef = useRef<HTMLDivElement | null>(null)
  const handleStartRef = useRef<HTMLDivElement | null>(null)
  const handleEndRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef<boolean>(false)
  const pointersRef = useRef<{ startLeft: number, startTop: number }>({ startTop: 0, startLeft: 0 })

  const handlePointerMove = (event: any) => {
    let useEvent = event

    if (!containerRef.current) return
    if (!draggingRef.current) {
      onDragStart?.call(event)
      draggingRef.current = true
    }

    if (isMobile) {
      useEvent = event.targetTouches[0]
    }

    const { offsetLeft, offsetTop } = containerRef.current
    const { startLeft, startTop } = pointersRef.current

    onDragging?.call(
      event,
      useEvent.clientX - offsetLeft - startLeft,
      useEvent.clientY - offsetTop - startTop
    )
  }

  const handlePointerUp = (event: any) => {
    let useEvent = event

    if (!containerRef.current) return
    if (draggingRef.current) {
      draggingRef.current = false

      if (isMobile) {
        useEvent = event.targetTouches[0]
      }

      const { offsetLeft, offsetTop } = containerRef.current
      const { startLeft, startTop } = pointersRef.current

      onDragEnd?.call(
        event,
        useEvent.clientX - offsetLeft - startLeft,
        useEvent.clientY - offsetTop - startTop
      )
    }

    containerRef.current?.removeEventListener(METHODS_MAPPED[PLATFORM].move, handlePointerMove)
  }

  const handlePointerDown = (event: any) => {
    const fixErrorBorders = PADDING_BOX + BORDER_BOX + BORDER_CONTENT
    let startLeft = event.offsetX
      , startTop = event.offsetY

    if ((canDragRef && !canDragRef.current) || !handleStartRef.current) return

    if (isMobile) {
      const rect = event.target.getBoundingClientRect()
        , targetTouches = event.targetTouches[0]

      startLeft = targetTouches.clientX - window.pageXOffset - rect.left
      startTop = targetTouches.clientY - window.pageYOffset - rect.top
    }

    pointersRef.current = {
      startLeft: startLeft + fixErrorBorders,
      startTop: startTop + fixErrorBorders
    }
    containerRef.current?.addEventListener(METHODS_MAPPED[PLATFORM].move, handlePointerMove)
  }

  const cleanEvents = () => {
    let handleEnd = handleStartRef.current

    if (handleEndRef.current) {
      handleEnd = handleEndRef.current
    }

    handleEnd?.removeEventListener(METHODS_MAPPED[PLATFORM].end, handlePointerUp)
    handleStartRef.current?.removeEventListener(METHODS_MAPPED[PLATFORM].start, handlePointerDown)
  }

  useEffect(() => {
    let handleEnd = handleStartRef.current

    containerRef.current = document.querySelector(SCREEN_CLASS)

    if (handleEndRef.current) {
      handleEnd = handleEndRef.current
    }

    handleEnd?.addEventListener(METHODS_MAPPED[PLATFORM].end, handlePointerUp)
    handleStartRef.current?.addEventListener(METHODS_MAPPED[PLATFORM].start, handlePointerDown)

    return cleanEvents
  }, [])

  // const getCoords = (): { left: number, top: number } => {
  //   const element = elementRef.current
  //   if (!element) return { left: 0, top: 0 }

  //   return { left: element.offsetLeft, top: element.offsetTop }
  // }

  // const setCoords = (left: number = 0, top: number = 0): void => {
  //   const box = elementRef.current
  //   if (!box) return

  //   box.style.left = `${left}px`
  //   box.style.top = `${top}px`
  // }

  return {
    // elementRef,
    // elementShadowRef,
    handleStartRef,
    handleEndRef,
    // getCoords,
    // setCoords,
  }
}