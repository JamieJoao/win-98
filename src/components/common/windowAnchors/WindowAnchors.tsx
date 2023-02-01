import { useRef } from 'react'
import './styles.scss'

type THandleFunction = (top: number, left: number) => void

interface IProps {
  onDragNorth?: THandleFunction
  onDragWest?: THandleFunction
  onDragSouth?: THandleFunction
  onDragEast?: THandleFunction

  onDragNorthWest?: THandleFunction
  onDragNorthEast?: THandleFunction
  onDragSouthWest?: THandleFunction
  onDragSouthEast?: THandleFunction
}

export const WindowAnchors = (props: IProps) => {
  const {
    onDragNorth,
    onDragWest,
    onDragSouth,
    onDragEast,

    onDragNorthWest,
    onDragNorthEast,
    onDragSouthWest,
    onDragSouthEast,
  } = props

  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const topLeftRef = useRef<HTMLDivElement>(null)
  const topRightRef = useRef<HTMLDivElement>(null)
  const bottomLeftRef = useRef<HTMLDivElement>(null)
  const bottomRightRef = useRef<HTMLDivElement>(null)

  return (
    <div className="w98-window-anchor__wrapper">
      <div className='w98-window-anchor --top' ref={topRef}></div>
      <div className='w98-window-anchor --bottom' ref={bottomRef}></div>
      <div className='w98-window-anchor --left' ref={leftRef}></div>
      <div className='w98-window-anchor --right' ref={rightRef}></div>

      <div className='w98-window-anchor --top-left' ref={topLeftRef}></div>
      <div className='w98-window-anchor --top-right' ref={topRightRef}></div>
      <div className='w98-window-anchor --bottom-left' ref={bottomLeftRef}></div>
      <div className='w98-window-anchor --bottom-right' ref={bottomRightRef}></div>
    </div>
  )
}
