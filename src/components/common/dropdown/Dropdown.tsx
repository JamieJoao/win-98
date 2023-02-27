import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'

import { CommonStyles } from 'types'

import './Dropdown.styles.scss'
import Address from 'assets/icons/explorer/address.png'
import ChevronDown from 'assets/icons/chevron-down.png'

interface DropdownProps {
  className?: string
}

export const Dropdown = (props: DropdownProps) => {
  const { className } = props

  const [value, setValue] = useState<string>('C:\\Program Files\\Windows\\System32')
  const [boxStyles, setBoxStyles] = useState<CommonStyles>({})
  const [open, setOpen] = useState<boolean>(false)
  const inputContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && inputContainerRef.current) {
      const { width, height, left, top } = inputContainerRef.current.getBoundingClientRect()

      setBoxStyles({
        width,
        left,
        top: top + height,
        display: 'block',
      })
    }
    else {
      setBoxStyles({ display: 'none' })
    }
  }, [open])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    setValue(inputValue)
  }

  const dropdownBox = open
    ? (
      <div
        className="w98-dropdown__box"
        style={boxStyles}>
        {/* CREAR COMPONENTE DE TREE SIMPLE */}
      </div>
    )
    : null

  return (
    <div 
      className={cn('w98-dropdown', className)}>
      <div
        className="w98-dropdown__input-container"
        ref={inputContainerRef}>
        <div className="w98-dropdown__input">
          <img
            className='w98-dropdown__input-icon'
            src={Address}
            draggable={false} />
          <input
            value={value}
            type="text"
            onChange={handleChange}
            spellCheck={false} />
        </div>

        <button
          className="w98-dropdown__input-arrow"
          onClick={() => setOpen(!open)}
          onBlur={() => setOpen(false)}>
          <img src={ChevronDown} />
        </button>
      </div>

      {dropdownBox}

      {/* {createPortal(
        dropdownBox,
        document.querySelector('#modals-root')!
      )} */}
    </div>
  )
}