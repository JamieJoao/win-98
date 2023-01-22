import { useRef, useLayoutEffect, useEffect } from 'react'

import { PADDING_BOX, BORDER_BOX, BORDER_CONTENT } from './const'

type coordsType = {
  startX: number
  startY: number
}

export const useDragDrop = () => {
  const containerRef = useRef<HTMLElement | null>(null)
  const boxRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<HTMLDivElement | null>(null)
  const coordsRef = useRef<coordsType>({ startX: 0, startY: 0 })

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
        console.log(e.clientX, startX, e.offsetX)
      }
    }

    const mouseDown = (e: MouseEvent) => {
      const fixErrorBorders = PADDING_BOX + BORDER_BOX + BORDER_CONTENT

      coordsRef.current = {
        startX: e.offsetX + fixErrorBorders,
        startY: e.offsetY + fixErrorBorders,
      }
      
      container?.addEventListener('mousemove', mouseMove)
    }

    const mouseUp = (e: MouseEvent) => {
      container?.removeEventListener('mousemove', mouseMove)
    }

    const cleanEvent = () => {
      handle?.removeEventListener('mousedown', mouseDown)
      container?.removeEventListener('mouseup', mouseUp)
    }

    handle?.addEventListener('mousedown', mouseDown)
    container?.addEventListener('mouseup', mouseUp)

    return cleanEvent
  }, [])

  return {
    containerRef,
    boxRef,
    handleRef,
    coordsRef,
  }
}