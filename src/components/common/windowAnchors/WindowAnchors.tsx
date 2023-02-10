import { forwardRef } from 'react'
import cn from 'classnames'

import { useDragDrop, useResize } from 'hooks'
import { TCoordinates, TCoords } from 'types'

import './WindowAnchors.styles.scss'

type THandleFunction = (coordinate: TCoordinates, top: number, left: number, end?: boolean) => void

interface ISingleAnchorProps {
  coordinate: TCoordinates
  onDrag: THandleFunction
}

interface IProps {
  onResizeEnd: (coords: TCoords) => void
}

export const WindowAnchors = (props: IProps) => {
  const { onResizeEnd } = props
  
  const { wrapperRef, handleDrag } = useResize(onResizeEnd)

  return (
    <div
      className="w98-window-anchor__wrapper"
      draggable={false}
      ref={wrapperRef}>
      <SingleAnchor coordinate='north' onDrag={handleDrag} />
      <SingleAnchor coordinate='south' onDrag={handleDrag} />
      <SingleAnchor coordinate='west' onDrag={handleDrag} />
      <SingleAnchor coordinate='east' onDrag={handleDrag} />

      <SingleAnchor coordinate='north-west' onDrag={handleDrag} />
      <SingleAnchor coordinate='north-east' onDrag={handleDrag} />
      <SingleAnchor coordinate='south-west' onDrag={handleDrag} />
      <SingleAnchor coordinate='south-east' onDrag={handleDrag} />
    </div>
  )
}

const SingleAnchor = forwardRef<HTMLDivElement, ISingleAnchorProps>((props, ref) => {
  const { coordinate, onDrag } = props

  const { startRef, draggingRef } = useDragDrop({
    endOnScreen: true,
    onDragging(left, top, startLeft, startTop) {
      if (startRef.current === null) return
      if (onDrag) {
        const finalLeft = left - startLeft
        const finalTop = top - startTop

        onDrag(coordinate, finalLeft, finalTop)
      }
    },
    onDragEnd(left, top, startLeft, startTop) {
      if (startRef.current === null || !draggingRef.current) return
      if (onDrag) {
        const finalLeft = left - startLeft
        const finalTop = top - startTop

        onDrag(coordinate, finalLeft, finalTop, true)
      }
    },
  })

  return (
    <div
      className={cn('w98-window-anchor', `--${coordinate}`)}
      ref={startRef} />
  )
})
