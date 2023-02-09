import { RefObject, useLayoutEffect, useRef } from 'react'
import { FAKE_WINDOW_CLASS } from 'utils/const'
import { getKeys } from 'utils/functions'

type TStyles = { top?: number, left?: number, width?: number, height?: number, display?: string }

export const useFakeWindow = () => {
  const fakeWindowRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    fakeWindowRef.current = document.querySelector(FAKE_WINDOW_CLASS)
  }, [])

  const applyStyles = (stylesObj: TStyles, customElement?: HTMLElement) => {
    const useElement = customElement ?? fakeWindowRef.current

    if (!useElement) return

    getKeys<TStyles>(stylesObj)
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