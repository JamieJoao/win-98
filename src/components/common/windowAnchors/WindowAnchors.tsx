import { forwardRef, RefObject } from 'react'
import cn from 'classnames'

import { useDragDrop } from 'hooks'
import { TCoordinates } from 'types'

import './styles.scss'

type THandleFunction = (top: number, left: number, end?: boolean) => void

interface ISingleAnchorProps {
  coordinate: TCoordinates
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

  const handleDrag = (orientation: TCoordinates, left: number, top: number, end?: boolean) => {
    if (!baseRef.current) return
    const auxMethod = end ? onResized : onResizing
    const { offsetLeft, offsetTop, clientWidth, clientHeight } = baseRef.current

    switch (orientation) {
      case 'north':
        auxMethod(orientation, offsetTop - top)
        break
      case 'south':
        auxMethod(orientation, offsetTop - top + clientHeight)
        break
      case 'west':
        auxMethod(orientation, offsetLeft - left)
        break
      case 'east':
        auxMethod(orientation, offsetLeft - left + clientWidth) // HAY UNOS PIXELES DE ERROR AL JALAR A LA DERECHA, DONDE SEA QUE CLICKEMOS NOS PONE EN TODO EL BORDE
        break
    }
  }

  return (
    <div className="w98-window-anchor__wrapper" draggable={false}>
      <SingleAnchor coordinate='north' onDrag={(...points) => handleDrag.call(null, 'north', ...points)} />
      <SingleAnchor coordinate='south' onDrag={(...points) => handleDrag.call(null, 'south', ...points)} />
      <SingleAnchor coordinate='west' onDrag={(...points) => handleDrag.call(null, 'west', ...points)} />
      <SingleAnchor coordinate='east' onDrag={(...points) => handleDrag.call(null, 'east', ...points)} />
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
  const { coordinate, onDrag } = props

  const { startRef } = useDragDrop({
    // endOnScreen: true,
    onDragging(left, top, startLeft, startTop) {
      if (startRef.current === null) return
      if (onDrag) {
        let finalLeft = left - startLeft + (coordinate === 'east' ? startRef.current.clientWidth : 0)
          , finalTop = top - startTop + (coordinate === 'south' ? startRef.current.clientHeight : 0)

        onDrag(finalLeft, finalTop)
      }
    },
    onDragEnd(left, top) {
      console.log('[end]')
      if (onDrag) onDrag(left, top, true)
    }
  })

  return (
    <div
      className={cn('w98-window-anchor', `--${coordinate}`)}
      ref={startRef} />
  )
})
