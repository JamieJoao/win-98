import { RefObject, useRef, useState } from "react"

export const useStateRef = <T>(initializacion: T): [T, (newState: T | ((a: T) => T)) => void, RefObject<T>] => {
  const stateRef = useRef<T>(initializacion)
  const [state, setState] = useState<T>(initializacion)

  const proxyState = (newState: any) => {

    stateRef.current = typeof newState === 'function'
      ? newState(stateRef.current)
      : newState

    setState(stateRef.current)
  }

  return [
    state,
    proxyState,
    stateRef,
  ]
}