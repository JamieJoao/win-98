import { useCallback, useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const initializeValue = useCallback(() => {
    try {
      if (typeof window === undefined) return initialValue

      const item = window.localStorage.getItem(key)

      if (item) {
        return JSON.parse(item)
      }

      return initialValue
    } catch (error) {
      console.error(`Hubo un error al encontrar la clave ${key} en localStorage`)
    }
  }, [key, initialValue])

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