import { useEffect, useMemo, useRef, useState } from 'react'

import { setKeyValue } from 'redux-tk/slice'
import { useAppDispatch, useAppSelector } from 'redux-tk/store'
import { TaskBarButton, NotificationArea } from 'components'

import StartIcon from 'assets/icons/icon-windows-start.png'
import './styles.scss'

const COLUMN_GAP = 4
const WIDTH_BASE = 158

export const TaskBar = () => {
  const dispatch = useAppDispatch()
  const taskBarButtonsStack = useAppSelector(state => state.taskBarButtonsStack)
  const taskBarRef = useRef<HTMLDivElement | null>(null)

  const buttonWidthMemo = useMemo<number>(() => {
    if (!taskBarRef.current) return 0
    if (WIDTH_BASE * taskBarButtonsStack.length < taskBarRef.current.clientWidth) return WIDTH_BASE

    const fixColumnGap = (taskBarButtonsStack.length - 1) * COLUMN_GAP
      , widthContainer = taskBarRef.current.clientWidth - fixColumnGap
      , finalWidth = widthContainer / taskBarButtonsStack.length

    return finalWidth
  }, [taskBarButtonsStack])

  const handleClickStart = () => {

  }

  return (
    <div className="w98-taskbar" style={{ zIndex: taskBarButtonsStack.length + 1 }}>
      <div className="w98-taskbar__container">
        <TaskBarButton
          className='w98-taskbar__button-start'
          iconUrl={StartIcon}
          label='Inicio'
          bold
          onClick={handleClickStart} />

        <div className="w98-taskbar__separator"></div>

        <div className="w98-taskbar__group" ref={taskBarRef}>
          {taskBarButtonsStack.map((obj, index) => {
            const { window: { program } } = obj
            return (
              <TaskBarButton
                key={index}
                iconUrl={program.iconUrl}
                label={program.name}
                data={obj}
                width={buttonWidthMemo} />
            )
          })}
        </div>

        <div className="w98-taskbar__separator"></div>

        <div className="w98-taskbar__info">
          <NotificationArea />
        </div>
      </div>
    </div>
  )
}
