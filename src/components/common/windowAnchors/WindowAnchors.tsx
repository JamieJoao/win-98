import { forwardRef, RefObject, useEffect, useRef } from 'react'
import cn from 'classnames'

import { useDragDrop } from 'hooks'
import { TCoordinates } from 'types'

import './styles.scss'

type THandleFunction = (top: number, left: number, end?: boolean) => void

interface ISingleAnchorProps {
  side: 'top' | 'left' | 'bottom' | 'right'
  onDrag: THandleFunction
}

interface IProps {
  onResizing: (coordinate: TCoordinates, variation: number) => void
  onResized: (coordinate: TCoordinates, variation: number) => void
  baseRef: RefObject<HTMLElement>
}

export const WindowAnchors = (props: IProps) => {
  const {
    onResizing,
    onResized,
    baseRef,
  } = props

  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const topLeftRef = useRef<HTMLDivElement>(null)
  const topRightRef = useRef<HTMLDivElement>(null)
  const bottomLeftRef = useRef<HTMLDivElement>(null)
  const bottomRightRef = useRef<HTMLDivElement>(null)

  const handleDragNorth: THandleFunction = (left, top, end) => {
    if (!baseRef.current) return

    if (end) {
      onResized('north', baseRef.current.offsetTop - top)
    }
    else {
      onResizing('north', baseRef.current.offsetTop - top)
    }
  }

  return (
    <div className="w98-window-anchor__wrapper">
      <SingleAnchor side='top' onDrag={handleDragNorth} />
      {/* <div className='w98-window-anchor --top' ref={topRef}></div>
      <div className='w98-window-anchor --bottom' ref={bottomRef}></div>
      <div className='w98-window-anchor --left' ref={leftRef}></div>
      <div className='w98-window-anchor --right' ref={rightRef}></div>

      <div className='w98-window-anchor --top-left' ref={topLeftRef}></div>
      <div className='w98-window-anchor --top-right' ref={topRightRef}></div>
      <div className='w98-window-anchor --bottom-left' ref={bottomLeftRef}></div>
      <div className='w98-window-anchor --bottom-right' ref={bottomRightRef}></div> */}
    </div>
  )
}

const SingleAnchor = forwardRef<HTMLDivElement, ISingleAnchorProps>((props, ref) => {
  const { side, onDrag } = props

  const { startRef } = useDragDrop({
    endOnScreen: true,
    onDragging(left, top) {
      if (onDrag) onDrag(left, top)
    },
    onDragEnd(left, top) {
      if (onDrag) onDrag(left, top, true)
    }
  })

  return (
    <div
      className={cn('w98-window-anchor', `--${side}`)}
      ref={startRef} />
  )
})
