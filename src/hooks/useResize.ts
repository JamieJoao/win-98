import { RefObject } from 'react'

import { TCoordinates, TCoords } from 'types'
import { useFakeWindow } from './useFakeWindow'

export const useResize = (onResizeEnd: (coords: TCoords) => void, parentRef: RefObject<HTMLDivElement>) => {
  const { applyStyles } = useFakeWindow()

  const handleDrag = (coordinate: TCoordinates, left: number, top: number, end?: boolean) => {
    if (!parentRef.current) return
    const { offsetLeft, offsetTop, clientWidth, clientHeight } = parentRef.current

    let auxCoords: TCoords = { width: clientWidth, height: clientHeight, left: offsetLeft, top: offsetTop }

    switch (coordinate) {
      case 'north':
        auxCoords = { ...auxCoords, top, height: clientHeight + (offsetTop - top) }
        break
      case 'west':
        auxCoords = { ...auxCoords, left, width: clientWidth + (offsetLeft - left) }
        break
      case 'south':
        auxCoords = { ...auxCoords, height: top - offsetTop }
        break
      case 'east':
        auxCoords = { ...auxCoords, width: left - offsetLeft }
        break

      case 'north-west':
        auxCoords = {
          ...auxCoords,
          top, height: clientHeight + (offsetTop - top),
          left, width: clientWidth + (offsetLeft - left),
        }
        break
      case 'north-east':
        auxCoords = {
          ...auxCoords,
          top, height: clientHeight + (offsetTop - top),
          width: left - offsetLeft
        }
        break
      case 'south-west':
        auxCoords = {
          ...auxCoords,
          height: top - offsetTop,
          left, width: clientWidth + (offsetLeft - left)
        }
        break
      case 'south-east':
        auxCoords = {
          ...auxCoords,
          height: top - offsetTop,
          width: left - offsetLeft
        }
        break
    }

    applyStyles({ ...auxCoords, display: end ? 'none' : 'block' })

    if (end) {
      applyStyles(auxCoords, parentRef.current)
      onResizeEnd(auxCoords)
    }
  }

  return {
    handleDrag,
  }
}