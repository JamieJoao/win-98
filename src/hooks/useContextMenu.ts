import { RefObject, useEffect, useRef } from 'react'

import { IContextMenuItem } from 'types'
import { setKeyValue, closeContextMenu } from 'redux-tk/slice'
import { useAppDispatch } from 'redux-tk/store'
import { IContextMenuStore } from 'redux-tk/types'

export const useContextMenu = () => {
  const dispatch = useAppDispatch()
  const itemsRef = useRef<IContextMenuItem[]>([])
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    return () => {
      elementRef.current?.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const { offsetX, offsetY, clientX, clientY } = event
    const auxMenu: IContextMenuStore = {
      position: { left: clientX, top: clientY, offsetX, offsetY },
      items: itemsRef.current,
    }

    dispatch(closeContextMenu())
    setTimeout(() => {
      dispatch(setKeyValue({ key: 'contextMenu', value: auxMenu }))
    })
  }

  const setData = (items: IContextMenuItem[], ref: RefObject<HTMLElement>) => {
    elementRef.current = ref.current
    itemsRef.current = items

    elementRef.current?.addEventListener('contextmenu', handleContextMenu)
  }

  return {
    setData,
  }
}