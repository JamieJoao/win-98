import { useEffect, useRef } from 'react'
import { useContextMenu } from 'hooks'
import { directAccessContextMenu } from './const'

import './styles.scss'

interface IProps {
  url: string
  name: string
  onDoubleClick?: () => void
}

export const DirectAccess = (props: IProps) => {
  const { url, name, onDoubleClick } = props

  const { setData } = useContextMenu()
  const directAccessRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setData(directAccessContextMenu, directAccessRef)
  }, [])

  return (
    <div
      ref={directAccessRef}
      className="w98-direct-access"
      onDoubleClick={onDoubleClick}>
      <img src={url} draggable={false} />

      <span>{name}</span>
    </div>
  )
}
