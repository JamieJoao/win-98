import { useRef, useEffect, useState } from 'react'

import { CommonStyles } from 'types'
import { SCREEN_CLASS } from 'utils'
import { useEventListeners } from 'hooks'

const MARGIN_ARROW = 4

export const useOverflowDropdown = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [boxStyles, setBoxStyles] = useState<CommonStyles>({})
  const { addListenerForOutside, cleanListenerForOutside } = useEventListeners()

  const dropdownRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    screenRef.current = document.querySelector<HTMLDivElement>(SCREEN_CLASS)
    return cleanListenerForOutside
  }, [])

  useEffect(() => {
    if (open && dropdownRef.current) {
      addListenerForOutside(
        '.w98-list__item-container',
        dropdownRef.current!,
        () => {
          setOpen(false)
        })

      const { offsetLeft, clientHeight } = dropdownRef.current

      setBoxStyles({
        left: offsetLeft + MARGIN_ARROW,
        top: clientHeight,
        display: 'block',
      })
    }
    else {
      setBoxStyles({ display: 'none' })
    }
  }, [open])

  const handleToggleOpen = () => {
    setOpen(!open)
  }

  return {
    dropdownRef,
    open,
    boxStyles,

    handleToggleOpen,
  }
}
