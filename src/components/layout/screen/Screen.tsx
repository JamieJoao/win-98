import { useRef } from 'react'

import './styles.scss'

interface IProps {
  children: React.ReactNode
}

export const Screen = (props: IProps) => {
  const { children } = props

  const contentRef = useRef<HTMLDivElement>(null)

  /**
   * CANCELAMOS EL MENÚ CONTEXTUAL SÓLO PARA LA PANTALLA & ASÍ ES MENOS INVASIVO
   * @param e 
   */
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  return (
    <div className="w98-screen">
      <div
        ref={contentRef}
        className="w98-screen__content"
        onContextMenu={handleContextMenu}>
        {children}
      </div>
    </div>
  )
}
