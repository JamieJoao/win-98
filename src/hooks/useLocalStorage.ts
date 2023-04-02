import { useCallback, useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const initializeValue = useCallback(() => {
    try {
      if (typeof window === undefined) return null

      const item = window.localStorage.getItem(key)
      if (item) {
        return JSON.parse(item)
      }

      window.localStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    } catch (error) {
      console.error(`Hubo un error al encontrar la clave ${key} en localStorage`)
    }
  }, [key])

  const [storage, setStorage] = useState<T>(initializeValue)

  const setValue = (value: T) => {
    try {
      setStorage(value)

      if (typeof window !== undefined) {
        window.localStorage.setItem(key, JSON.stringify(value))
      }

    } catch (error) {
      console.error(error)
    }
  }

  return {
    storage,
    setValue,
  }
}