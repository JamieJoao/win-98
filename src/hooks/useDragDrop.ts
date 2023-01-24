import { useRef, useLayoutEffect, useEffect, useState } from 'react'

import { PADDING_BOX, BORDER_BOX, BORDER_CONTENT, TASKBAR_HEIGHT, WINDOW_HEADER_SPACING } from 'utils/const'

type coordsType = {
  startX: number
  startY: number
}

type limitsType = {
  top: number
  bottom: number
  left: number
  right: number
}

export const useDragDrop = () => {
  const containerRef = useRef<HTMLElement | null>(null)
  const screenRef = useRef<HTMLDivElement | null>(null)
  const boxRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<HTMLDivElement | null>(null)
  const coordsRef = useRef<coordsType>({ startX: 0, startY: 0 })
  const limitsRef = useRef<limitsType>({ top: 0, bottom: 0, left: 0, right: 0 })

  const [startDrag, setStartDrag] = useState(false)

  useLayoutEffect(() => {
    screenRef.current = document.querySelector<HTMLDivElement>('.w98-screen__content')
    const screen = screenRef.current

    if (screen) {
      const { top, bottom, left, right } = screen.getBoundingClientRect()

      limitsRef.current = { top, bottom, left, right }
    }
  }, [])

  useEffect(() => {
    containerRef.current = document.body

    if (!containerRef.current || !boxRef.current || !screenRef.current) return

    const container = containerRef.current
    const screen = screenRef.current
    const box = boxRef.current
    const handle = handleRef.current

    const mouseMove = (e: MouseEvent) => {
      const { startX, startY } = coordsRef.current
        , auxY = e.clientY - startY
        , auxX = e.clientX - startX

      if (box) {
        if (auxY >= 0 && auxY <= screen.clientHeight - WINDOW_HEADER_SPACING) {
          box.style.top = `${auxY}px`
        }

        if (auxX >= 0 && auxX <= screen.clientWidth - box.clientWidth) {
          box.style.left = `${auxX}px`
        }

        if (!startDrag) {
          setStartDrag(true)
        }
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
    }

    const mouseUp = (e: MouseEvent) => {
      setStartDrag(false)
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