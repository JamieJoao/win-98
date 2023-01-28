import { useRef, RefObject, useEffect } from 'react'
import { PADDING_BOX, BORDER_BOX, BORDER_CONTENT, TASKBAR_HEIGHT, WINDOW_HEADER_SPACING } from 'utils/const'

interface IProps {
  onDragStart: () => void
  onDragEnd: () => void
  onDragging: (left: number, top: number) => void
  canDragRef: RefObject<boolean>
}

export const useDrag = (props: IProps) => {
  const { onDragStart, onDragEnd, onDragging, canDragRef } = props

  const containerRef = useRef<HTMLDivElement | null>(null)
  const elementRef = useRef<HTMLDivElement | null>(null)
  const handleDragRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef<boolean>(false)
  const pointersRef = useRef<{ startLeft: number, startTop: number }>({ startTop: 0, startLeft: 0 })

  const handlePointerMove = (e: MouseEvent) => {
    if (!elementRef.current || !containerRef.current) return
    if (!draggingRef.current) {
      onDragStart?.call(e)
      draggingRef.current = true
    }

    const { offsetLeft, offsetTop } = containerRef.current
    const { startLeft, startTop } = pointersRef.current

    onDragging?.call(e, e.clientX - offsetLeft - startLeft, e.clientY - offsetTop - startTop)
  }

  const handlePointerUp = (e: MouseEvent) => {
    if (draggingRef.current) {
      draggingRef.current = false
      onDragEnd?.call(e)
    }

    elementRef.current?.removeEventListener('mousemove', handlePointerMove)
  }

  const handlePointerDown = (e: MouseEvent) => {
    const fixErrorBorders = PADDING_BOX + BORDER_BOX + BORDER_CONTENT
    if (!canDragRef.current || !handleDragRef.current) return

    pointersRef.current = { startLeft: e.offsetX + fixErrorBorders, startTop: e.offsetY + fixErrorBorders }
    elementRef.current?.addEventListener('mousemove', handlePointerMove)
  }

  const cleanEvents = () => {
    handleDragRef.current?.removeEventListener('mouseup', handlePointerUp)
    handleDragRef.current?.removeEventListener('mousedown', handlePointerDown)
  }

  useEffect(() => {
    containerRef.current = document.querySelector('.w98-screen__content')

    handleDragRef.current?.addEventListener('mouseup', handlePointerUp)
    handleDragRef.current?.addEventListener('mousedown', handlePointerDown)

    return cleanEvents
  }, [])

  const getCoords = (): { left: number, top: number } => {
    const element = elementRef.current
    if (!element) return { left: 0, top: 0 }

    return { left: element.offsetLeft, top: element.offsetTop }
  }

  const setCoords = (left: number = 0, top: number = 0): void => {
    const box = elementRef.current
    if (!box) return

    box.style.left = `${left}px`
    box.style.top = `${top}px`
  }

  return {
    elementRef,
    handleDragRef,
    getCoords,
    setCoords,
  }
}