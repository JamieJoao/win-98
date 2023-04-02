import { useRef } from 'react'
import { SCREEN_CLASS } from 'utils'

export const useEventListeners = () => {
  const screenRef = useRef<HTMLDivElement | null>(null)
  const paramsForClickOutsideRef = useRef<{ targetClass: string, targetNode: HTMLElement, callback: () => void } | null>(null)

  const addListenerForOutside = (targetClass: string, targetNode: HTMLElement, callback: () => void) => {
    paramsForClickOutsideRef.current = { targetClass, targetNode, callback }

    screenRef.current = document.querySelector(SCREEN_CLASS)
    screenRef
      .current
      ?.addEventListener('mousedown', handleClickOutsideScreen)
  }

  const cleanListenerForOutside = () => {
    if (screenRef.current) {
      screenRef
        .current
        .removeEventListener('mousedown', handleClickOutsideScreen)
    }
  }

  const handleClickOutsideScreen = (event: any) => {
    console.log('out!')

    const { target } = event
    if (paramsForClickOutsideRef.current) {
      const { targetClass, callback, targetNode } = paramsForClickOutsideRef.current

      if (
        !(target.closest(targetClass) &&
        targetNode.contains(target))
      ) {
        cleanListenerForOutside()
        callback()
      }
    }

  }

  return {
    addListenerForOutside,
    cleanListenerForOutside,
  }
}
