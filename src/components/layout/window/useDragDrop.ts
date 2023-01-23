import { useRef, useLayoutEffect, useEffect, useState } from 'react'

import { PADDING_BOX, BORDER_BOX, BORDER_CONTENT } from './const'

type coordsType = {
  startX: number
  startY: number
}

export const useDragDrop = () => {
  const containerRef = useRef<HTMLElement | null>(null)
  const screenRef = useRef<HTMLDivElement | null>(null)
  const boxRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<HTMLDivElement | null>(null)
  const coordsRef = useRef<coordsType>({ startX: 0, startY: 0 })
  const draggingRef = useRef<boolean>(false)

  const [startDrag, setStartDrag] = useState(false)

  useLayoutEffect(() => {
    screenRef.current = document.querySelector<HTMLDivElement>('.w98-screen__content')
  }, [])

  useEffect(() => {
    containerRef.current = document.body

    if (!containerRef.current || !boxRef.current) return

    const container = containerRef.current
    const box = boxRef.current
    const handle = handleRef.current

    const mouseMove = (e: MouseEvent) => {
      const { startX, startY } = coordsRef.current

      if (box) {
        box.style.top = `${e.clientY - startY}px`
        box.style.left = `${e.clientX - startX}px`
      }
    }

    const mouseDown = (e: MouseEvent) => {
      const fixErrorBorders = PADDING_BOX + BORDER_BOX + BORDER_CONTENT
      const { offsetLeft = 0, offsetTop = 0 } = screenRef.current ?? {}

      coordsRef.current = {
        startX: e.offsetX + fixErrorBorders + offsetLeft,
        startY: e.offsetY + fixErrorBorders + offsetTop
      }

      container?.addEventListener('mousemove', mouseMove)
      setStartDrag(true)
    }

    const mouseUp = (e: MouseEvent) => {
      container?.removeEventListener('mousemove', mouseMove)
      setStartDrag(false)
    }

    const cleanEvent = () => {
      handle?.removeEventListener('mousedown', mouseDown)
      container?.removeEventListener('mouseup', mouseUp)
    }

    handle?.addEventListener('mousedown', mouseDown)
    container?.addEventListener('mouseup', mouseUp)

    return cleanEvent
  }, [])

  const getCurrentPosition = (): { left: number, top: number } => {
    const box = boxRef.current

    if (!box) return { left: 0, top: 0 }

    return { left: box.offsetLeft, top: box.offsetTop }
  }

  const setPosition = (positionLeft: number = 0, positionTop: number = 0): void => {
    const box = boxRef.current

    if (!box) return

    box.style.left = `${positionLeft}px`
    box.style.top = `${positionTop}px`
  }

  return {
    containerRef,
    boxRef,
    handleRef,
    coordsRef,
    startDrag,

    getCurrentPosition,
    setPosition,
  }
}