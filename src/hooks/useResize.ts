import { useRef, useEffect, useState } from 'react'

import { TCoordinates } from 'types'
import { useFakeWindow } from './useFakeWindow'
import { useStateRef } from './useStateRef'

interface IPropsHook {
  // onResizing: (coordinate: TCoordinates, variation: number) => void
}

interface ICoords {
  // coordinate?: TCoordinates
  display?: string
  top?: number
  left?: number
  width?: number
  height?: number
}

export const useResize = () => {
  const { applyStyles } = useFakeWindow()
  // const [coords, setCoords, coordsRef] = useStateRef<ICoords>({})
  const parentRef = useRef<HTMLElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const lastCoordsRef = useRef<number>(0)

  useEffect(() => {
    if (wrapperRef.current) {
      parentRef.current = wrapperRef.current.parentElement
    }
  }, [])

  const handleDrag = (coordinate: TCoordinates, left: number, top: number, end?: boolean) => {
    if (!parentRef.current || !wrapperRef.current) return
    const { offsetLeft: parentLeft, offsetTop: parentTop, clientWidth: parentWidth, clientHeight: parentHeight } = parentRef.current
      , { clientHeight: wrapperHeight, offsetTop: wrapperTop } = wrapperRef.current

    let auxCoords: ICoords = { width: parentWidth, height: parentHeight, left: parentLeft, top: parentTop }

    switch (coordinate) {
      case 'north':
        console.log(top, parentTop, wrapperTop, parentHeight, wrapperHeight)
        // auxCoords = { top: top - parentTop, height: top - parentTop - wrapperTop - (top - parentTop) }
        auxCoords = { ...auxCoords, top, height: parentHeight + (parentTop - top) }
        break
      case 'south':
        // console.log(wrapperHeight, wrapperHeight + (top - parentHeight - parentTop))
        // auxCoords = { height:  parentHeight + (top - parentHeight - parentTop) }
        // console.log(wrapperHeight, top, parentTop, wrapperTop)
        // auxCoords = { height: top - parentTop - wrapperTop }
        // handleRezise(coordinate, parentTop - top + parentHeight)
        break
      case 'west':
        // handleRezise(coordinate, offsetLeft - left)
        break
      case 'east':
        // handleRezise(coordinate, offsetLeft - left + clientWidth)
        break
    }

    // setCoords({ ...coordsRef.current, coordinate, ...auxCoords })
    // setCoords({ ...auxCoords, display: end ? 'none' : 'block' })

    // if (coordsRef.current) {
    //   applyStyles(coordsRef.current)
    // }

    applyStyles({ ...auxCoords, display: end ? 'none' : 'block' })

    if (end) {
      console.log('[END]')
      applyStyles(auxCoords, parentRef.current)
    }
  }

  return {
    // coords,
    wrapperRef,
    handleDrag,
  }
}