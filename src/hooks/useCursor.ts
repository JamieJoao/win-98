import { useRef } from 'react'

export const useCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event
    if (cursorRef.current) {
      cursorRef.current.style.left = `${clientX}px`
      cursorRef.current.style.top = `${clientY}px`
    }
  }

  return {
    cursorRef,
    handleMouseMove
  }
}
