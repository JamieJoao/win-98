import cn from 'classnames'

import { Dropdown } from 'components'

import { OverflowDrodown, SplitName } from './components'
import { useExpolorerHeader } from './hooks/useExplorerHeader'

import './ExplorerHeader.styles.scss'
import ConsoleIcon from 'assets/icons/search_web-0.png'

export const ExplorerHeader = (): JSX.Element => {
  const {
    controlsListRef
    , controlsPivotRef
    , actionsListRef
    , actionsPivotRef
    , restControls
    , restActions
    , controlsList
    , actionsList
  } = useExpolorerHeader()

  const splitName = (name: string, hotKey: string) => {
    
  }

  splitName('File', 'F')

  return (
    <div className="w98-explorer-header">
      <div className="w98-explorer-controls">
        <div className="w98-explorer-controls__side-left w98-list" ref={controlsListRef}>
          <div className='w98-list__item --handler' />
          {controlsList.map(({ action, ...restProps }) => (
            <button
              className='w98-list__item'
              onClick={action}>
              <SplitName {...restProps} />
            </button>
          ))}
        </div>
        <div className="w98-explorer-controls__side-right w98-list" ref={controlsPivotRef}>
          {Boolean(restControls.length) && <OverflowDrodown list={restControls} />}

          <div className="w98-list__icon">
            <img src={ConsoleIcon} alt="console-icon" />
          </div>
        </div>
      </div>

      <div className="w98-explorer-separator"></div>

      <div className="w98-explorer-actions">
        <div className="w98-explorer-actions__side-left w98-list" ref={actionsListRef}>
          <div className='w98-list__item --handler' />
          {actionsList.map(({ name, iconKey }, index) => {
            return iconKey === undefined
              ? <div key={index} className="w98-list__item --separator"></div>
              : (
                <button
                  key={index}
                  className={cn('w98-list__item --big', `--icon-${iconKey}`)}>
                  <span>{name}</span>
                </button>
              )
          })}
        </div>
        <div className="w98-explorer-actions__side-right w98-list" ref={actionsPivotRef}>
          {Boolean(restActions.length) && <OverflowDrodown list={restActions} />}
        </div>
      </div>

      <div className="w98-explorer-separator"></div>

      <div className="w98-explorer-address">
        <div className='w98-list__item --handler' />

        <label className='w98-explorer-address__title'>Address</label>
        <Dropdown className='w98-explorer-address__dropdown' />
      </div>
    </div>
  )
}
