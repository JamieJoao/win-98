import { RefObject, useLayoutEffect, useRef } from 'react'

import { IContextMenuItem } from 'types'
import { setKeyValue } from 'redux-tk/slice'
import { useAppDispatch } from 'redux-tk/store'
import { IContextMenuStore } from 'redux-tk/types'

export const useContextMenu = () => {
  const dispatch = useAppDispatch()
  const itemsRef = useRef<IContextMenuItem[]>([])

  const handleContextMenu = (event: any) => {
    event.preventDefault()

    const { offsetX, offsetY, clientX, clientY } = event
    const auxMenu: IContextMenuStore = {
      position: { left: clientX, top: clientY, offsetX, offsetY },
      items: itemsRef.current,
    }

    dispatch(setKeyValue({ key: 'contextMenu', value: auxMenu }))
  }

  const setData = (items: IContextMenuItem[], elementRef: RefObject<HTMLElement>) => {
    itemsRef.current = items
    elementRef.current?.addEventListener('contextmenu', (e) => handleContextMenu(e))
  }

  return {
    setData,
  }
}