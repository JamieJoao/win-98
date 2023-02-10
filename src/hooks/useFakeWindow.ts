import { RefObject, useLayoutEffect, useRef } from 'react'
import { TCoords } from 'types'
import { FAKE_WINDOW_CLASS } from 'utils/const'
import { getKeys } from 'utils/functions'

export const useFakeWindow = () => {
  const fakeWindowRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    fakeWindowRef.current = document.querySelector(FAKE_WINDOW_CLASS)
  }, [])

  const applyStyles = (stylesObj: TCoords, customElement?: HTMLElement | null) => {
    const useElement = customElement ?? fakeWindowRef.current

    if (!useElement) return

    getKeys<TCoords>(stylesObj)
      .forEach(key => {
        const value = stylesObj[key]
        if (useElement && value !== undefined) {
          if (key === 'display') {
            useElement.style.display = String(value)
          }
          else useElement.style[key] = `${value}px`
        }
      })
  }

  return {
    applyStyles,
  }
}