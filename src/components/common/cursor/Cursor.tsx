import { forwardRef } from 'react'
import './Cursor.styles.scss'

export const Cursor = forwardRef<HTMLDivElement, any>((_, ref) => {
  return (
    <div
      className="w98-cursor"
      ref={ref} />
  )
})
