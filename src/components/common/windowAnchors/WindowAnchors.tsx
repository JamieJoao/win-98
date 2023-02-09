import { forwardRef, RefObject, useEffect, useMemo, useRef } from 'react'
import cn from 'classnames'

import { useDragDrop, useFakeWindow, useResize } from 'hooks'
import { TCoordinates } from 'types'

import './WindowAnchors.styles.scss'

type THandleFunction = (coordinate: TCoordinates, top: number, left: number, end?: boolean) => void

interface ISingleAnchorProps {
  coordinate: TCoordinates
  onDrag: THandleFunction
}

interface IProps {

}

export const WindowAnchors = (props: IProps) => {
  const {  wrapperRef, handleDrag } = useResize()

  // useEffect(() => {
  //   applyStyles(coords)
  // }, [coords])

  return (
    <div
      className="w98-window-anchor__wrapper"
      draggable={false}
      ref={wrapperRef}
      // style={coords}
    >
      <SingleAnchor coordinate='north' onDrag={handleDrag} />
      {/* <SingleAnchor coordinate='south' onDrag={handleDrag} /> */}
      {/* <SingleAnchor coordinate='north' onDrag={(...points) => handleDrag.call(null, 'north', ...points)} />
      <SingleAnchor coordinate='south' onDrag={(...points) => handleDrag.call(null, 'south', ...points)} />
      <SingleAnchor coordinate='west' onDrag={(...points) => handleDrag.call(null, 'west', ...points)} />
      <SingleAnchor coordinate='east' onDrag={(...points) => handleDrag.call(null, 'east', ...points)} /> */}
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
